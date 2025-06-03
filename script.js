// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Get DOM elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    navbar.classList.toggle('nav-open');
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

// Enhanced FAQ Accordion with Smooth Animation
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items smoothly
        faqItems.forEach(faqItem => {
            const faqAnswer = faqItem.querySelector('.faq-answer');
            if (faqItem !== item) {
                faqItem.classList.remove('active');
                faqAnswer.style.maxHeight = '0';
            }
        });

        // Toggle clicked item
        item.classList.toggle('active');
        if (!isActive) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = '0';
        }
    });
});

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
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = '#ffffff';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

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

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTooltips();
    animateOnScroll();
}); 