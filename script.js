// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    
    function closeMenu() {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function openMenu() {
        if (hamburger) hamburger.classList.add('active');
        if (navMenu) navMenu.classList.add('active');
        if (menuOverlay) menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            if (navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Close menu when clicking on overlay
        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMenu);
        }
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link, .cta-button');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Calculate offset for fixed navbar
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow only when scrolling
        if (currentScroll > 10) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(document.querySelectorAll('.nav-link'));
    
    function highlightActiveSection() {
        const scrollPosition = window.pageYOffset + 150; // Offset for navbar
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            // Disable submit button
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Clear previous status messages
            if (formStatus) {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }
            
            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success
                    submitButton.textContent = 'Message Sent!';
                    submitButton.style.background = '#28a745';
                    
                    if (formStatus) {
                        formStatus.textContent = 'Thank you! We\'ll respond within 24 hours.';
                        formStatus.className = 'form-status success';
                    }
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button after 5 seconds
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.style.background = '';
                        submitButton.disabled = false;
                        if (formStatus) {
                            formStatus.textContent = '';
                            formStatus.className = 'form-status';
                        }
                    }, 5000);
                } else {
                    // Error
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Handle error
                submitButton.textContent = 'Error - Try Again';
                submitButton.style.background = '#dc3545';
                
                if (formStatus) {
                    formStatus.textContent = 'Sorry, there was an error. Please try again or email us directly.';
                    formStatus.className = 'form-status error';
                }
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.service-card, .use-case-card, .case-study-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

