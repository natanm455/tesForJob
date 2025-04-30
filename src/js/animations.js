// Animations JavaScript for Holth Catering website

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animation modules
  initParallaxEffect();
  initScrollReveal();
  initHoverEffects();
  initButtonAnimations();
});

// Parallax effect for hero section
function initParallaxEffect() {
  const heroBackground = document.querySelector('.hero-background');
  
  if (heroBackground) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      if (scrollPosition < window.innerHeight) {
        const translateY = scrollPosition * 0.3;
        heroBackground.style.transform = `translateY(${translateY}px)`;
      }
    });
  }
}

// Scroll reveal animations
function initScrollReveal() {
  const elements = {
    fadeUp: document.querySelectorAll('.fade-up'),
    fadeDown: document.querySelectorAll('.fade-down'),
    fadeLeft: document.querySelectorAll('.fade-left'),
    fadeRight: document.querySelectorAll('.fade-right')
  };
  
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
      rect.bottom >= 0
    );
  }
  
  // Function to add animation class when element is in viewport
  function revealOnScroll() {
    for (const [animationClass, elementsArray] of Object.entries(elements)) {
      elementsArray.forEach(element => {
        if (isInViewport(element) && !element.classList.contains('animated')) {
          element.classList.add('animated');
          element.style.animationPlayState = 'running';
        }
      });
    }
  }
  
  // Initialize elements
  for (const [animationClass, elementsArray] of Object.entries(elements)) {
    elementsArray.forEach((element, index) => {
      element.style.animationPlayState = 'paused';
      
      // Add staggered delays
      if (!element.style.animationDelay) {
        const delay = index * 0.1; // 100ms staggering
        element.style.animationDelay = `${delay}s`;
      }
    });
  }
  
  // Add scroll listener
  window.addEventListener('scroll', revealOnScroll);
  
  // Initial check
  revealOnScroll();
}

// Hover effects for interactive elements
function initHoverEffects() {
  // Service cards hover effect
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.querySelector('h3').style.color = 'var(--accent-color)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.querySelector('h3').style.color = 'var(--primary-color)';
    });
  });
  
  // Menu items hover effect
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    const image = item.querySelector('.menu-item-image img');
    
    item.addEventListener('mouseenter', function() {
      if (image) {
        image.style.transform = 'scale(1.1)';
      }
      this.style.boxShadow = 'var(--shadow-lg)';
    });
    
    item.addEventListener('mouseleave', function() {
      if (image) {
        image.style.transform = '';
      }
      this.style.boxShadow = 'var(--shadow-sm)';
    });
  });
  
  // Nav menu hover effect
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    if (!link.classList.contains('contact-btn')) {
      link.addEventListener('mouseenter', function() {
        this.style.color = 'var(--accent-color)';
      });
      
      link.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
          this.style.color = '';
        }
      });
    }
  });
}

// Button animations
function initButtonAnimations() {
  // CTA button animation
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('mouseenter', function() {
      this.classList.add('pulse');
    });
    
    ctaButton.addEventListener('mouseleave', function() {
      this.classList.remove('pulse');
      
      // Reset animation
      void this.offsetWidth;
    });
  }
  
  // Submit button animation
  const submitButton = document.querySelector('.submit-btn');
  if (submitButton) {
    submitButton.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
    });
    
    submitButton.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  }
  
  // Menu tabs animation
  const menuTabs = document.querySelectorAll('.menu-tab');
  menuTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Add subtle scale animation
      this.style.transform = 'scale(1.05)';
      
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    });
  });
  
  // Testimonial controls animation
  const testimonialControls = document.querySelectorAll('.testimonial-prev, .testimonial-next');
  testimonialControls.forEach(control => {
    control.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.2)';
    });
    
    control.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

// Function to add floating animation to elements
function addFloatingAnimation(selector, duration = 3, delay = 0) {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach((element, index) => {
    element.style.animation = `float ${duration}s ease-in-out ${delay + (index * 0.2)}s infinite`;
  });
}

// Additional animations when page is loaded
window.addEventListener('load', function() {
  // Add floating animation to specific elements
  addFloatingAnimation('.service-icon', 4, 0);
  
  // Animate testimonial quotes with subtle pulse
  const quotes = document.querySelectorAll('.testimonial-quote');
  quotes.forEach(quote => {
    quote.classList.add('pulse');
  });
  
  // Contact form labels animation
  const formLabels = document.querySelectorAll('form label');
  formLabels.forEach((label, index) => {
    label.style.opacity = '0';
    label.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      label.style.transition = 'all 0.3s ease';
      label.style.opacity = '1';
      label.style.transform = 'translateY(0)';
    }, 300 + (index * 50));
  });
});