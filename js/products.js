document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const productsCount = document.getElementById('productsCount');
    const noResults = document.querySelector('.no-results');
    
    // Filter products based on category
    function filterProducts(category) {
        let visibleCount = 0;
        
        productCards.forEach(card => {
            // First, remove any existing animation classes
            card.classList.remove('fadeIn');
            
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                // Apply animation and show card
                card.classList.remove('hidden');
                card.classList.add('fadeIn');
                visibleCount++;
            } else {
                // Hide card
                card.classList.add('hidden');
            }
        });
        
        // Update products count
        productsCount.textContent = visibleCount;
        
        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }
    
    // Search products by name
    function searchProducts(query) {
        query = query.toLowerCase().trim();
        let visibleCount = 0;
        
        if (query === '') {
            // If search is empty, restore active filter category
            const activeFilter = document.querySelector('.filter-btn.active');
            filterProducts(activeFilter.getAttribute('data-category'));
            return;
        }
        
        productCards.forEach(card => {
            // Remove existing animation classes
            card.classList.remove('fadeIn');
            
            const productName = card.querySelector('h3').textContent.toLowerCase();
            
            if (productName.includes(query)) {
                // Apply animation and show card
                card.classList.remove('hidden');
                card.classList.add('fadeIn');
                visibleCount++;
            } else {
                // Hide card
                card.classList.add('hidden');
            }
        });
        
        // Update products count
        productsCount.textContent = visibleCount;
        
        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
        
        // Clear active state from filter buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });
    }
    
    // Event listener for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Clear search input
            searchInput.value = '';
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter products
            const category = button.getAttribute('data-category');
            filterProducts(category);
        });
    });
    
    // Event listener for search button
    searchBtn.addEventListener('click', () => {
        searchProducts(searchInput.value);
    });
    
    // Event listener for search input (search as you type)
    searchInput.addEventListener('input', debounce(() => {
        searchProducts(searchInput.value);
    }, 300));
    
    // Event listener for pressing Enter in search input
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchProducts(searchInput.value);
        }
    });
    
    // Debounce function to limit the rate at which a function can fire
    function debounce(func, delay) {
        let timeoutId;
        return function() {
            const context = this;
            const args = arguments;
            
            clearTimeout(timeoutId);
            
            timeoutId = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    }
    
    // Initialize products with "All" filter
    filterProducts('all');
    
    // Add animations when products come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    });
    
    productCards.forEach(card => {
        observer.observe(card);
    });
}); 