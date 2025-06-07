import React from 'react';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import NavigationCards from './components/NavigationCards';
import Summary from './components/Summary';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Arcade from './components/Arcade';
import AnimatedBackground from './components/AnimatedBackground';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <AnimatedBackground />
        <ThemeToggle />
        <div className="wrapper">
          <Header />
          <NavigationCards />
          <Summary />
          <Experience />
          <Skills />
          <Resume />
          <Contact />
          <Arcade />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
