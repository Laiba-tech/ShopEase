document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { id: 1, name: "Smartphone", category: "Electronics", price: 29999, image: "images/smartphones.jpg", description: "A high-quality smartphone with latest features." },
    { id: 2, name: "Laptop", category: "Electronics", price: 79999, image: "images/laptop.jpg", description: "Powerful laptop for work and gaming." },
    { id: 3, name: "T-Shirt", category: "Clothing", price: 1999, image: "images/tshirt.jpg", description: "Comfortable cotton t-shirt." },
    { id: 4, name: "Jeans", category: "Clothing", price: 4999, image: "images/jeans.jpg", description: "Stylish denim jeans." },
    { id: 5, name: "Novel Book", category: "Books", price: 599, image: "images/novel.jpg", description: "Engaging novel to read." },
    { id: 6, name: "Cookbook", category: "Books", price: 1299, image: "images/cookbook.jpg", description: "Delicious recipes for home cooking." },
    { id: 7, name: "Blender", category: "Home & Kitchen", price: 3499, image: "images/blender.jpg", description: "Efficient blender for smoothies and more." },
    { id: 8, name: "Toy Car", category: "Toys & Games", price: 799, image: "images/toy.jpg", description: "Fun toy car for kids." },
  ];

  const productDetailsContainer = document.getElementById('product-details');
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));

  if (!productId) {
    productDetailsContainer.innerHTML = '<p class="text-red-600">Invalid product ID.</p>';
    return;
  }

  const product = products.find(p => p.id === productId);

  if (!product) {
    productDetailsContainer.innerHTML = '<p class="text-red-600">Product not found.</p>';
    return;
  }

  // Load reviews from localStorage
  let reviews = JSON.parse(localStorage.getItem('reviews') || '{}');
  if (!reviews[productId]) {
    reviews[productId] = [];
  }

  function renderReviews() {
    const reviewsContainer = document.getElementById('reviews-list');
    if (!reviewsContainer) return;
    reviewsContainer.innerHTML = '';
    const approvedReviews = reviews[productId].filter(r => r.approved);
    if (approvedReviews.length === 0) {
      reviewsContainer.innerHTML = '<p class="text-gray-600">No reviews yet.</p>';
      return;
    }
    approvedReviews.forEach(r => {
      const reviewDiv = document.createElement('div');
      reviewDiv.className = 'mb-4 border-b border-gray-300 pb-2';
      reviewDiv.innerHTML = `
        <p class="font-semibold">${r.name} - <span class="text-yellow-500">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span></p>
        <p>${r.text}</p>
      `;
      reviewsContainer.appendChild(reviewDiv);
    });
  }

  productDetailsContainer.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="w-full md:w-1/3 rounded" />
    <div class="flex-1">
      <h2 class="text-3xl font-bold mb-4">${product.name}</h2>
      <p class="text-gray-700 mb-4">${product.description || 'No description available.'}</p>
      <p class="text-xl font-semibold mb-4">Price: Rs. ${product.price.toFixed(2)}</p>
      <div class="mb-4">
        <label for="quantity" class="block mb-1 font-semibold">Quantity:</label>
        <input type="number" id="quantity" name="quantity" value="1" min="1" class="w-20 p-2 border border-gray-300 rounded" />
      </div>
      <button id="add-to-cart-button" class="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 mb-4">Add to Cart</button>
      <a href="index.html" class="inline-block bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400">Back to Shop</a>
      <div class="mt-6">
        <h3 class="text-2xl font-semibold mb-2">Reviews</h3>
        <div id="reviews-list" class="mb-4"></div>
        <form id="review-form" class="space-y-4 max-w-lg">
          <div>
            <label for="reviewer-name" class="block font-semibold mb-1">Name</label>
            <input type="text" id="reviewer-name" name="reviewer-name" required class="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label for="review-rating" class="block font-semibold mb-1">Rating</label>
            <select id="review-rating" name="review-rating" required class="w-full p-2 border border-gray-300 rounded">
              <option value="" disabled selected>Select rating</option>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
          </div>
          <div>
            <label for="review-text" class="block font-semibold mb-1">Review</label>
            <textarea id="review-text" name="review-text" rows="4" required class="w-full p-2 border border-gray-300 rounded"></textarea>
          </div>
          <button type="submit" class="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700">Submit Review</button>
        </form>
      </div>
    </div>
  `;

  const backButton = document.getElementById('back-button');
  if (backButton) {
    backButton.addEventListener('click', () => {
      window.history.back();
    });
  }

  // Add to Cart button functionality with localStorage persistence
  const addToCartButton = document.getElementById('add-to-cart-button');
  addToCartButton.addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItemIndex = cart.findIndex(item => item.product.id === product.id);
    if (cartItemIndex !== -1) {
      cart[cartItemIndex].quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  });

  // Review form submission with moderation (default unapproved)
  const reviewForm = document.getElementById('review-form');
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reviewer-name').value.trim();
    const rating = parseInt(document.getElementById('review-rating').value);
    const text = document.getElementById('review-text').value.trim();
    if (!name || !rating || !text) {
      alert('Please fill all review fields.');
      return;
    }
    const newReview = { name, rating, text, approved: false, date: new Date().toISOString() };
    reviews[productId].push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    alert('Thank you for your review! It will be visible once approved.');
    reviewForm.reset();
    renderReviews();
  });

  renderReviews();
});
