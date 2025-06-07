import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedBackground = () => {
  const { isDarkMode } = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Ensure the canvas always matches the window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Define color palette based on theme
    const colors = isDarkMode ? [
      '#ff6b6b', // vibrant red
      '#ffa726', // vibrant orange
      '#ffeb3b', // vibrant yellow
      '#66bb6a', // vibrant green
      '#26c6da', // vibrant cyan
      '#42a5f5', // vibrant blue
      '#ab47bc'  // vibrant magenta
    ] : [
      '#1a202c', // dark navy
      '#2d3748', // dark gray
      '#4a5568', // medium gray
      '#2c5282', // darker blue
      '#1e3a8a', // deep blue
      '#312e81', // indigo
      '#581c87'  // purple
    ];

    // Set a modest number of streaks for a subtle effect
    const STREAK_COUNT = isDarkMode ? 40 : 80;

    class Streak {
      constructor() {
        // For the initial spawn, use a longer delay so that rockets start entering gradually.
        this.initial = true;
        this.delay = Math.floor(Math.random() * 400); // initial delay: 30-90 frames
        // Do not call reset() immediately, so initial properties remain unset until delay elapses
      }

      reset() {
        // Randomly choose a spawn side: off the right edge or off the top edge
        if (Math.random() < 0.5) {
          // Spawn off the right edge: x is greater than canvas.width, y is anywhere on the canvas
          this.x = canvas.width + Math.floor(Math.random() * 100) + 20; // at least 20px off-screen
          this.y = Math.random() * canvas.height / 2;
        } else {
          // Spawn off the top edge: y is less than 0, x is anywhere on the canvas
          this.x = Math.random() * canvas.width + (canvas.width / 2);
          this.y = -Math.floor(Math.random() * 100) - 20; // at least 20px off-screen above
        }
        // Set speed for a subtle diagonal movement (left and down)
        // Set speed for diagonal movement with a constant slope
        const factor = 2 + (Math.random() * 4);
        const slope = 0.5; // constant ratio of vertical to horizontal speed
        this.speedX = -factor;
        this.speedY = factor * slope;

        // Choose a random color from the palette
        this.color = colors[Math.floor(Math.random() * colors.length)];
        // Set transparency based on theme - higher opacity for light mode
        this.alpha = isDarkMode ? (0.3 + Math.random() * 0.3) : (0.6 + Math.random() * 0.4);

        // Set tail length and thickness based on theme - thicker for light mode
        this.length = isDarkMode ? (5 + Math.random() * 5) : (8 + Math.random() * 8);
        this.thickness = isDarkMode ? (1 + Math.random() * 1) : (2 + Math.random() * 2);
      }

      update() {
        // If a delay is active, decrement it and, when it reaches 0, reset the rocket.
        if (this.delay > 0) {
          this.delay--;
          if (this.delay === 0) {
            this.reset();
          }
          return;
        }
      
        // Normal movement update.
        this.x += this.speedX;
        this.y += this.speedY;
      
        // When the rocket moves off-screen (bottom-left), set a short delay.
        if (this.x < -200 || this.y > canvas.height + 200) {
          // Set a delay between 0 and 9 frames before respawning.
          this.delay = Math.floor(Math.random() * 10);
        }
      }
      
      draw() {
        // Skip drawing while waiting for the delay.
        if (this.delay > 0) return;

        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.thickness;
        
        // Calculate the tail's endpoint.
        const tailX = this.x - this.speedX * this.length;
        const tailY = this.y - this.speedY * this.length;
        
        // Draw the tail line.
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        
        // Draw a thicker dot at the end of the tail.
        ctx.beginPath();
        // Set the radius to be larger than the line width; adjust as desired.
        const dotRadius = this.thickness * 1;
        ctx.arc(tailX, tailY, dotRadius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Create an array of streaks
    const streaks = [];
    for (let i = 0; i < STREAK_COUNT; i++) {
      streaks.push(new Streak());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const streak of streaks) {
        streak.update();
        streak.draw();
      }
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      id="rocketCanvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
    />
  );
};

export default AnimatedBackground;
