/* ==========================================
   KAKEGURUI WEBSITE JAVASCRIPT
   Interactive features and animations
   ========================================== */

// ========== NAVBAR SCROLL EFFECT ==========
// Add shadow to navbar when user scrolls down
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== SMOOTH SCROLLING FOR NAVIGATION LINKS ==========
// Enhanced smooth scrolling with offset for fixed navbar
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== ANIMATED CARD ENTRANCE ==========
// Animate cards when they come into viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            // Trigger animation
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            // Stop observing after animation
            animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', function() {
    const cardsToAnimate = document.querySelectorAll(
        '.character-card, .theme-card, .stat-card'
    );
    
    cardsToAnimate.forEach(card => {
        animateOnScroll.observe(card);
    });
});

// ========== PARALLAX EFFECT FOR HERO SECTION ==========
// Create subtle parallax effect on hero content
window.addEventListener('scroll', function() {
    const heroContent = document.querySelector('.hero-content');
    const scrollPosition = window.scrollY;
    
    if (heroContent && scrollPosition < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrollPosition / window.innerHeight);
    }
});

// ========== CARD SUIT ANIMATION ==========
// Rotate card suits on hover randomly
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.hero-cards .card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const randomRotation = Math.random() * 360;
            this.style.transform = `rotate(${randomRotation}deg) scale(1.2)`;
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    });
});

// ========== DYNAMIC CARD EFFECTS ==========
// Add dynamic hover effects to character and theme cards
document.addEventListener('DOMContentLoaded', function() {
    const interactiveCards = document.querySelectorAll('.character-card, .theme-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            createSparkles(e.currentTarget);
        });
    });
});

// ========== SPARKLE EFFECT FUNCTION ==========
// Creates a subtle sparkle effect when hovering over cards
function createSparkles(element) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = '#c41e3a';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    
    const rect = element.getBoundingClientRect();
    sparkle.style.left = Math.random() * rect.width + 'px';
    sparkle.style.top = Math.random() * rect.height + 'px';
    
    element.style.position = 'relative';
    element.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

// Add sparkle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: scale(0) translateY(0);
        }
        100% {
            opacity: 0;
            transform: scale(1) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// ========== LOADING ANIMATION ==========
// Fade in page content on load
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ========== SECTION HIGHLIGHT ON SCROLL ==========
// Highlight active navigation link based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.style.color = '#c41e3a';
        }
    });
});

// ========== MOUSE TRAIL EFFECT (OPTIONAL) ==========
// Create a subtle red trail following the cursor
let isTrailEnabled = true; // Set to false to disable

if (isTrailEnabled) {
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.9) { // Only create trail 10% of the time for performance
            const trail = document.createElement('div');
            trail.className = 'mouse-trail';
            trail.style.left = e.pageX + 'px';
            trail.style.top = e.pageY + 'px';
            
            document.body.appendChild(trail);
            
            setTimeout(() => trail.remove(), 1000);
        }
    });
    
    // Add trail styles
    const trailStyle = document.createElement('style');
    trailStyle.textContent = `
        .mouse-trail {
            position: absolute;
            width: 5px;
            height: 5px;
            background: radial-gradient(circle, rgba(196, 30, 58, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            animation: fadeTrail 1s ease-out forwards;
            z-index: 9999;
        }
        
        @keyframes fadeTrail {
            to {
                opacity: 0;
                transform: scale(2);
            }
        }
    `;
    document.head.appendChild(trailStyle);
}

//Easter eggs

//Console Messages
console.log('%c賭ケグルイ - Kakegurui', 'color: #c41e3a; font-size: 24px; font-weight: bold;');
console.log('%cWelcome to the world of compulsive gambling!', 'color: #cccccc; font-size: 14px;');
console.log('%cLet\'s get our gambling freak on! 🎴', 'color: #c41e3a; font-size: 14px;');

//Title Easter Egg
function AlterImage(){
    const CharImages = document.querySelectorAll('.character-image');

    CharImages.forEach(image => {
        if(image.src.includes('Normal')) {
            image.src = image.src.replace('Normal', 'Thrilled');
        } else {
            image.src = image.src.replace('Thrilled', 'Normal');
        }
    });
}