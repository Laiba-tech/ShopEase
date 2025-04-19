document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { id: 1, name: "Smartphone", category: "Electronics", price: 29999, image: "images/smartphones.jpg" },
    { id: 2, name: "Laptop", category: "Electronics", price: 79999, image: "images/laptop.jpg" },
    { id: 3, name: "T-Shirt", category: "Clothing", price: 1999, image: "images/tshirt.jpg" },
    { id: 4, name: "Jeans", category: "Clothing", price: 4999, image: "images/jeans.jpg" },
    { id: 5, name: "Novel Book", category: "Books", price: 599, image: "images/novel.jpg" },
    { id: 6, name: "Cookbook", category: "Books", price: 1299, image: "images/cookbook.jpg" },
    { id: 7, name: "Blender", category: "Home & Kitchen", price: 3499, image: "images/blender.jpg" },
    { id: 8, name: "Toy Car", category: "Toys & Games", price: 799, image: "images/toy.jpg" },
  ];

  // User session management
  const loginLink = document.getElementById('login-link');
  const logoutButton = document.getElementById('logout-button');
  const userGreeting = document.getElementById('user-greeting');

  function updateUserUI() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser && loggedInUser.email) {
      loginLink.classList.add('hidden');
      logoutButton.classList.remove('hidden');
      userGreeting.textContent = `Hello, ${loggedInUser.email}`;
      userGreeting.classList.remove('hidden');
    } else {
      loginLink.classList.remove('hidden');
      logoutButton.classList.add('hidden');
      userGreeting.classList.add('hidden');
      userGreeting.textContent = '';
    }
  }

  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    updateUserUI();
    alert('You have been logged out.');
  });

  updateUserUI();

  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  let orders = [];

  const productGrid = document.getElementById("product-grid");
  if (!productGrid) console.error("Element not found: product-grid");
  const cartButton = document.getElementById("cart-button");
  if (!cartButton) console.error("Element not found: cart-button");
  const cartModal = document.getElementById("cart-modal");
  if (!cartModal) console.error("Element not found: cart-modal");
  const closeCartButton = document.getElementById("close-cart");
  if (!closeCartButton) console.error("Element not found: close-cart");
  const cartItemsContainer = document.getElementById("cart-items");
  if (!cartItemsContainer) console.error("Element not found: cart-items");
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) console.error("Element not found: cart-count");
  const cartTotal = document.getElementById("cart-total");
  if (!cartTotal) console.error("Element not found: cart-total");
  const checkoutButton = document.getElementById("checkout");
  if (!checkoutButton) console.error("Element not found: checkout");
  const checkoutForm = document.getElementById("checkout-form");
  if (!checkoutForm) console.error("Element not found: checkout-form");
  const cancelCheckoutButton = document.getElementById("cancel-checkout");
  if (!cancelCheckoutButton) console.error("Element not found: cancel-checkout");
  const searchInput = document.getElementById("search-input");
  if (!searchInput) console.error("Element not found: search-input");
  const departmentItems = document.querySelectorAll("aside ul li");
  if (!departmentItems || departmentItems.length === 0) console.error("Element not found: departmentItems");
  const sortSelect = document.getElementById("sort-select");
  if (!sortSelect) console.error("Element not found: sort-select");

  const wishlistButton = document.getElementById("wishlist-button");
  if (!wishlistButton) console.error("Element not found: wishlist-button");
  const wishlistModal = document.getElementById("wishlist-modal");
  if (!wishlistModal) console.error("Element not found: wishlist-modal");
  const closeWishlistButton = document.getElementById("close-wishlist");
  if (!closeWishlistButton) console.error("Element not found: close-wishlist");
  const wishlistItemsContainer = document.getElementById("wishlist-items");
  if (!wishlistItemsContainer) console.error("Element not found: wishlist-items");
  const wishlistCount = document.getElementById("wishlist-count");
  if (!wishlistCount) console.error("Element not found: wishlist-count");
  const orderHistoryButton = document.getElementById("order-history-button");
  if (!orderHistoryButton) console.error("Element not found: order-history-button");

