import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { FaGamepad, FaTimes, FaAppleAlt, FaCube, FaGhost, FaBomb } from 'react-icons/fa';
import SnakeGame from './games/SnakeGame';
import TetrisGame from './games/TetrisGame';
import PacManGame from './games/PacManGame';
import MinesweeperGame from './games/MinesweeperGame';

const Arcade = () => {
  const { colors } = useTheme();
  const [selectedGame, setSelectedGame] = useState(null);

  // Hide/show theme toggle when game modal opens/closes
  useEffect(() => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      if (selectedGame) {
        themeToggle.style.display = 'none';
      } else {
        themeToggle.style.display = 'flex';
      }
    }

    // Cleanup function to ensure theme toggle is visible when component unmounts
    return () => {
      const themeToggle = document.querySelector('.theme-toggle');
      if (themeToggle) {
        themeToggle.style.display = 'flex';
      }
    };
  }, [selectedGame]);

  const games = [
    {
      id: 'snake',
      name: 'Snake',
      description: 'Eat food and grow!',
      color: '#4CAF50',
      component: SnakeGame,
      icon: FaAppleAlt
    },
    {
      id: 'tetris',
      name: 'Tetris',
      description: 'Stack blocks and clear lines!',
      color: '#2196F3',
      component: TetrisGame,
      icon: FaCube
    },
    {
      id: 'pacman',
      name: 'Pac-Man',
      description: 'Eat dots and avoid ghosts!',
      color: '#FFEB3B',
      component: PacManGame,
      icon: FaGhost
    },
    {
      id: 'minesweeper',
      name: 'Minesweeper',
      description: 'Find all mines without clicking on them!',
      color: '#FF6B35',
      component: MinesweeperGame,
      icon: FaBomb
    }
  ];

  const closeGame = () => {
    setSelectedGame(null);
  };

  return (
    <motion.div 
      id="arcade" 
      className="main-content"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      style={{ backgroundColor: colors.contentBackground }}
    >
      <motion.h2 
        className="content-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        style={{ color: colors.contentText }}
      >
        <FaGamepad style={{ marginRight: '10px' }} />
        Arcade
      </motion.h2>
      
      <motion.p 
        className="content-subheader"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        style={{ color: colors.contentText }}
      >
        Take a break and play some classic games I've recreated!
      </motion.p>

      <motion.div 
        className="arcade-games"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            className="game-card"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            viewport={{ once: true }}
            onClick={() => setSelectedGame(game)}
            style={{
              backgroundColor: colors.background,
              borderColor: game.color,
              color: colors.text
            }}
          >
            <div className="game-icon" style={{ backgroundColor: game.color }}>
              <game.icon />
            </div>
            <h3>{game.name}</h3>
            <p style={{ color: colors.textSecondary }}>{game.description}</p>
            <motion.button
              className="play-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ backgroundColor: game.color }}
            >
              Play Now
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedGame && (
          <motion.div
            className="game-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
          >
            <motion.div
              className="game-container"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ backgroundColor: colors.background }}
            >
              <div className="game-header">
                <h3 style={{ color: colors.text }}>{selectedGame.name}</h3>
                <motion.button
                  className="close-button"
                  onClick={closeGame}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ color: colors.text }}
                >
                  <FaTimes />
                </motion.button>
              </div>
              <div className="game-content">
                <selectedGame.component onClose={closeGame} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Arcade;
