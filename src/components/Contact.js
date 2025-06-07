import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { FaEnvelope, FaUser, FaComment, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (replace with actual email service)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <motion.div 
      id="contact" 
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
        Get In Touch
      </motion.h2>
      
      <motion.p 
        className="content-subheader"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        style={{ color: colors.contentText }}
      >
        Let's connect! I'm always open to discussing new opportunities and interesting projects.
      </motion.p>

      <motion.form 
        className="contact-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="form-row">
          <motion.div 
            className="form-group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="input-wrapper">
              <FaUser className="input-icon" style={{ color: colors.accent }} />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.secondary
                }}
              />
            </div>
          </motion.div>

          <motion.div 
            className="form-group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" style={{ color: colors.accent }} />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.secondary
                }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="form-group"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="input-wrapper">
            <FaComment className="input-icon" style={{ color: colors.accent }} />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              style={{
                backgroundColor: colors.background,
                color: colors.text,
                borderColor: colors.secondary
              }}
            />
          </div>
        </motion.div>

        <motion.div 
          className="form-group"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            style={{
              backgroundColor: colors.background,
              color: colors.text,
              borderColor: colors.secondary
            }}
          />
        </motion.div>

        <motion.button
          type="submit"
          className="submit-button"
          disabled={!isFormValid || isSubmitting}
          whileHover={{ scale: isFormValid ? 1.05 : 1 }}
          whileTap={{ scale: isFormValid ? 0.95 : 1 }}
          style={{
            backgroundColor: isFormValid ? colors.accent : colors.secondary,
            color: colors.background
          }}
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              ⟳
            </motion.div>
          ) : (
            <>
              <FaPaperPlane /> Send Message
            </>
          )}
        </motion.button>

        {submitStatus && (
          <motion.div
            className={`submit-status ${submitStatus}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              color: submitStatus === 'success' ? '#4CAF50' : '#f44336'
            }}
          >
            {submitStatus === 'success' 
              ? '✓ Message sent successfully!' 
              : '✗ Failed to send message. Please try again.'
            }
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  );
};

export default Contact;
