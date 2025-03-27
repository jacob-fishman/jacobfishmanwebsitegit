window.smoothScroll = function(target) {
  var scrollContainer = target;
  do { //find scroll container
      scrollContainer = scrollContainer.parentNode;
      if (!scrollContainer) return;
      scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop == 0);

  var targetY = 0;
  do { //find the top of target relatively to the container
      if (target == scrollContainer) break;
      targetY += target.offsetTop;
  } while (target = target.offsetParent);

  scroll = function(c, a, b, i) {
      i++; if (i > 30) return;
      c.scrollTop = a + (b - a) / 30 * i;
      setTimeout(function(){ scroll(c, a, b, i); }, 20);
  }
  // start scrolling
  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}
const canvas = document.getElementById('rocketCanvas');
const ctx = canvas.getContext('2d');

// Ensure the canvas matches the window size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Color palette for the streaks (add or remove colors as you like)
const colors = [
  '#ff0000', // red
  '#ff9800', // orange
  '#ffff00', // yellow
  '#00ff00', // green
  '#00ffff', // cyan
  '#0000ff', // blue
  '#ff00ff'  // magenta
];

// Number of streaks
const STREAK_COUNT = 40;

// Each streak has position, velocity, color, etc.
class Streak {
  constructor() {
    this.reset();
  }

  reset() {
    // Start near top-right
    // x is near the right edge, y is near the top
    // We add some randomization so they don't all spawn in the exact corner
    this.x = canvas.width + Math.random() * 100;
    this.y = -Math.random() * 100;

    // Speed from top-right to bottom-left (negative X, positive Y)
    // Adjust the ranges to make them faster or slower
    this.speedX = -(2 + Math.random() * 2);  // e.g. between -2 and -4
    this.speedY = 2 + Math.random() * 2;     // e.g. between 2 and 4

    // Choose a random color
    this.color = colors[Math.floor(Math.random() * colors.length)];

    // Length of the streak (visual line length)
    this.length = 10 + Math.random() * 10;

    // Thickness of the streak
    this.thickness = 2 + Math.random() * 2;
  }

  update() {
    // Move the streak
    this.x += this.speedX;
    this.y += this.speedY;

    // If it has moved beyond bottom-left, reset it
    if (this.x < -200 || this.y > canvas.height + 200) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
    ctx.beginPath();

    // Draw a line from the current position 
    // to a point behind it (in the opposite direction of movement)
    // so it looks like a streak
    const vx = -this.speedX; // reversed velocity in x
    const vy = -this.speedY; // reversed velocity in y

    // “Tip” of streak is the current x,y
    // “Tail” is the tip minus velocity scaled by the length
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + vx * this.length, this.y + vy * this.length);
    ctx.stroke();
    ctx.restore();
  }
}

// Create an array of streaks
const streaks = [];
for (let i = 0; i < STREAK_COUNT; i++) {
  streaks.push(new Streak());
}

// Animation loop
function animate() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw each streak
  for (const streak of streaks) {
    streak.update();
    streak.draw();
  }

  requestAnimationFrame(animate);
}

// Start the animation
animate();