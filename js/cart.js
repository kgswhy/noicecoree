document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const cartItems = document.querySelectorAll('.cart-item');
    const qtyBtns = document.querySelectorAll('.qty-btn');
    const checkboxes = document.querySelectorAll('.item-select input[type="checkbox"]');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // Calculate and update subtotal
    function updateSubtotal() {
        const totalPrice = document.querySelector('.total-price');
        let total = 0;
        
        cartItems.forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                const priceText = item.querySelector('.current-price').textContent;
                const qty = parseInt(item.querySelector('.qty-value').textContent);
                const price = parseInt(priceText.replace(/\D/g, ''));
                total += price * qty;
            }
        });
        
        // Format the total with dots as thousand separators
        const formattedTotal = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        totalPrice.textContent = `RP ${formattedTotal}`;
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
            updateSubtotal();
        });
    });
    
    // Checkbox event listeners
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateSubtotal();
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
    
    // Initialize subtotal on page load
    updateSubtotal();
    
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