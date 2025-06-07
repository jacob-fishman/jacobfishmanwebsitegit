import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Summary = () => {
  const { colors } = useTheme();

  return (
    <motion.div 
      id="about" 
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
        Summary
      </motion.h2>
      <motion.h4 
        className="content-subheader"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        style={{ color: colors.contentText }}
      >
        I am a 2025 graduate of the University of Maryland, searching for a full-time role in software engineering or product management.
      </motion.h4>
      <motion.p 
        className="content-body"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        style={{ color: colors.contentText }}
      >
        My communication skills set me apart, allowing collaboration across large teams to solve complex business problems.
      </motion.p>
    </motion.div>
  );
};

export default Summary;
