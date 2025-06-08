import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const GRID_SIZE = 15;
const INITIAL_PACMAN = { x: 7, y: 7 };
const INITIAL_GHOSTS = [
  { x: 1, y: 1, color: '#FF0000' },
  { x: 13, y: 1, color: '#FFB6C1' },
  { x: 1, y: 13, color: '#00FFFF' },
  { x: 13, y: 13, color: '#FFA500' }
];

const PacManGame = ({ onClose }) => {
  const { colors } = useTheme();
  
  const isWall = (x, y) => {
    // More open maze pattern - only create walls at specific positions
    if (x === 0 || x === GRID_SIZE - 1 || y === 0 || y === GRID_SIZE - 1) {
      return true; // Border walls
    }
    
    // Create some internal walls for maze structure but keep it open
    if ((x === 3 || x === 11) && (y >= 3 && y <= 5)) return true;
    if ((x === 3 || x === 11) && (y >= 9 && y <= 11)) return true;
    if ((y === 3 || y === 11) && (x >= 5 && x <= 9)) return true;
    if (x === 7 && (y === 6 || y === 8)) return true; // Small center obstacles
    
    return false;
  };

  const [pacman, setPacman] = useState(INITIAL_PACMAN);
  const [ghosts, setGhosts] = useState(INITIAL_GHOSTS);
  const [dots, setDots] = useState(() => {
    const initialDots = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        // Don't place dots on walls or starting positions
        if (!isWall(x, y) && !(x === 7 && y === 7) && 
            !INITIAL_GHOSTS.some(ghost => ghost.x === x && ghost.y === y)) {
          initialDots.push({ x, y });
        }
      }
    }
    return initialDots;
  });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [direction, setDirection] = useState({ x: 0, y: 0 });

  const isValidMove = (x, y) => {
    return x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE && !isWall(x, y);
  };

  const moveGhosts = useCallback(() => {
    if (!gameStarted || gameOver) return;

    setGhosts(currentGhosts => 
      currentGhosts.map(ghost => {
        const directions = [
          { x: 0, y: -1 }, { x: 0, y: 1 }, 
          { x: -1, y: 0 }, { x: 1, y: 0 }
        ];
        
        // Get all valid moves
        const validMoves = directions.filter(dir => 
          isValidMove(ghost.x + dir.x, ghost.y + dir.y)
        );
        
        // If no valid moves, ghost stays in place (shouldn't happen with open maze)
        if (validMoves.length === 0) return ghost;
        
        // Simple AI: prefer moves that get closer to Pac-Man, but add some randomness
        const movesWithDistance = validMoves.map(move => {
          const newX = ghost.x + move.x;
          const newY = ghost.y + move.y;
          const distanceToPacman = Math.abs(newX - pacman.x) + Math.abs(newY - pacman.y);
          return { move, distance: distanceToPacman };
        });
        
        // Sort by distance (closest first)
        movesWithDistance.sort((a, b) => a.distance - b.distance);
        
        // 70% chance to pick the best move, 30% chance for some randomness
        let chosenMove;
        if (Math.random() < 0.7 && movesWithDistance.length > 0) {
          chosenMove = movesWithDistance[0].move;
        } else {
          // Pick a random valid move for more natural movement
          chosenMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        }
        
        return {
          ...ghost,
          x: ghost.x + chosenMove.x,
          y: ghost.y + chosenMove.y
        };
      })
    );
  }, [pacman, gameStarted, gameOver, isValidMove]);

  const movePacman = useCallback(() => {
    if (!gameStarted || gameOver || (direction.x === 0 && direction.y === 0)) return;

    setPacman(currentPacman => {
      const newX = currentPacman.x + direction.x;
      const newY = currentPacman.y + direction.y;

      if (!isValidMove(newX, newY)) {
        return currentPacman;
      }

      // Check for dot collection
      setDots(currentDots => {
        const newDots = currentDots.filter(dot => !(dot.x === newX && dot.y === newY));
        if (newDots.length < currentDots.length) {
          setScore(prev => prev + 10);
        }
        return newDots;
      });

      return { x: newX, y: newY };
    });
  }, [direction, gameStarted, gameOver]);

  const handleMobileControl = (newDirection) => {
    if (!gameStarted || gameOver) return;
    
    switch (newDirection) {
      case 'up':
        setDirection({ x: 0, y: -1 });
        break;
      case 'down':
        setDirection({ x: 0, y: 1 });
        break;
      case 'left':
        setDirection({ x: -1, y: 0 });
        break;
      case 'right':
        setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  };

  const resetGame = () => {
    setPacman(INITIAL_PACMAN);
    setGhosts(INITIAL_GHOSTS);
    setDots(() => {
      const initialDots = [];
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          if (!isWall(x, y) && !(x === 7 && y === 7) && 
              !INITIAL_GHOSTS.some(ghost => ghost.x === x && ghost.y === y)) {
            initialDots.push({ x, y });
          }
        }
      }
      return initialDots;
    });
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    setDirection({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted) return;
      
      // Prevent default behavior for arrow keys to stop page scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      
      switch (e.key) {
        case 'ArrowUp':
          setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted]);

  useEffect(() => {
    // Pac-Man moves faster than ghosts for better gameplay
    const pacmanInterval = setInterval(() => {
      movePacman();
    }, 120);

    const ghostInterval = setInterval(() => {
      moveGhosts();
    }, 200); // Ghosts move slower than Pac-Man

    return () => {
      clearInterval(pacmanInterval);
      clearInterval(ghostInterval);
    };
  }, [movePacman, moveGhosts]);

  useEffect(() => {
    // Check collision with ghosts
    const collision = ghosts.some(ghost => 
      ghost.x === pacman.x && ghost.y === pacman.y
    );
    
    if (collision) {
      setGameOver(true);
    }
    
    // Check win condition
    if (dots.length === 0 && gameStarted) {
      setGameOver(true);
    }
  }, [pacman, ghosts, dots, gameStarted]);

  return (
    <div className="pacman-game" style={{ color: colors.text }}>
      <div className="game-info">
        <h4>Score: {score}</h4>
        <h4>Dots: {dots.length}</h4>
        {!gameStarted && !gameOver && (
          <motion.button
            className="start-button"
            onClick={resetGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ backgroundColor: '#FFEB3B', color: 'black' }}
          >
            Start Game
          </motion.button>
        )}
        {gameOver && (
          <div className="game-over">
            <h4>{dots.length === 0 ? 'You Win!' : 'Game Over!'}</h4>
            <motion.button
              className="restart-button"
              onClick={resetGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ backgroundColor: '#FFEB3B', color: 'black' }}
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
          gridTemplateColumns: `repeat(${GRID_SIZE}, 25px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 25px)`,
          gap: '1px',
          backgroundColor: '#000080',
          padding: '10px',
          border: `2px solid ${colors.accent}`
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);
          
          const isPacman = pacman.x === x && pacman.y === y;
          const ghost = ghosts.find(g => g.x === x && g.y === y);
          const hasDot = dots.some(dot => dot.x === x && dot.y === y);
          const wall = isWall(x, y);
          
          return (
            <motion.div
              key={index}
              className="grid-cell"
              style={{
                width: '25px',
                height: '25px',
                backgroundColor: wall ? '#0000FF' : '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: wall ? '2px' : '0'
              }}
            >
              {isPacman && (
                <motion.div
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#FFFF00',
                    borderRadius: '50%',
                    position: 'relative'
                  }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      width: '0',
                      height: '0',
                      borderLeft: '8px solid #000000',
                      borderTop: '6px solid transparent',
                      borderBottom: '6px solid transparent',
                      right: '6px',
                      top: '6px'
                    }}
                  />
                </motion.div>
              )}
              {ghost && (
                <motion.div
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: ghost.color,
                    borderRadius: '50% 50% 0 0',
                    position: 'relative'
                  }}
                  animate={{ y: [-1, 1, -1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: '0',
                      width: '100%',
                      height: '6px',
                      background: `linear-gradient(45deg, ${ghost.color} 25%, transparent 25%, transparent 75%, ${ghost.color} 75%)`
                    }}
                  />
                </motion.div>
              )}
              {hasDot && !isPacman && !ghost && (
                <motion.div
                  style={{
                    width: '4px',
                    height: '4px',
                    backgroundColor: '#FFFF00',
                    borderRadius: '50%'
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
      
      {/* Mobile Touch Controls */}
      <div className="mobile-controls" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginTop: '20px',
        gap: '10px'
      }}>
        <motion.button
          onClick={() => handleMobileControl('up')}
          whileTap={{ scale: 0.9 }}
          style={{
            padding: '15px 20px',
            backgroundColor: '#FFEB3B',
            color: 'black',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          ↑
        </motion.button>
        <div style={{ display: 'flex', gap: '10px' }}>
          <motion.button
            onClick={() => handleMobileControl('left')}
            whileTap={{ scale: 0.9 }}
            style={{
              padding: '15px 20px',
              backgroundColor: '#FFEB3B',
              color: 'black',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ←
          </motion.button>
          <motion.button
            onClick={() => handleMobileControl('right')}
            whileTap={{ scale: 0.9 }}
            style={{
              padding: '15px 20px',
              backgroundColor: '#FFEB3B',
              color: 'black',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            →
          </motion.button>
        </div>
        <motion.button
          onClick={() => handleMobileControl('down')}
          whileTap={{ scale: 0.9 }}
          style={{
            padding: '15px 20px',
            backgroundColor: '#FFEB3B',
            color: 'black',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          ↓
        </motion.button>
      </div>
      
      <div className="controls" style={{ color: colors.textSecondary }}>
        <p>Use arrow keys or touch controls to move Pac-Man</p>
        <p>Eat all dots while avoiding ghosts!</p>
      </div>
    </div>
  );
};

export default PacManGame;
