document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const cartItems = document.querySelectorAll('.cart-item');
    const qtyBtns = document.querySelectorAll('.qty-btn');
    const checkboxes = document.querySelectorAll('.item-select input[type="checkbox"]');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // Format price with commas and currency symbol
    function formatPrice(price) {
        return price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
    
    // Update total price
    function updateTotalPrice() {
        const total = calculateTotal();
        const totalPrice = document.querySelector('.total-price');
        totalPrice.textContent = formatPrice(total);
    }
    
    // Calculate total price
    function calculateTotal() {
        let total = 0;
        const checkedItems = document.querySelectorAll('.cart-item input[type="checkbox"]:checked');
        
        checkedItems.forEach(checkbox => {
            const cartItem = checkbox.closest('.cart-item');
            const quantity = parseInt(cartItem.querySelector('.qty-value').textContent);
            const price = parseFloat(cartItem.querySelector('.current-price').textContent.replace('$', '').replace(',', ''));
            total += quantity * price;
        });
        
        return total;
    }
    
    // Quantity button event listeners
    qtyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const itemQty = btn.parentElement;
            const qtyValue = itemQty.querySelector('.qty-value');
            let qty = parseInt(qtyValue.textContent);
            
            if (btn.classList.contains('plus')) {
                qty++;
            } else if (btn.classList.contains('minus') && qty > 1) {
                qty--;
            }
            
            qtyValue.textContent = qty;
            updateTotalPrice();
        });
    });
    
    // Checkbox event listeners
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateTotalPrice();
        });
    });
    
    // Checkout button event listener
    checkoutBtn.addEventListener('click', () => {
        // Check if any items are selected
        const selectedItems = document.querySelectorAll('.item-select input[type="checkbox"]:checked');
        
        if (selectedItems.length === 0) {
            alert('Please select at least one item to proceed to checkout.');
            return;
        }
        
        // Simulate checkout process
        alert('Proceeding to checkout...');
        // In a real application, you would redirect to a checkout page
    });
    
    // Initialize total price on page load
    updateTotalPrice();
    
    // Add hover animation to cart items
    cartItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
            item.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = 'none';
        });
    });
}); 