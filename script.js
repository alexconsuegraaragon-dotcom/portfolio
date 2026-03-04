// ============================================
// Modern Data Portfolio - Interactive JavaScript
// ============================================

// Typing Animation for Hero Section
const typingTexts = ['Data Analyst', 'Neurocientífico Computacional', 'Problem Solver'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeText() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500; // Pause before next word
    }

    setTimeout(typeText, typingSpeed);
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.dashboard-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active state manually for immediate feedback
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// Intersection Observer for Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Project Card Interactions
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add subtle scale effect
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Skill Badge Interactions
function initSkillBadges() {
    const skillBadges = document.querySelectorAll('.skill-badge');

    skillBadges.forEach(badge => {
        badge.addEventListener('click', () => {
            // Add ripple effect
            badge.style.transform = 'translateY(-5px) scale(0.95)';
            setTimeout(() => {
                badge.style.transform = 'translateY(-5px) scale(1)';
            }, 150);
        });
    });
}

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-links a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY + 150;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Parallax Effect for Hero Section (subtle)
function handleParallax() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && window.scrollY < window.innerHeight) {
        const scrolled = window.scrollY;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 500);
    }
}

// Add smooth reveal animation to sections
function revealSections() {
    const sections = document.querySelectorAll('.section');

    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        threshold: 0.15
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize smooth scroll
    initSmoothScroll();

    // Initialize interactive elements
    initProjectCards();
    initSkillBadges();

    // Handle Theme Toggle (Default is now Light, Toggles to Dark)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        // Initial state check
        const icon = themeToggle.querySelector('i');

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            if (document.body.classList.contains('dark-theme')) {
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // Mobile Sidebar Toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.dashboard-header').prepend(mobileMenuBtn);

    const sidebar = document.getElementById('sidebar');

    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 &&
            sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            !mobileMenuBtn.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });

    // Close sidebar when clicking a link on mobile
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Reveal sections on scroll
    revealSections();

    // Add scroll event listeners (throttled for performance)
    window.addEventListener('scroll', throttle(() => {
        updateActiveNavLink();
        handleParallax();
    }, 100));
});

// Add CSS for active nav link (inject dynamically)
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--color-text-primary) !important;
    }
    
    .nav-links a.active::after {
        width: 100% !important;
    }
    
    .section-visible {
        animation: fadeInUp 0.8s ease-out;
    }
    
    .menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(8px, 8px);
    }
    
    .menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Console easter egg for recruiters 😊
console.log('%c👋 Hola! Soy Alejandro', 'font-size: 20px; font-weight: bold; color: #10b981;');
console.log('%c¿Interesado en trabajar juntos?', 'font-size: 14px; color: #3b82f6;');
console.log('%c📧 alex.consuegraaragon@gmail.com', 'font-size: 12px; color: #f59e0b;');
console.log('%c✨ Este portfolio fue diseñado con atención al detalle', 'font-size: 10px; color: #a1a1aa;');

// ============================================
// Modal System for Project Details
// ============================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    }
}

// Close modal when clicking outside content
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal.id);
        }
    }
});
