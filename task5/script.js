const products = {
    clothing: [
        {name: "Men's Shirt", desc: "Cotton shirt", price: 999, rating: 4, image: "cloth1.webp"},
        {name: "Women's Dress", desc: "Evening dress", price: 1499, rating: 5, image: "cloth2.webp"},
        {name: "Kids' Jacket", desc: "Winter jacket", price: 1299, rating: 3, image: "cloth3.webp"},
    ],
    electronics: [
        {name: "Smartphone", desc: "Latest model", price: 49999, rating: 5, image: "electronic1.jpg"},
        {name: "Laptop", desc: "Gaming laptop", price: 75999, rating: 4, image: "electronic2.jpg"},
        {name: "Headphones", desc: "Noise-cancelling", price: 9999, rating: 4, image: "electronic3.webp"},
    ],
    food: [
        {name: "Honey", desc: "Organic honey", price: 299, rating: 5, image: "food1.avif"},
        {name: "Almonds", desc: "Fresh almonds", price: 799, rating: 4, image: "food2.jpg"},
        {name: "Green Tea", desc: "Refreshing tea", price: 199, rating: 3, image: "food3.jpg"},
    ],
    house: [
        {name: "Vacuum Cleaner", desc: "Powerful cleaning", price: 5999, rating: 5, image: "vc1.jpg"},
        {name: "Air Purifier", desc: "Clean air", price: 8999, rating: 4, image: "vc2.jpg"},
        {name: "Dishwasher", desc: "Automatic washing", price: 35999, rating: 5, image: "vc3.jpg"},
    ]
};

let cart = [];

function renderProducts(category) {
    const container = document.getElementById(category + 'Products');
    container.innerHTML = '';
    products[category].forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
            <p>Rs ${product.price}</p>
            <p>${'⭐'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</p>
            <button onclick="addToCart('${category}', ${index})">Add to Cart</button>
        `;
        container.appendChild(card);
    });
}

function addToCart(category, index) {
    cart.push(products[category][index]);
    document.getElementById('cartCount').textContent = cart.length;
}

document.getElementById('cartBtn').onclick = () => {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = cart.map((item, index) => `
    <li>
        ${item.name} - Rs ${item.price}
        <button onclick="removeFromCart(${index})">Remove</button>
    </li>
`).join('');

    document.getElementById('cartModal').classList.remove('hidden');
};
function removeFromCart(index) {
    cart.splice(index, 1);
    document.getElementById('cartCount').textContent = cart.length;
    document.getElementById('cartItems').innerHTML = cart.map((item, i) => `
        <li>
            ${item.name} - Rs ${item.price}
            <button onclick="removeFromCart(${i})">Remove</button>
        </li>
    `).join('');
}

document.getElementById('profileBtn').onclick = () => {
    document.getElementById('profileModal').classList.remove('hidden');
};

function closeCart() {
    document.getElementById('cartModal').classList.add('hidden');
}

function closeProfile() {
    document.getElementById('profileModal').classList.add('hidden');
}

document.getElementById('searchInput').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = productName.includes(query) ? 'block' : 'none';
    });
});

function sortProducts(category, order) {
    if (order === 'low') {
        products[category].sort((a, b) => a.price - b.price);
    } else if (order === 'high') {
        products[category].sort((a, b) => b.price - a.price);
    }
    renderProducts(category);
}

for (const category in products) {
    renderProducts(category);
}