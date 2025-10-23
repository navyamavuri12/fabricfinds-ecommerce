// --- Global Cart Setup ---
// Initialize the cart from local storage, or use an empty array if nothing is saved.
let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
const cartCountElement = document.getElementById('cart-count');

// Function to save the current state of the cart to the browser's storage
function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// Function to calculate and update the total quantity in the header icon
function updateCartCount() {
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.quantity;
    });
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// --- Add To Cart Logic (for product.html and index.html) ---

// Select all Add to Cart buttons on the page
const allAddToCartButtons = document.querySelectorAll('.add-to-cart-btn');

allAddToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        // Get the product data directly from the button's data attributes
        const productId = button.getAttribute('data-product-id');
        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));
        
        // Get quantity (from the input box on the detail page, or default to 1 on homepage)
        let quantity = 1;
        const quantityInput = document.getElementById('product-quantity');
        if (quantityInput) {
            quantity = parseInt(quantityInput.value) || 1;
        }

        // Check if the item is already in the cart
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            // If it exists, just increase the quantity
            existingItem.quantity += quantity;
        } else {
            // If it's new, add it as a new item
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: quantity,
            });
        }
        
        // Save and refresh the count
        saveCart();
        updateCartCount();
        alert(`${quantity} x ${productName} added to cart!`);
        
        // If we are on the cart page, update the display immediately
        if (window.location.pathname.endsWith('cart.html')) {
            displayCartItems();
        }
    });
});

// --- Cart Display Logic (for cart.html only) ---

function displayCartItems() {
    const cartItemsBody = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let totalAmount = 0;

    if (!cartItemsBody) return; // Stop if we are not on the cart.html page

    // Clear any previous content
    cartItemsBody.innerHTML = ''; 

    if (cart.length === 0) {
        cartItemsBody.innerHTML = '<tr><td colspan="5">Your shopping cart is currently empty.</td></tr>';
        cartTotalElement.textContent = `₹0.00`;
        return;
    }

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        totalAmount += subtotal;

        const row = document.createElement('tr');
        row.style.borderBottom = '1px dashed #eee'; // Style the rows
        row.innerHTML = `
            <td style="padding: 10px;">${item.name}</td>
            <td style="padding: 10px;">₹${item.price.toFixed(2)}</td>
            <td style="padding: 10px;">
                <input type="number" value="${item.quantity}" min="1" 
                       data-item-id="${item.id}" onchange="updateQuantity(this)"
                       style="width: 50px; text-align: center; border: 1px solid #ccc; border-radius: 5px;">
            </td>
            <td style="padding: 10px;">₹${subtotal.toFixed(2)}</td>
            <td style="padding: 10px;">
                <button onclick="removeItem('${item.id}')" style="background: none; border: none; color: #ff5722; cursor: pointer;">Remove</button>
            </td>
        `;
        cartItemsBody.appendChild(row);
    });

    cartTotalElement.textContent = `₹${totalAmount.toFixed(2)}`;
}

// Function to update item quantity from the input box on cart.html
function updateQuantity(input) {
    const itemId = input.getAttribute('data-item-id');
    const newQuantity = parseInt(input.value);

    const item = cart.find(i => i.id === itemId);
    if (item && newQuantity > 0) {
        item.quantity = newQuantity;
        saveCart();
        updateCartCount();
        displayCartItems(); // Re-render the cart table
    } else if (newQuantity <= 0) {
        removeItem(itemId);
    }
}

// Function to remove an item completely
function removeItem(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartCount();
    displayCartItems(); // Re-render the cart table
}


// --- Initialization ---
updateCartCount(); // Run once to display the count on all pages

// Only run the display logic if the page is cart.html
if (window.location.pathname.endsWith('cart.html')) {
    displayCartItems();
}