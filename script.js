console.log('🔥 Script.js loaded!');

try {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    console.log('✅ AOS initialized');
} catch (error) {
    console.error('❌ Error initializing AOS:', error);
}


// Parallax effect (only if container exists)
const container = document.querySelector('.img-container');
if (container) {
    const img = container.querySelector('.parallax-img');
    if (img) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const moveX = (x - rect.width / 2) * 0.05;
            const moveY = (y - rect.height / 2) * 0.05;

            // inverso al mouse
            img.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
        });

        container.addEventListener('mouseleave', () => {
            img.style.transform = 'translate(0,0)';
        });
    }
}




// Hamburger menu setup
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔍 Looking for DOM elements...');

    // Get DOM elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    console.log('🍔 Hamburger element:', hamburger);
    console.log('📱 Nav-links element:', navLinks);
    console.log('🧭 Navbar element:', navbar);

    if (!hamburger) {
        console.error('❌ Hamburger element not found!');
        return;
    }
    if (!navLinks) {
        console.error('❌ Nav-links element not found!');
        return;
    }

    // Mobile Navigation Toggle
    console.log('✅ Adding click listener to hamburger');
    hamburger.addEventListener('click', (e) => {
        console.log('🍔 Hamburger clicked!', e);
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        navbar.classList.toggle('nav-open');
        console.log('📱 Menu toggled. Active classes:', {
            navLinks: navLinks.classList.contains('active'),
            hamburger: hamburger.classList.contains('active'),
            navbar: navbar.classList.contains('nav-open')
        });
    });

    console.log('✅ Hamburger setup completed');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.hamburger')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        navbar.classList.remove('nav-open');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            navbar.classList.remove('nav-open');
        }
    });
});

// FAQ now works with pure CSS - no JavaScript needed!

// Enhanced Form Validation and Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData);
    
    // Basic form validation
    let isValid = true;
    let errorMessage = '';

    if (!formObject.nombre || formObject.nombre.trim() === '') {
        isValid = false;
        errorMessage += 'Por favor, ingrese su nombre.\n';
    }

    if (!formObject.email || !formObject.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        isValid = false;
        errorMessage += 'Por favor, ingrese un email válido.\n';
    }

    if (!formObject.mensaje || formObject.mensaje.trim() === '') {
        isValid = false;
        errorMessage += 'Por favor, ingrese su mensaje.\n';
    }

    if (!isValid) {
        alert(errorMessage);
        return;
    }
    
    try {
        // Here you would typically send the form data to your backend
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
        contactForm.reset();
        
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Hubo un error al enviar el mensaje. Por favor, intente nuevamente.');
    }
});

// Scroll-based Navbar Background


// Enhanced Scroll-based Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in');
    const triggerBottom = window.innerHeight * 0.8;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Initialize tooltips with enhanced positioning
const initTooltips = () => {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
        element.addEventListener('mouseover', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = element.getAttribute('data-tooltip');
            
            document.body.appendChild(tooltip);
            
            const elementRect = element.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            let top = elementRect.top - tooltipRect.height - 10;
            let left = elementRect.left + (elementRect.width - tooltipRect.width) / 2;
            
            // Adjust if tooltip would go off screen
            if (top < 0) {
                top = elementRect.bottom + 10;
                tooltip.classList.add('tooltip-bottom');
            }
            if (left < 0) {
                left = 0;
            } else if (left + tooltipRect.width > window.innerWidth) {
                left = window.innerWidth - tooltipRect.width;
            }
            
            tooltip.style.top = `${top + window.scrollY}px`;
            tooltip.style.left = `${left}px`;
            
            element.addEventListener('mouseout', () => {
                tooltip.remove();
            });
        });
    });
};




// Hero Image Carousel
let heroCarouselInterval = null;

// Make function globally accessible
window.initHeroCarousel = function() {
    console.log('🚀 Initializing hero carousel...');
    
    const carousel = document.querySelector('.hero-image-carousel');
    if (!carousel) {
        console.log('❌ Carousel element not found');
        return;
    }
    
    console.log('✅ Carousel element found');
    
    const bg1 = carousel.getAttribute('data-bg-1');
    const bg2 = carousel.getAttribute('data-bg-2');
    
    console.log('🖼️ BG1:', bg1);
    console.log('🖼️ BG2:', bg2);
    
    if (!bg1 || !bg2) {
        console.log('❌ Missing background attributes');
        return;
    }
    
    const backgrounds = [bg1, bg2];
    let currentIndex = 0;
    
    const showNextImage = () => {
        currentIndex = (currentIndex + 1) % backgrounds.length;
        const newImage = backgrounds[currentIndex];
        carousel.style.backgroundImage = `url('${newImage}')`;
        console.log('🔄 Auto-switched to:', newImage, 'at', new Date().toLocaleTimeString());
    };
    
    // Clear any existing interval
    if (heroCarouselInterval) {
        console.log('🧹 Clearing existing interval');
        clearInterval(heroCarouselInterval);
    }
    
    // Start the carousel - change every 4 seconds
    heroCarouselInterval = setInterval(showNextImage, 4000);
    console.log('✅ Hero carousel started! Changing every 4 seconds...');
    
    // Store interval globally for debugging
    window.heroInterval = heroCarouselInterval;
};


