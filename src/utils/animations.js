// Typing animation for the header
export function initializeTypingAnimation() {
  document.addEventListener('DOMContentLoaded', function() {
    const headerElement = document.querySelector('.header-element h1');
    if (!headerElement) return;
    
    const text = "Hi, I'm Jacob Fishman!";
    let index = 0;
    headerElement.textContent = "";
    
    function typeCharacter() {
      if (index < text.length) {
        headerElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeCharacter, 110); // adjust typing speed here
      }
    }
    
    typeCharacter();
  });
}

// Optimized skill image animations with debouncing
export function initializeSkillAnimations() {
  document.addEventListener('DOMContentLoaded', function() {
    const skillImages = document.querySelectorAll("#skills img");
    
    // Use a more performant approach with CSS classes instead of direct style manipulation
    skillImages.forEach(img => {
      let timeoutId;
      
      img.addEventListener("mouseenter", function() {
        clearTimeout(timeoutId);
        img.classList.add('skill-hover');
      });
      
      img.addEventListener("mouseleave", function() {
        img.classList.add('skill-leave');
        img.classList.remove('skill-hover');
        
        // Reset classes after animation completes
        timeoutId = setTimeout(() => {
          img.classList.remove('skill-leave');
        }, 1000);
      });
    });
  });
}

// Optimized intersection observer for content headers
export function initializeContentHeaderAnimations() {
  document.addEventListener('DOMContentLoaded', function() {
    const contentHeaders = document.querySelectorAll('.content-header');
    
    // Use a single intersection observer with optimized options
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.typed) {
          // Use requestAnimationFrame for smoother animations
          requestAnimationFrame(() => {
            const fullText = entry.target.textContent;
            entry.target.textContent = "";
            let index = 0;
            
            function typeCharacter() {
              if (index < fullText.length) {
                entry.target.textContent += fullText.charAt(index);
                index++;
                setTimeout(typeCharacter, 100);
              } else {
                entry.target.dataset.typed = "true";
                headerObserver.unobserve(entry.target);
              }
            }
            typeCharacter();
          });
        }
      });
    }, { 
      threshold: 0.5,
      rootMargin: '50px' // Start animation slightly before element is fully visible
    });
    
    contentHeaders.forEach(header => headerObserver.observe(header));
  });
}

// Initialize all animations
export function initializeAllAnimations() {
  initializeTypingAnimation();
  initializeSkillAnimations();
  initializeContentHeaderAnimations();
}
