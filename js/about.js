document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements that should be animated
    const animatedElements = document.querySelectorAll('.intro-content, .intro-image, .journey-content, .journey-image, .future-content, .future-image');
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });

    // Initialize Intersection Observer to detect when elements are visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    });

    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Add staggered animation to sections
    const sectionElements = [
        document.querySelector('.intro-content'),
        document.querySelector('.intro-image'),
        document.querySelector('.journey-content'),
        document.querySelector('.journey-image'),
        document.querySelector('.future-content'),
        document.querySelector('.future-image')
    ];

    sectionElements.forEach((element, index) => {
        if (element) {
            element.style.transitionDelay = `${index * 0.15}s`;
        }
    });

    // Add hover animation for images
    const images = document.querySelectorAll('section img');
    images.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 