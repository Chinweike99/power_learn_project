// Product Data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        category: "electronics",
        image: "images/product1.png",
        description: "High-quality wireless headphones with noise cancellation."
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        category: "electronics",
        image: "images/product2.png",
        description: "Feature-rich smartwatch with health monitoring."
    },
    {
        id: 3,
        name: "Cotton T-Shirt",
        price: 24.99,
        category: "clothing",
        image: "images/product3.png",
        description: "Comfortable 100% cotton t-shirt in various colors."
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        price: 79.99,
        category: "electronics",
        image: "images/bluetooth.png",
        description: "Portable Bluetooth speaker with 20h battery life."
    },
    {
        id: 5,
        name: "Denim Jeans",
        price: 59.99,
        category: "clothing",
        image: "images/denim_jeans.png",
        description: "Classic fit denim jeans for everyday wear."
    },
    {
        id: 6,
        name: "Coffee Maker",
        price: 129.99,
        category: "home",
        image: "images/coffee_maker.png",
        description: "Programmable coffee maker with thermal carafe."
    },
    {
        id: 7,
        name: "Yoga Mat",
        price: 29.99,
        category: "home",
        image: "images/yoga_mat.png",
        description: "Non-slip yoga mat with carrying strap."
    },
    {
        id: 8,
        name: "Running Shoes",
        price: 89.99,
        category: "clothing",
        image: "images/running_shoes.png",
        description: "Lightweight running shoes with cushioned soles."
    }
];

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');
const cartCount = document.getElementById('cart-count');
const productsGrid = document.querySelector('.products-grid');
const categoryFilter = document.getElementById('category-filter');
const sortBy = document.getElementById('sort-by');
const cartItemsContainer = document.querySelector('.cart-items');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');

// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Load products on products page
    if (productsGrid) {
        displayProducts(products);
    }
    
    // Load cart items on cart page
    if (cartItemsContainer) {
        displayCartItems();
        updateCartSummary();
    }
    
    // Load featured products on home page
    const featuredProductsGrid = document.querySelector('.featured-products .products-grid');
    if (featuredProductsGrid) {
        const featuredProducts = products.slice(0, 4);
        displayProducts(featuredProducts, featuredProductsGrid);
    }
});

// Mobile Menu Toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Filter and Sort Products
if (categoryFilter && sortBy) {
    categoryFilter.addEventListener('change', filterAndSortProducts);
    sortBy.addEventListener('change', filterAndSortProducts);
}

function filterAndSortProducts() {
    const category = categoryFilter.value;
    const sortOption = sortBy.value;
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // Sort products
    switch (sortOption) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Default sorting (by ID)
            filteredProducts.sort((a, b) => a.id - b.id);
    }
    
    displayProducts(filteredProducts);
}

// Display Products
function displayProducts(productsToDisplay, gridElement = productsGrid) {
    if (!gridElement) return;
    
    gridElement.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        
        gridElement.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Cart Functions
function addToCart(e) {
    const productId = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
    updateCartSummary();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (newQuantity < 1) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
            updateCartSummary();
        }
    }
}

function updateCartCount() {
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function displayCartItems() {
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-header">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <span class="remove-item" data-id="${item.id}">&times;</span>
                </div>
                <div class="cart-item-footer">
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            removeFromCart(productId);
        });
    });
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const item = cart.find(item => item.id === productId);
            if (item) {
                updateQuantity(productId, item.quantity - 1);
            }
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const item = cart.find(item => item.id === productId);
            if (item) {
                updateQuantity(productId, item.quantity + 1);
            }
        });
    });
}

function updateCartSummary() {
    if (!subtotalElement || !totalElement) return;
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 5.99;
    const total = subtotal + shipping;
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Checkout Button
if (document.getElementById('checkout-btn')) {
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        alert('Order placed successfully! Thank you for your purchase.');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
        updateCartSummary();
    });
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}