import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { colors } = useTheme();
  const [displayText, setDisplayText] = useState('');
  const fullText = "Hi, I'm Jacob Fishman!";

  useEffect(() => {
    let index = 0;
    const typeCharacter = () => {
      if (index < fullText.length) {
        setDisplayText(fullText.substring(0, index + 1));
        index++;
        setTimeout(typeCharacter, 110);
      }
    };
    typeCharacter();
  }, []);

  return (
    <motion.div 
      className="header"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className="header-element"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          style={{
            backgroundColor: colors.logoBackground,
            borderRadius: '15px',
            padding: '20px 40px',
            backdropFilter: colors.logoBackground === 'transparent' ? 'none' : 'blur(10px)',
            border: colors.logoBackground === 'transparent' ? 'none' : `1px solid ${colors.cardBorder}`,
            boxShadow: colors.logoBackground === 'transparent' ? 'none' : `0 8px 32px ${colors.shadow}`
          }}
        >
          <h1 id="typed-header" style={{ color: colors.contentText }}>
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              |
            </motion.span>
          </h1>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="header-element"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.div
          style={{
            backgroundColor: colors.logoBackground,
            borderRadius: '15px',
            padding: '15px',
            backdropFilter: colors.logoBackground === 'transparent' ? 'none' : 'blur(10px)',
            border: colors.logoBackground === 'transparent' ? 'none' : `1px solid ${colors.cardBorder}`,
            boxShadow: colors.logoBackground === 'transparent' ? 'none' : `0 8px 32px ${colors.shadow}`
          }}
        >
          <img 
            src="/deptcswhitetext.png" 
            alt="University of Maryland CS Department" 
            id="university-of-maryland-logo" 
            height="120"
            style={{
              filter: colors.isDarkMode ? 'none' : 'brightness(1.2) contrast(1.1)'
            }}
          />
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="header-element"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.img 
          className="header-image" 
          src="/cropped-headshot-2.jpg" 
          alt="Jacob Fishman"
        />
      </motion.div>
    </motion.div>
  );
};

export default Header;
