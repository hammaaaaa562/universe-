// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + '+';
      }
    };
    
    updateCounter();
  });
}

function updateActiveButton(activeBtn) {
  document.querySelectorAll('.rotate-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  activeBtn.classList.add('active');
}

function initTshirtRotation() {
  const tshirt3d = document.querySelector('.tshirt-3d');
  const rotateFront = document.getElementById('rotate-front');
  const rotateBack = document.getElementById('rotate-back');
  const rotate3d = document.getElementById('rotate-3d');
  
  if (tshirt3d && rotateFront && rotateBack && rotate3d) {
    // Initialize with front view active (this should match your HTML)
    tshirt3d.classList.add('show-front');
    updateActiveButton(rotateFront);
    
    rotateFront.addEventListener('click', () => {
      tshirt3d.classList.remove('show-back', 'show-3d');
      tshirt3d.classList.add('show-front');
      updateActiveButton(rotateFront);
    });
    
    rotateBack.addEventListener('click', () => {
      tshirt3d.classList.remove('show-front', 'show-3d');
      tshirt3d.classList.add('show-back');
      updateActiveButton(rotateBack);
    });
    
    rotate3d.addEventListener('click', () => {
      tshirt3d.classList.remove('show-front', 'show-back');
      tshirt3d.classList.add('show-3d');
      updateActiveButton(rotate3d);
    });
  }
  
  function updateActiveButton(activeBtn) {
    document.querySelectorAll('.rotate-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
  }
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      
      if (entry.target.classList.contains('stat-number')) {
        animateCounters();
      }
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  // Initialize t-shirt rotation
  initTshirtRotation();
  
  // Animate elements on scroll
  const animateElements = document.querySelectorAll('.about-card, .community-card, .feature');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
  
  // Animate stats
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    stat.style.opacity = '0';
    observer.observe(stat);
  });
  
  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Navbar background on scroll
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navmenu');
    if (window.scrollY > 100) {
      nav.style.background = 'rgba(15, 15, 35, 0.95)';
    } else {
      nav.style.background = 'rgba(15, 15, 35, 0.8)';
    }
  });
  
  // Form submission
  const form = document.querySelector('.glow-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('🚀 Awesome! Your message has been launched into the universe! We\'ll get back to you soon.');
      form.reset();
    });
  }
});