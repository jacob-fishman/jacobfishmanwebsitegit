import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : true; // Default to dark mode
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDarkMode));
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      primary: isDarkMode ? '#ffffff' : '#1a1a1a',
      secondary: isDarkMode ? '#cccccc' : '#4a5568',
      background: isDarkMode ? '#040404' : '#f7fafc',
      cardBackground: '#ffffff',
      contentBackground: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(26, 32, 44, 0.85)',
      accent: isDarkMode ? '#ffb3b3' : '#3182ce',
      text: isDarkMode ? '#ffffff' : '#1a202c',
      textSecondary: isDarkMode ? '#cccccc' : '#4a5568',
      logoBackground: isDarkMode ? 'transparent' : 'rgba(26, 32, 44, 0.85)',
      cardBorder: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      shadow: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.15)',
      contentText: isDarkMode ? '#ffffff' : '#ffffff',
      cardText: '#1a202c'
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
