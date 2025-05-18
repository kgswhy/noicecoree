document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements that should be animated
    const animatedElements = document.querySelectorAll('.invite-content, .invite-image, .promo-card, .newsletter-content');
    
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

    // Add staggered animation to promo cards
    const promoCards = document.querySelectorAll('.promo-card');
    promoCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Toggle terms visibility
    const detailsToggleButtons = document.querySelectorAll('.details-toggle');
    
    detailsToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const promoTerms = button.closest('.promo-content').querySelector('.promo-terms');
            
            if (promoTerms.classList.contains('show')) {
                promoTerms.classList.remove('show');
                button.innerHTML = '<i class="fas fa-info-circle"></i> Terms';
            } else {
                promoTerms.classList.add('show');
                button.innerHTML = '<i class="fas fa-times-circle"></i> Close';
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Simple validation
            if (!email || !email.includes('@') || !email.includes('.')) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            newsletterForm.innerHTML = '<p class="success-message"><i class="fas fa-check-circle"></i> Thank you for subscribing!</p>';
        });
    }

    // Hover effects for invite image
    const inviteImage = document.querySelector('.invite-image');
    if (inviteImage) {
        inviteImage.addEventListener('mouseenter', () => {
            inviteImage.style.transform = 'translateY(-10px)';
        });
        
        inviteImage.addEventListener('mouseleave', () => {
            inviteImage.style.transform = 'translateY(0)';
        });
    }

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