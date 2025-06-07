import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Skills = () => {
  const { colors } = useTheme();

  return (
    <motion.div 
      id="skills" 
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
        Skills
      </motion.h2>
      
      <motion.p 
        className="content-subheader"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        style={{ color: colors.contentText }}
      >
        I am experienced in:
      </motion.p>

      <motion.table 
        className="body-table"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        style={{ color: colors.contentText }}
      >
        <tbody>
          <tr>
            <td>
              <motion.img 
                src="/python-logo-only.png" 
                alt="Python"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <br />
              Python
            </td>
            <td>
              <motion.img 
                src="/java-logo-png-transparent.png" 
                alt="Java"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <br />
              Java
            </td>
            <td>
              <motion.img 
                src="/C_Logo_2.png" 
                alt="C"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <br />
              C
            </td>
          </tr>
          <tr className="extra-table-row"></tr>
          <tr>
            <td>
              <motion.img 
                src="/Amazon-Web-Services-AWS-Symbol.png" 
                alt="AWS"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <br />
              AWS
            </td>
            <td>
              <motion.img 
                src="/sql-logo-10.png" 
                alt="SQL"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <br />
              SQL
            </td>
            <td>
              <motion.img 
                src="/git-logo-4.png" 
                alt="Git"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <br />
              Git
            </td>
          </tr>
          <tr className="extra-table-row"></tr>
          <tr>
            <td>
              <motion.img 
                src="/html-logo-white.png" 
                alt="HTML"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <br />
              HTML
            </td>
            <td>
              <motion.img 
                src="/js-logo-1.png" 
                alt="JavaScript"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <br />
              JS
            </td>
            <td>
              <motion.img 
                src="/css-logo-2.png" 
                alt="CSS"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <br />
              CSS
            </td>
          </tr>
          <tr className="extra-table-row"></tr>
        </tbody>
      </motion.table>
    </motion.div>
  );
};

export default Skills;
