import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const GRID_SIZE = 10;
const MINE_COUNT = 15;

const MinesweeperGame = ({ onClose }) => {
  const { colors } = useTheme();
  const [board, setBoard] = useState([]);
  const [gameState, setGameState] = useState('waiting'); // waiting, playing, won, lost
  const [mineLocations, setMineLocations] = useState([]);
  const [flagCount, setFlagCount] = useState(MINE_COUNT);

  const initializeBoard = useCallback(() => {
    const newBoard = Array(GRID_SIZE).fill().map(() => 
      Array(GRID_SIZE).fill().map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborCount: 0
      }))
    );

    // Place mines randomly
    const mines = [];
    while (mines.length < MINE_COUNT) {
      const x = Math.floor(Math.random() * GRID_SIZE);
      const y = Math.floor(Math.random() * GRID_SIZE);
      const key = `${x}-${y}`;
      
      if (!mines.includes(key)) {
        mines.push(key);
        newBoard[y][x].isMine = true;
      }
    }

    // Calculate neighbor counts
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (!newBoard[y][x].isMine) {
          let count = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const ny = y + dy;
              const nx = x + dx;
              if (ny >= 0 && ny < GRID_SIZE && nx >= 0 && nx < GRID_SIZE) {
                if (newBoard[ny][nx].isMine) count++;
              }
            }
          }
          newBoard[y][x].neighborCount = count;
        }
      }
    }

    setBoard(newBoard);
    setMineLocations(mines);
    setGameState('playing');
    setFlagCount(MINE_COUNT);
  }, []);

  const revealCell = (x, y) => {
    if (gameState !== 'playing' || board[y][x].isRevealed || board[y][x].isFlagged) return;

    const newBoard = [...board];
    
    if (newBoard[y][x].isMine) {
      // Game over - reveal all mines
      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          if (newBoard[row][col].isMine) {
            newBoard[row][col].isRevealed = true;
          }
        }
      }
      setGameState('lost');
    } else {
      // Reveal cell and potentially flood fill
      const toReveal = [[x, y]];
      const revealed = new Set();

      while (toReveal.length > 0) {
        const [cx, cy] = toReveal.pop();
        const key = `${cx}-${cy}`;
        
        if (revealed.has(key) || cx < 0 || cx >= GRID_SIZE || cy < 0 || cy >= GRID_SIZE) continue;
        if (newBoard[cy][cx].isRevealed || newBoard[cy][cx].isFlagged || newBoard[cy][cx].isMine) continue;

        revealed.add(key);
        newBoard[cy][cx].isRevealed = true;

        // If this cell has no neighboring mines, reveal all neighbors
        if (newBoard[cy][cx].neighborCount === 0) {
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              toReveal.push([cx + dx, cy + dy]);
            }
          }
        }
      }

      // Check win condition
      let unrevealedCount = 0;
      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          if (!newBoard[row][col].isRevealed && !newBoard[row][col].isMine) {
            unrevealedCount++;
          }
        }
      }

      if (unrevealedCount === 0) {
        setGameState('won');
      }
    }

    setBoard(newBoard);
  };

  const toggleFlag = (e, x, y) => {
    e.preventDefault();
    if (gameState !== 'playing' || board[y][x].isRevealed) return;

    const newBoard = [...board];
    newBoard[y][x].isFlagged = !newBoard[y][x].isFlagged;
    
    setFlagCount(prev => newBoard[y][x].isFlagged ? prev - 1 : prev + 1);
    setBoard(newBoard);
  };

  const resetGame = () => {
    setGameState('waiting');
    setBoard([]);
    setMineLocations([]);
    setFlagCount(MINE_COUNT);
  };

  const getCellContent = (cell, x, y) => {
    if (cell.isFlagged) return '🚩';
    if (!cell.isRevealed) return '';
    if (cell.isMine) return '💣';
    if (cell.neighborCount === 0) return '';
    return cell.neighborCount;
  };

  const getCellColor = (cell) => {
    if (cell.isFlagged) return '#FFA500';
    if (!cell.isRevealed) return colors.secondary;
    if (cell.isMine) return '#FF0000';
    
    const colorMap = {
      1: '#0000FF', 2: '#008000', 3: '#FF0000', 4: '#000080',
      5: '#800000', 6: '#008080', 7: '#000000', 8: '#808080'
    };
    
    return cell.neighborCount > 0 ? colorMap[cell.neighborCount] : colors.background;
  };

  // Prevent arrow keys from scrolling the page when game is active
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    };

    if (gameState === 'playing') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [gameState]);

  return (
    <div className="minesweeper-game" style={{ color: colors.text }}>
      <div className="game-info">
        <h4>Mines: {flagCount}</h4>
        <h4>Status: {gameState === 'won' ? 'You Win!' : gameState === 'lost' ? 'Game Over!' : 'Playing'}</h4>
        
        {gameState === 'waiting' && (
          <motion.button
            className="start-button"
            onClick={initializeBoard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ backgroundColor: '#FF6B35', color: 'white' }}
          >
            Start Game
          </motion.button>
        )}
        
        {(gameState === 'won' || gameState === 'lost') && (
          <motion.button
            className="restart-button"
            onClick={resetGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ backgroundColor: '#FF6B35', color: 'white' }}
          >
            Play Again
          </motion.button>
        )}
      </div>

      {board.length > 0 && (
        <div 
          className="game-board"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 30px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 30px)`,
            gap: '2px',
            backgroundColor: colors.secondary,
            padding: '10px',
            border: `2px solid ${colors.accent}`,
            margin: '20px auto'
          }}
        >
          {board.map((row, y) =>
            row.map((cell, x) => (
              <motion.button
                key={`${x}-${y}`}
                className="mine-cell"
                onClick={() => revealCell(x, y)}
                onContextMenu={(e) => toggleFlag(e, x, y)}
                whileHover={{ scale: cell.isRevealed ? 1 : 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: '30px',
                  height: '30px',
                  border: cell.isRevealed ? '1px solid #999' : '2px outset #ccc',
                  backgroundColor: cell.isRevealed ? '#ddd' : '#ccc',
                  color: getCellColor(cell),
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: cell.isRevealed ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                disabled={cell.isRevealed}
              >
                {getCellContent(cell, x, y)}
              </motion.button>
            ))
          )}
        </div>
      )}

      <div className="controls" style={{ color: colors.textSecondary }}>
        <p>Left click to reveal • Right click to flag</p>
        <p>Find all mines without clicking on them!</p>
      </div>
    </div>
  );
};

export default MinesweeperGame;
