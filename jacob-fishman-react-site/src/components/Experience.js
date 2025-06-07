import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Experience = () => {
  const { colors } = useTheme();

  return (
    <motion.div 
      id="experience" 
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
        Work Experience
      </motion.h2>
      
      <motion.p 
        className="content-subheader"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        style={{ color: colors.contentText }}
      >
        My past internships:
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
            <td>Travelers Software Engineering Intern</td>
            <td>Spearheaded development of an automated AWS S3 storage size calculator that generates a comprehensive monthly report using Terraform.</td>
          </tr>
          <tr className="extra-table-row"></tr>
          <tr>
            <td>Cyber 2.0 Software Engineering Intern</td>
            <td>Developed two client-facing applications using Python and SQL: a remote backup software that accesses a certain network and backs up specific computers according to a schedule, and an email-sorting application for clients to separate their cybersecurity emails from the rest of their emails.</td>
          </tr>
        </tbody>
      </motion.table>

      <motion.h2 
        className="content-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        style={{ color: colors.contentText }}
      >
        Project Experience
      </motion.h2>
      
      <motion.p 
        className="content-subheader"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        style={{ color: colors.contentText }}
      >
        Most Impactful Projects I've Completed:
      </motion.p>

      <motion.table 
        className="body-table"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        viewport={{ once: true }}
        style={{ color: colors.contentText }}
      >
        <tbody>
          <tr>
            <td>Bunge Global - Student Consultant</td>
            <td>Collaborated on a team of engineering and business students to enhance Bunge's hiring process through data-driven solutions and user-centered design.</td>
          </tr>
          <tr className="extra-table-row"></tr>
          <tr>
            <td>Build-it Break-it Project</td>
            <td>Engineered a secure ATM/Bank system with robust encryption protocols using OpenSSL, ensuring end-to-end message confidentiality and integrity and demonstrating proficiency in secure system design and ethical hacking.</td>
          </tr>
          <tr className="extra-table-row"></tr>
          <tr>
            <td>TextMeWeather</td>
            <td>Tested and integrated AWS Lambda functions with API Gateway. Created AWS Athena query and Javascript dashboard to visualize business implications of usage.</td>
          </tr>
        </tbody>
      </motion.table>
    </motion.div>
  );
};

export default Experience;
