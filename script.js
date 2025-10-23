// --- Shopping Cart Logic ---

let cartCount = 0;
const cartCountElement = document.getElementById('cart-count');
// Select all Add to Cart buttons on the homepage
const productButtons = document.querySelectorAll('.product-grid .product button');
// Select the Add to Cart button on the detail page (product.html)
const detailButton = document.querySelector('.product-info .add-to-cart-btn');

function updateCartCount() {
    // This updates the number next to the cart icon
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// 1. Logic for buttons on the main homepage
productButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Prevent clicking the button from navigating to the detail page (since it's inside an <a> tag)
        e.preventDefault(); 
        
        cartCount++;
        updateCartCount();
        alert('Item added to cart! Total items: ' + cartCount);
    });
});

// 2. Logic for the button on the detail page (product.html)
// This code will run when you click the button on the second page
if (detailButton) {
    detailButton.addEventListener('click', () => {
        // Assumes the quantity input works (input type="number")
        const quantityInput = document.querySelector('input[type="number"]');
        const quantity = parseInt(quantityInput.value) || 1; // Get quantity or default to 1
        
        cartCount += quantity;
        updateCartCount();
        alert(quantity + ' items added to cart! Total items: ' + cartCount);
    });
}

// Ensure the count is correct when the page first loads
updateCartCount();