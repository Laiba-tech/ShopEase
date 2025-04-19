# Amazon Clone Prototype - ShopEase

This is a simple e-commerce web application prototype named **ShopEase**, designed to demonstrate core e-commerce functionalities including product browsing, search, filtering, user authentication, cart and wishlist management, order history, and product reviews with moderation.

## Features

- Browse products by category and search by name.
- Filter and sort products by price and popularity.
- User login and logout functionality.
- Add products to cart and wishlist with localStorage persistence.
- View order history and track orders.
- Product detail pages with image, description, price, and quantity selection.
- Submit product reviews with star ratings and moderation (reviews require approval before display).
- Responsive design using Tailwind CSS.
- Mock checkout form with shipping and payment details (no real payment integration).
- Additional pages: Profile, Contact, Help Centre.

## Technologies Used

- HTML5, CSS3 (Tailwind CSS)
- JavaScript (ES6+)
- LocalStorage for data persistence
- No backend or database (prototype only)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Open the `amazon-clone-prototype` folder in your preferred code editor.

3. Open `index.html` in a modern web browser to start using the application.

## Project Structure

- `index.html` - Main shopping page with product listings and filters.
- `product.html` - Product detail page with reviews and add to cart.
- `login.html`, `register.html` - User authentication pages.
- `profile.html`, `contact.html`, `help.html` - Additional informational pages.
- `script.js`, `product.js`, `login.js`, `register.js` - JavaScript files handling UI logic and data.
- `images/` - Product images.
- `README.md` - Project documentation.

## Notes

- Reviews are stored in localStorage and require manual approval (default is unapproved).
- Checkout process is a mockup and does not process real payments.
- This is a prototype for demonstration and learning purposes only.

## Future Enhancements

- Integrate real backend and database for user authentication, product management, and order processing.
- Implement real payment gateway integration.
- Add admin dashboard for managing products, orders, and reviews.
- Improve UI/UX and mobile responsiveness.
- Add user profile editing and order tracking features.

## License

This project is open source and available under the MIT License.

---

Thank you for exploring ShopEase! Feel free to contribute or customize it further.
