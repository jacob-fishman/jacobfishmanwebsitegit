import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const TETROMINOS = {
  I: { shape: [[1, 1, 1, 1]], color: '#00FFFF' },
  O: { shape: [[1, 1], [1, 1]], color: '#FFFF00' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#800080' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#00FF00' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#FF0000' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#0000FF' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#FFA500' }
};

const TetrisGame = ({ onClose }) => {
  const { colors } = useTheme();
  const [board, setBoard] = useState(() => 
    Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const getRandomPiece = () => {
    const pieces = Object.keys(TETROMINOS);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    return {
      shape: TETROMINOS[randomPiece].shape,
      color: TETROMINOS[randomPiece].color,
      x: Math.floor(BOARD_WIDTH / 2) - 1,
      y: 0
    };
  };

  const isValidMove = (piece, newX, newY, newShape = piece.shape) => {
    for (let y = 0; y < newShape.length; y++) {
      for (let x = 0; x < newShape[y].length; x++) {
        if (newShape[y][x]) {
          const boardX = newX + x;
          const boardY = newY + y;
          
          if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
            return false;
          }
          
          if (boardY >= 0 && board[boardY][boardX]) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const rotatePiece = (shape) => {
    const rotated = shape[0].map((_, index) =>
      shape.map(row => row[index]).reverse()
    );
    return rotated;
  };

  const placePiece = useCallback(() => {
    if (!currentPiece) return;

    const newBoard = board.map(row => [...row]);
    
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPiece.y + y;
          const boardX = currentPiece.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentPiece.color;
          }
        }
      }
    }

    // Check for completed lines
    let linesCleared = 0;
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (newBoard[y].every(cell => cell !== 0)) {
        newBoard.splice(y, 1);
        newBoard.unshift(Array(BOARD_WIDTH).fill(0));
        linesCleared++;
        y++; // Check the same line again
      }
    }

    setScore(prev => prev + linesCleared * 100);
    setBoard(newBoard);
    setCurrentPiece(getRandomPiece());
  }, [currentPiece, board]);

  const movePiece = useCallback((dx, dy) => {
    if (!currentPiece || gameOver) return;

    const newX = currentPiece.x + dx;
    const newY = currentPiece.y + dy;

    if (isValidMove(currentPiece, newX, newY)) {
      setCurrentPiece(prev => ({ ...prev, x: newX, y: newY }));
    } else if (dy > 0) {
      // Piece hit bottom or another piece
      placePiece();
    }
  }, [currentPiece, gameOver, placePiece]);

  const rotatePieceHandler = () => {
    if (!currentPiece || gameOver) return;

    const rotatedShape = rotatePiece(currentPiece.shape);
    if (isValidMove(currentPiece, currentPiece.x, currentPiece.y, rotatedShape)) {
      setCurrentPiece(prev => ({ ...prev, shape: rotatedShape }));
    }
  };

  const resetGame = () => {
    setBoard(Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0)));
    setCurrentPiece(getRandomPiece());
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted) return;
      
      // Prevent default behavior for arrow keys to stop page scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      
      switch (e.key) {
        case 'ArrowLeft':
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          movePiece(0, 1);
          break;
        case 'ArrowUp':
          rotatePieceHandler();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePiece, gameStarted]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameInterval = setInterval(() => {
      movePiece(0, 1);
    }, 500);

    return () => clearInterval(gameInterval);
  }, [movePiece, gameStarted, gameOver]);

  useEffect(() => {
    if (currentPiece && !isValidMove(currentPiece, currentPiece.x, currentPiece.y)) {
      setGameOver(true);
    }
  }, [currentPiece]);

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    // Add current piece to display
    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.y + y;
            const boardX = currentPiece.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        }
      }
    }

    return displayBoard;
  };

  return (
    <div className="tetris-game" style={{ color: colors.text }}>
      <div className="game-info">
        <h4>Score: {score}</h4>
        {!gameStarted && !gameOver && (
          <motion.button
            className="start-button"
            onClick={resetGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ backgroundColor: '#2196F3', color: 'white' }}
          >
            Start Game
          </motion.button>
        )}
        {gameOver && (
          <div className="game-over">
            <h4>Game Over!</h4>
            <motion.button
              className="restart-button"
              onClick={resetGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ backgroundColor: '#2196F3', color: 'white' }}
            >
              Play Again
            </motion.button>
          </div>
        )}
      </div>
      
      <div 
        className="game-board"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, 25px)`,
          gridTemplateRows: `repeat(${BOARD_HEIGHT}, 25px)`,
          gap: '1px',
          backgroundColor: colors.secondary,
          padding: '10px',
          border: `2px solid ${colors.accent}`
        }}
      >
        {renderBoard().map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              style={{
                width: '25px',
                height: '25px',
                backgroundColor: cell || colors.background,
                border: cell ? '1px solid rgba(255,255,255,0.3)' : 'none'
              }}
            />
          ))
        )}
      </div>
      
      <div className="controls" style={{ color: colors.textSecondary }}>
        <p>← → Move | ↓ Drop | ↑ Rotate</p>
        <p>Clear lines to score points!</p>
      </div>
    </div>
  );
};

export default TetrisGame;
