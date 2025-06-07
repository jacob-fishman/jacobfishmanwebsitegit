import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Resume = () => {
  const { colors } = useTheme();

  return (
    <motion.div 
      id="resume" 
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
        Resume
      </motion.h2>
      
      <motion.p 
        className="content-subheader"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        style={{ color: colors.contentText }}
      >
        View/Download My Resume
      </motion.p>
      
      <div id="resume-warning">
        <p>Open website on a larger screen to view resume!</p>
      </div>
      
      <motion.div 
        id="resume-holder"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <iframe 
          id="resume-embed" 
          title="JacobFishmanResume" 
          src="https://docs.google.com/document/d/1N4lZpTDZ07gJhD6HxeOf3Xprqy8eAZPtQa7EPIyrr6g/preview"
        ></iframe>
      </motion.div>
      
      <motion.a 
        className="content-body linkout" 
        href="/Jacob Fishman Career Fair Resume 2.pdf" 
        download="JacobFishmanResume"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05, color: colors.accent }}
        style={{ 
          color: colors.contentText,
          textDecoration: 'underline',
          display: 'inline-block',
          marginTop: '1rem'
        }}
      >
        Download it!
      </motion.a>
    </motion.div>
  );
};

export default Resume;