// Video container positioning - Calculate navbar height dynamically
function adjustVideoContainer() {
    const navbar = document.querySelector('.navbar');
    const videoContainer = document.querySelector('.video-container');
    const hero = document.querySelector('.hero');
    
    if (!navbar || !videoContainer) return;
    
    // Get actual navbar height (including padding and margins)
    const navbarHeight = navbar.offsetHeight;
    
    // Always set video container to start after navbar
    videoContainer.style.top = `${navbarHeight}px`;
    
    // Calculate height based on viewport and navbar
    if (window.innerWidth <= 800) {
        // Mobile: use hero height minus navbar
        const heroHeight = hero ? hero.offsetHeight : 500;
        const calculatedHeight = heroHeight - navbarHeight;
        // Ensure height is positive
        videoContainer.style.height = `${Math.max(calculatedHeight, 100)}px`;
    } else {
        // Desktop: use viewport height minus navbar
        videoContainer.style.height = `calc(100vh - ${navbarHeight}px)`;
    }
    
    // Force update to ensure styles are applied
    videoContainer.style.position = 'absolute';
    videoContainer.style.zIndex = '0';
    
    console.log(`📐 Navbar height: ${navbarHeight}px, Video top: ${navbarHeight}px, Width: ${window.innerWidth}px`);
}

// Video trimming for mobile - Remove last seconds on mobile only
let videoTrimHandler = null;

function setupVideoTrimming() {
    const heroVideo = document.getElementById('hero-video');
    if (!heroVideo) return;
    
    // Check if mobile device
    const isMobile = window.innerWidth <= 800;
    const trimSeconds = 5; // Segundos a recortar del final
    
    // Remove existing handler if any
    if (videoTrimHandler) {
        heroVideo.removeEventListener('timeupdate', videoTrimHandler);
        videoTrimHandler = null;
    }
    
    if (isMobile) {
        // Setup trimming only once when metadata is loaded
        const setupTrim = () => {
            const duration = heroVideo.duration;
            if (duration && duration > trimSeconds) {
                const maxTime = duration - trimSeconds;
                
                videoTrimHandler = () => {
                    if (heroVideo.currentTime >= maxTime) {
                        heroVideo.currentTime = 0; // Volver al inicio antes del final
                    }
                };
                
                heroVideo.addEventListener('timeupdate', videoTrimHandler);
                console.log(`📱 Mobile: Video trimmed. Duration: ${duration.toFixed(2)}s, Max time: ${maxTime.toFixed(2)}s`);
            }
        };
        
        // Setup if already loaded, or wait for metadata
        if (heroVideo.readyState >= 1) {
            setupTrim();
        } else {
            heroVideo.addEventListener('loadedmetadata', setupTrim, { once: true });
        }
    } else {
        console.log('🖥️ Desktop: Video plays full length');
    }
}

// Re-adjust video container on window resize (global listener)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        adjustVideoContainer();
        // Re-setup video trimming when window size changes
        setupVideoTrimming();
    }, 50); // Reduced timeout for faster response
});

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM Content Loaded');
    initTooltips();
    animateOnScroll();
    
    // Adjust video container position immediately
    adjustVideoContainer();
    
    // Setup video trimming for mobile
    setupVideoTrimming();
    
    // Adjust again after a short delay to ensure navbar is fully rendered
    setTimeout(() => {
        adjustVideoContainer();
        setupVideoTrimming(); // Re-setup in case video wasn't loaded yet
    }, 100);
    
    // Initialize hero carousel with a small delay to ensure everything is loaded
    setTimeout(() => {
        console.log('⏰ Initializing carousel after DOM load...');
        initHeroCarousel();
        // Re-adjust after carousel loads
        adjustVideoContainer();
        setupVideoTrimming(); // Final setup
    }, 500);
});

// Also try to initialize on window load as backup
window.addEventListener('load', () => {
    console.log('🖼️ Window Loaded');
    // Adjust video container after everything loads
    adjustVideoContainer();
    // Setup video trimming after video is fully loaded
    setupVideoTrimming();
    setTimeout(() => {
        console.log('⏰ Initializing carousel after window load...');
        initHeroCarousel();
        // Final adjustment after carousel loads
        adjustVideoContainer();
        setupVideoTrimming(); // Final setup
    }, 500);
}); 