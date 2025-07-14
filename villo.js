
let cart = [];

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    const itemCountContainer = document.getElementById('item-count');
    cartItemsContainer.innerHTML = ''; // Clear the cart list before updating
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - N$${item.price}`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => {
            removeFromCart(index);
        };

        listItem.appendChild(removeButton);
        cartItemsContainer.appendChild(listItem);

        totalPrice += item.price;
    });

    totalPriceContainer.textContent = totalPrice.toFixed(2);
    itemCountContainer.textContent = cart.length; // Update item count
}

function addToCart(name, price, image) {
    cart.push({ name, price, image });
    updateCartDisplay();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function toggleCartDisplay() {
    const cartContent = document.getElementById('cart-content');
    const toggleButton = document.getElementById('toggle-cart');

    
    if (cartContent.style.display === 'none') {
        cartContent.style.display = 'block';  
        toggleButton.textContent = 'Hide Cart';
    } else {
        cartContent.style.display = 'none';  
        toggleButton.textContent = 'View Cart';  
    }
}

document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        addToCart(name, price);
    });
});

document.getElementById('toggle-cart').addEventListener('click', toggleCartDisplay);

document.getElementById('checkout').addEventListener('click', function() {
    if (cart.length > 0) {
        alert('Proceeding to checkout with items: ' + JSON.stringify(cart));
    } else {
        alert('Your cart is empty!');
    }
});

function openModal(serviceName) {
    document.getElementById('service').value = serviceName; // Set the service name in the form
    document.getElementById('quotationModal').style.display = "block"; // Show the modal
}

// Function to close the modal
function closeModal() {
    document.getElementById('quotationModal').style.display = "none";
}
// Handle form submission
document.getElementById('quotationForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    alert('Quotation request submitted successfully!\n\n' +
          'Name: ' + document.getElementById('name').value + '\n' +
          'Email: ' + document.getElementById('email').value + '\n' +
          'Service: ' + document.getElementById('service').value + '\n' +
          'Details: ' + document.getElementById('details').value);
    closeModal(); 
});