function renderProducts(filterCategory = null, searchTerm = "", sortBy = "default") {
  if (!productGrid) {
    console.error("Product grid element not found");
    return;
  }
  console.log("Rendering products with filterCategory:", filterCategory, "type:", typeof filterCategory, "searchTerm:", searchTerm, "sortBy:", sortBy);
  productGrid.innerHTML = "";
  let filteredProducts = products;

  if (filterCategory && filterCategory.trim() !== "") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === filterCategory
    );
  }

  console.log("Filtered products count:", filteredProducts.length);

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Sorting logic
  if (sortBy === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "popularity") {
    // Assuming popularity by product id descending (newer products more popular)
    filteredProducts.sort((a, b) => b.id - a.id);
  }

  if (filteredProducts.length === 0) {
    productGrid.innerHTML =
      "<p class='col-span-full text-center text-gray-500'>No products found.</p>";
    return;
  }

  filteredProducts.forEach((product) => {
    console.log("Rendering product:", product.name);
    const productCard = document.createElement("div");
    productCard.className = "bg-white rounded shadow p-4 flex flex-col";
    const imageUrl = product.image || "https://via.placeholder.com/150";
    productCard.innerHTML = `
      <a href="product.html?id=${product.id}">
        <img src="${imageUrl}" alt="${product.name}" class="mb-4 rounded" />
        <h3 class="font-semibold text-lg text-blue-600 hover:underline">${product.name}</h3>
      </a>
      <p class="text-gray-600 mb-2">Rs. ${product.price.toFixed(2)}</p>
      <div class="mt-auto flex space-x-2">
        <button class="flex-1 bg-yellow-500 text-black py-2 rounded hover:bg-yellow-600 add-to-cart" data-id="${product.id}">
          Add to Cart
        </button>
        <button class="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 add-to-wishlist" data-id="${product.id}">
          Wishlist
        </button>
      </div>
    `;
    productGrid.appendChild(productCard);
  });

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"));
      addToCart(productId);
    });
  });

  document.querySelectorAll(".add-to-wishlist").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"));
      addToWishlist(productId);
    });
  });
}

  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const cartItem = cart.find((item) => item.product.id === productId);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
  }

  function removeFromCart(productId) {
    cart = cart.filter((item) => item.product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
  }

  function updateCartUI() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p class='text-gray-500'>Your cart is empty.</p>";
      cartTotal.textContent = "Rs. 0.00";
      return;
    }

    cart.forEach(({ product, quantity }) => {
      const cartItem = document.createElement("div");
      cartItem.className = "flex justify-between items-center mb-2";
      cartItem.innerHTML = `
        <div class="flex-1">
          <h4 class="font-semibold">${product.name}</h4>
          <p class="text-gray-600">Rs. ${product.price.toFixed(2)}</p>
        </div>
        <input type="number" min="1" value="${quantity}" class="w-16 p-1 border border-gray-300 rounded mr-2 quantity-input" data-id="${product.id}" />
        <button class="text-red-600 hover:text-red-800 remove-from-cart" data-id="${product.id}">&times;</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    // Add event listeners for quantity inputs
    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", () => {
        const productId = parseInt(input.getAttribute("data-id"));
        let newQuantity = parseInt(input.value);
        if (isNaN(newQuantity) || newQuantity < 1) {
          newQuantity = 1;
          input.value = 1;
        }
        const cartItem = cart.find((item) => item.product.id === productId);
        if (cartItem) {
          cartItem.quantity = newQuantity;
          updateCartUI();
        }
      });
    });

    document.querySelectorAll(".remove-from-cart").forEach((button) => {
      button.addEventListener("click", () => {
        const productId = parseInt(button.getAttribute("data-id"));
        removeFromCart(productId);
      });
    });

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    cartTotal.textContent = `Rs. ${total.toFixed(2)}`;
  }

  function addToWishlist(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    if (!wishlist.find((item) => item.id === productId)) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
    updateWishlistUI();
  }

  function removeFromWishlist(productId) {
    wishlist = wishlist.filter((item) => item.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
  }

  function updateWishlistUI() {
    wishlistCount.textContent = wishlist.length;
    wishlistItemsContainer.innerHTML = "";

    if (wishlist.length === 0) {
      wishlistItemsContainer.innerHTML = "<p class='text-gray-500'>Your wishlist is empty.</p>";
      return;
    }

    wishlist.forEach((product) => {
      const wishlistItem = document.createElement("div");
      wishlistItem.className = "flex justify-between items-center mb-2";
      wishlistItem.innerHTML = `
        <div>
          <h4 class="font-semibold">${product.name}</h4>
          <p class="text-gray-600">Rs. ${product.price.toFixed(2)}</p>
        </div>
        <button class="text-red-600 hover:text-red-800 remove-from-wishlist" data-id="${product.id}">&times;</button>
      `;
      wishlistItemsContainer.appendChild(wishlistItem);
    });

    document.querySelectorAll(".remove-from-wishlist").forEach((button) => {
      button.addEventListener("click", () => {
        const productId = parseInt(button.getAttribute("data-id"));
        removeFromWishlist(productId);
      });
    });
  }

  cartButton.addEventListener("click", () => {
    cartModal.classList.toggle("hidden");
    cartModal.classList.toggle("flex");
  });

  closeCartButton.addEventListener("click", () => {
    cartModal.classList.add("hidden");
    cartModal.classList.remove("flex");
  });

  wishlistButton.addEventListener("click", () => {
    wishlistModal.classList.toggle("hidden");
    wishlistModal.classList.toggle("flex");
  });

  closeWishlistButton.addEventListener("click", () => {
    wishlistModal.classList.add("hidden");
    wishlistModal.classList.remove("flex");
  });

  checkoutButton.addEventListener("click", () => {
    cartItemsContainer.classList.add("hidden");
    checkoutButton.classList.add("hidden");
    checkoutForm.classList.remove("hidden");
  });

  cancelCheckoutButton.addEventListener("click", () => {
    checkoutForm.reset();
    checkoutForm.classList.add("hidden");
    cartItemsContainer.classList.remove("hidden");
    checkoutButton.classList.remove("hidden");
  });

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simple validation
    if (!checkoutForm.checkValidity()) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    // Simulate order processing
    alert("Order placed successfully! Thank you for your purchase.");

    // Save order details
    const order = {
      id: Date.now(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      date: new Date().toLocaleString(),
      status: "Processing",
    };
    orders.push(order);

    // Clear cart
    cart = [];
    updateCartUI();

    // Reset and hide form, show cart items and checkout button
    checkoutForm.reset();
    checkoutForm.classList.add("hidden");
    cartItemsContainer.classList.remove("hidden");
    checkoutButton.classList.remove("hidden");
  });

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim();
    renderProducts(null, searchTerm, sortSelect.value);
  });

  departmentItems.forEach((item) => {
    item.addEventListener("click", () => {
      const category = item.textContent.trim();
      if (category === "All") {
        renderProducts(null, "", sortSelect.value);
      } else {
        renderProducts(category, "", sortSelect.value);
      }
    });
  });

  sortSelect.addEventListener("change", () => {
    const selectedSort = sortSelect.value;
    renderProducts(null, searchInput.value.trim(), selectedSort);
  });

  orderHistoryButton.addEventListener("click", () => {
    openOrderHistory();
  });

  const orderHistoryModal = document.getElementById("order-history-modal");
  const closeOrderHistoryButton = document.getElementById("close-order-history");
  const orderHistoryList = document.getElementById("order-history-list");
  const orderTracking = document.getElementById("order-tracking");
  const trackingStatus = document.getElementById("tracking-status");
  const closeTrackingButton = document.getElementById("close-tracking");

  closeOrderHistoryButton.addEventListener("click", () => {
    orderHistoryModal.classList.add("hidden");
    orderTracking.classList.add("hidden");
    orderHistoryList.classList.remove("hidden");
  });

  closeTrackingButton.addEventListener("click", () => {
    orderTracking.classList.add("hidden");
    orderHistoryList.classList.remove("hidden");
  });

  function openOrderHistory() {
    orderHistoryList.innerHTML = "";
    if (orders.length === 0) {
      orderHistoryList.innerHTML = "<p class='text-gray-500'>No orders found.</p>";
    } else {
      orders.forEach((order) => {
        const orderDiv = document.createElement("div");
        orderDiv.className = "border border-yellow-400 rounded p-2 mb-2";
        orderDiv.innerHTML = `
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Date:</strong> ${order.date}</p>
          <p><strong>Total:</strong> Rs. ${order.total.toFixed(2)}</p>
          <button class="mt-2 bg-yellow-500 text-black py-1 px-3 rounded hover:bg-yellow-600 track-order" data-id="${order.id}">Track Order</button>
        `;
        orderHistoryList.appendChild(orderDiv);
      });

      document.querySelectorAll(".track-order").forEach((button) => {
        button.addEventListener("click", () => {
          const orderId = parseInt(button.getAttribute("data-id"));
          showTracking(orderId);
        });
      });
    }
    orderTracking.classList.add("hidden");
    orderHistoryList.classList.remove("hidden");
    orderHistoryModal.classList.remove("hidden");
  }

  function showTracking(orderId) {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    trackingStatus.textContent = `Order #${order.id} is currently: ${order.status}`;
    orderTracking.classList.remove("hidden");
    orderHistoryList.classList.add("hidden");
  }

  renderProducts();
});
