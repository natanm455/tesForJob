// Main JavaScript for Holth Catering website

document.addEventListener('DOMContentLoaded', function() {
  // Initialize modules
  initNavigation();
  initMenuTabs();
  initTestimonialSlider();
  initScrollAnimation();
  initContactForm();
  initNewsletterForm();
});

// Header scroll effect
function initNavigation() {
  const header = document.getElementById('header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  // Scroll event for header
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });
  
  // Close mobile menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
  
  // Smooth scrolling for anchor links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Active nav link on scroll
  window.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
    
    // Handle case when at the top of the page
    if (scrollPosition < 100) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === 'index.html') {
          link.classList.add('active');
        }
      });
    }
  });
}

// Menu tabs
function initMenuTabs() {
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuCategories = document.querySelectorAll('.menu-category');
  
  menuTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs and categories
      menuTabs.forEach(tab => tab.classList.remove('active'));
      menuCategories.forEach(category => category.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding category
      this.classList.add('active');
      const menuType = this.dataset.menu;
      document.getElementById(menuType).classList.add('active');
    });
  });
  
  // Add menu content for other categories
  populateMenuCategories();
}

function populateMenuCategories() {
  // Menu data
  const menuData = {
    hovedrett: [
      {
        name: 'Langtidsstekt Lammeskanker',
        description: 'Møre lammeskanker servert med rotgrønnsaker og rødvinssaus',
        price: '285 kr',
        image: 'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Ovnsbakt Torskefilet',
        description: 'Fersk torskefilet med bacon, ertepuré og sandefjordsmør',
        price: '245 kr',
        image: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Hjortestek',
        description: 'Hjortestek servert med selleripuré, sopp og einebærsaus',
        price: '325 kr',
        image: 'https://images.pexels.com/photos/299348/pexels-photo-299348.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Vegetarisk Portobello',
        description: 'Fylte portobellosopp med quinoa, grønnsaker og chèvrekrem',
        price: '195 kr',
        image: 'https://images.pexels.com/photos/5093661/pexels-photo-5093661.jpeg?auto=compress&cs=tinysrgb&w=600'
      }
    ],
    dessert: [
      {
        name: 'Tilslørte Bondepiker',
        description: 'Tradisjonell norsk dessert med eplemos, krem og kavring',
        price: '115 kr',
        image: 'https://images.pexels.com/photos/1291712/pexels-photo-1291712.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Sjokoladefondant',
        description: 'Varm sjokoladefondant med vaniljeis og bringebærsaus',
        price: '135 kr',
        image: 'https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Crème Brûlée',
        description: 'Klassisk crème brûlée smaksatt med vanilje',
        price: '125 kr',
        image: 'https://images.pexels.com/photos/8952906/pexels-photo-8952906.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Bærpavlova',
        description: 'Marengs med pisket krem og friske norske bær',
        price: '120 kr',
        image: 'https://images.pexels.com/photos/5409007/pexels-photo-5409007.jpeg?auto=compress&cs=tinysrgb&w=600'
      }
    ],
    drikke: [
      {
        name: 'Lokalt Håndverksøl',
        description: 'Utvalg av håndverksøl fra lokale bryggerier',
        price: '95 kr',
        image: 'https://images.pexels.com/photos/1269025/pexels-photo-1269025.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Vinpakke',
        description: 'Nøye utvalgte viner tilpasset menyen',
        price: 'fra 475 kr',
        image: 'https://images.pexels.com/photos/1479706/pexels-photo-1479706.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Alkoholfri Pakke',
        description: 'Hjemmelagde safter og alkoholfrie alternativer',
        price: '275 kr',
        image: 'https://images.pexels.com/photos/616840/pexels-photo-616840.jpeg?auto=compress&cs=tinysrgb&w=600'
      },
      {
        name: 'Kaffe & Te',
        description: 'Utvalg av kaffe og te servert med hjemmelaget petit fours',
        price: '85 kr',
        image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600'
      }
    ]
  };
  
  // Populate menu categories
  Object.keys(menuData).forEach(category => {
    const menuCategory = document.getElementById(category);
    if (!menuCategory) return;
    
    let menuHtml = '<div class="menu-grid">';
    
    menuData[category].forEach((item, index) => {
      menuHtml += `
        <div class="menu-item" data-aos="fade-up" data-aos-delay="${index * 100}">
          <div class="menu-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="menu-item-details">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="menu-item-price">${item.price}</span>
          </div>
        </div>
      `;
    });
    
    menuHtml += '</div>';
    menuCategory.innerHTML = menuHtml;
  });
}

