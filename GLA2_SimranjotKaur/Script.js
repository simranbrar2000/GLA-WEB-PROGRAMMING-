const apiUrl = 'https://fakestoreapi.com/products';
const productsList = document.getElementById('products-list');
const sortAscButton = document.getElementById('sort-asc');
const sortDescButton = document.getElementById('sort-desc');
const categoryFilter = document.getElementById('category-filter');

let products = [];

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        products = data;
        renderProducts(products);
    });

sortAscButton.addEventListener('click', () => {
    products.sort((a, b) => a.price - b.price);
    renderProducts(products);
});

sortDescButton.addEventListener('click', () => {
    products.sort((a, b) => b.price - a.price);
    renderProducts(products);
});

categoryFilter.addEventListener('change', () => {
    const selectedCategory = categoryFilter.value;
    let filteredProducts = products;

    if (selectedCategory !== '') {
        filteredProducts = products.filter(product => product.category === selectedCategory);
    }

    renderProducts(filteredProducts);
});

function renderProducts(products) {
    productsList.innerHTML = '';

    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.classList.add('product-item');

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.title;

        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');

        const productTitle = document.createElement('h3');
        productTitle.textContent = product.title;

        const productPrice = document.createElement('p');
        productPrice.textContent = `$${product.price}`;

        productInfo.appendChild(productTitle);
        productInfo.appendChild(productPrice);

        listItem.appendChild(productImage);
        listItem.appendChild(productInfo);

        productsList.appendChild(listItem);
    });
}