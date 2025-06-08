import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const NavigationCards = () => {
  const { colors } = useTheme();
  const smoothScroll = (targetId) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    // Use the browser's native smooth scrolling for better performance
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  const cards = [
    { id: 'about', title: 'Summary', image: '/analysis2.png', alt: 'About Me' },
    { id: 'experience', title: 'Experience', image: '/working-at-computer-cropped.jpg', alt: 'Experience' },
    { id: 'skills', title: 'Skills', image: '/laptop-with-code.jpg', alt: 'Skills', imageId: 'laptop-with-code-img' },
    { id: 'resume', title: 'Resume', image: '/cv2.png', alt: 'Resume' },
    { id: 'contact', title: 'Contact', image: '/contact-us.png', alt: 'Contact' },
    { id: 'arcade', title: 'Arcade', image: '/arcade-game.png', alt: 'Arcade' }
  ];

  return (
    <motion.div 
      className="cards-box"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.div 
        className="container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="card"
            variants={cardVariants}
            onClick={() => smoothScroll(card.id)}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            style={{
              backgroundColor: colors.cardBackground,
              border: `2px solid ${colors.cardBorder}`
            }}
          >
            <img 
              src={card.image} 
              alt={card.alt}
              id={card.imageId}
            />
            <div className="card-content">
              <h2 style={{ color: colors.cardText }}>
                {card.title}
              </h2>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default NavigationCards;