// Testimonial slider
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  let currentSlide = 0;
  
  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }
  
  // Initialize slider
  showSlide(currentSlide);
  
  // Event listeners
  prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
  
  // Auto slide
  let interval = setInterval(() => showSlide(currentSlide + 1), 5000);
  
  // Pause auto slide on hover
  const slider = document.querySelector('.testimonial-slider');
  slider.addEventListener('mouseenter', () => clearInterval(interval));
  slider.addEventListener('mouseleave', () => {
    clearInterval(interval);
    interval = setInterval(() => showSlide(currentSlide + 1), 5000);
  });
}

// Scroll animations
function initScrollAnimation() {
  const animatedElements = document.querySelectorAll('[data-aos]');
  
  function checkInView() {
    const windowHeight = window.innerHeight;
    const windowTopPosition = window.scrollY;
    const windowBottomPosition = windowTopPosition + windowHeight;
    
    animatedElements.forEach(element => {
      const elementHeight = element.offsetHeight;
      const elementTopPosition = getElementTopPosition(element);
      const elementBottomPosition = elementTopPosition + elementHeight;
      
      // Check if element is in viewport
      if (
        elementBottomPosition >= windowTopPosition &&
        elementTopPosition <= windowBottomPosition
      ) {
        element.classList.add('aos-animate');
      } else {
        // Uncomment to make elements animate again when out of view
        // element.classList.remove('aos-animate');
      }
    });
  }
  
  function getElementTopPosition(element) {
    let top = 0;
    while (element) {
      top += element.offsetTop;
      element = element.offsetParent;
    }
    return top;
  }
  
  // Add delay to elements
  animatedElements.forEach((element, index) => {
    const delay = element.getAttribute('data-aos-delay');
    if (!delay && index > 0) {
      // Add staggered delay to elements without specified delay
      const parentDelay = (index % 4) * 100;
      element.setAttribute('data-aos-delay', parentDelay);
    }
  });
  
  // Check elements on load and scroll
  window.addEventListener('load', checkInView);
  window.addEventListener('scroll', checkInView);
  window.addEventListener('resize', checkInView);
  
  // Initial check
  checkInView();
}

// Contact form
function initContactForm() {
  const bookingForm = document.getElementById('booking-form');
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(bookingForm);
      const formDataObj = {};
      
      formData.forEach((value, key) => {
        formDataObj[key] = value;
      });
      
      // Simulate form submission
      const submitBtn = bookingForm.querySelector('.submit-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sender...';
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form Data:', formDataObj);
        
        // Reset form
        bookingForm.reset();
        
        // Show success message
        submitBtn.textContent = 'Sendt!';
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Forespørsel';
          
          alert('Takk for din henvendelse! Vi vil kontakte deg snart.');
        }, 3000);
      }, 2000);
    });
  }
}

// Newsletter form
function initNewsletterForm() {
  const newsletterForm = document.getElementById('newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get email
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      // Simulate form submission
      const submitBtn = newsletterForm.querySelector('button');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sender...';
      
      // Simulate API call
      setTimeout(() => {
        console.log('Newsletter Subscription:', email);
        
        // Reset form
        newsletterForm.reset();
        
        // Show success message
        submitBtn.textContent = 'Sendt!';
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Abonner';
          
          alert('Takk for at du abonnerer på vårt nyhetsbrev!');
        }, 3000);
      }, 1500);
    });
  }
}