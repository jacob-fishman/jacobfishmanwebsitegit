// Initialize particles.js
particlesJS("particles-js", {
  particles: {
    number: { value: 170, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 1, random: false },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 100, color: "#ffffff", opacity: .5, width: 1 },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 70, line_linked: { opacity: 1 } },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

// Get overlay canvas and its context
const overlayCanvas = document.getElementById('overlay-canvas');
const overlayCtx = overlayCanvas.getContext('2d');

// Resize the overlay canvas to match the window size
function resizeOverlayCanvas() {
  overlayCanvas.width = window.innerWidth;
  overlayCanvas.height = window.innerHeight;
}
resizeOverlayCanvas();
window.addEventListener('resize', resizeOverlayCanvas);

// Store the current mouse position
let mouse = { x: null, y: null };
document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Animation loop to draw lines between the cursor and particles within a defined radius
function drawLines() {
  // Clear the overlay canvas each frame
  overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

  // Ensure mouse position is defined and particles are loaded
  if (mouse.x !== null && mouse.y !== null && window.pJSDom && window.pJSDom[0] &&
      window.pJSDom[0].pJS && window.pJSDom[0].pJS.particles.array) {
    
    const particlesArray = window.pJSDom[0].pJS.particles.array;
    const radius = 150; // Adjust this value as desired
    
    overlayCtx.strokeStyle = "rgba(255, 255, 255, .7)";
    overlayCtx.lineWidth = 1;

    const scale = window.devicePixelRatio || 1;
    particlesArray.forEach(particle => {
      // Scale particle coordinates
      const particleX = particle.x / scale;
      const particleY = particle.y / scale;

      // Only consider particles that are fully visible on the overlay canvas
      if (!(particleX >= 0 && particleX <= overlayCanvas.width && particleY >= 0 && particleY <= overlayCanvas.height)) {
        return;
      }
      
      const dx = particleX - mouse.x;
      const dy = particleY - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= radius) {
        overlayCtx.beginPath();
        overlayCtx.moveTo(mouse.x, mouse.y);
        overlayCtx.lineTo(particleX, particleY);
        overlayCtx.stroke();
      }
    });
  }
  
  // Continue the animation loop
  requestAnimationFrame(drawLines);
}
drawLines();