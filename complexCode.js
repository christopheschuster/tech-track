/**
 * Filename: complexCode.js
 * 
 * Description:
 * This code demonstrates a complex and elaborate JavaScript program that implements a virtual bookstore.
 * It includes features like sign-up, login, book catalog, shopping cart, and order tracking.
 * This is a simplified version of a real-world application and showcases best practices in coding and design.
 * 
 * Author: Your Name
 * Date: Current Date
 */

// -----------------------------------------------------------------------------------------------
// Constants

const BOOK_CATEGORIES = ["Fiction", "Non-fiction", "Science", "Mystery"];
const SHIPPING_OPTIONS = ["Standard", "Express", "International"];

// -----------------------------------------------------------------------------------------------
// Helper Functions

function generateUniqueID() {
  // Generates a unique ID based on timestamp and a random number
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function formatPrice(price) {
  // Formats a price value with currency symbol and decimal places
  return "$" + price.toFixed(2);
}

function calculateTotalPrice(items) {
  // Calculates the total price of items in the cart
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
}

// -----------------------------------------------------------------------------------------------
// Book Class

class Book {
  constructor(title, author, category, price) {
    this.id = generateUniqueID();
    this.title = title;
    this.author = author;
    this.category = category;
    this.price = price;
  }

  displayDetails() {
    console.log(`Title: ${this.title}`);
    console.log(`Author: ${this.author}`);
    console.log(`Category: ${this.category}`);
    console.log(`Price: ${formatPrice(this.price)}`);
    console.log("---------------");
  }
}

// -----------------------------------------------------------------------------------------------
// User Class

class User {
  constructor(name, email, password) {
    this.id = generateUniqueID();
    this.name = name;
    this.email = email;
    this.password = password;
    this.isLoggedIn = false;
    this.cart = [];
    this.orders = [];
  }

  login() {
    // Perform login validation, set isLoggedIn flag to true
    this.isLoggedIn = true;
    console.log(`Logged in as ${this.name}`);
  }

  logout() {
    // Set isLoggedIn flag to false
    this.isLoggedIn = false;
    console.log(`Logged out`);
  }

  addToCart(book, quantity = 1) {
    // Add a book to the user's shopping cart
    const existingItem = this.cart.find((item) => item.book.id === book.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ book, quantity });
    }

    console.log(`Added ${quantity} copy/copies of "${book.title}" to your cart`);
  }

  removeFromCart(book, quantity = 1) {
    // Remove a specific quantity of a book from the user's shopping cart
    const existingItemIndex = this.cart.findIndex(
      (item) => item.book.id === book.id
    );

    if (existingItemIndex !== -1) {
      const existingItem = this.cart[existingItemIndex];
      const remainingQuantity = existingItem.quantity - quantity;

      if (remainingQuantity <= 0) {
        this.cart.splice(existingItemIndex, 1);
      } else {
        existingItem.quantity = remainingQuantity;
      }

      console.log(`Removed ${quantity} copy/copies of "${book.title}" from your cart`);
    } else {
      console.log(`No "${book.title}" found in your cart`);
    }
  }

  clearCart() {
    // Clear the shopping cart
    this.cart = [];
    console.log(`Cleared your shopping cart`);
  }

  placeOrder(shippingOption = "Standard") {
    // Place an order with the books in the cart
    const totalPrice = calculateTotalPrice(this.cart);
    const newOrder = {
      id: generateUniqueID(),
      items: [...this.cart],
      total: totalPrice,
      shipping: shippingOption,
    };

    this.orders.push(newOrder);
    this.clearCart();

    console.log(`Order placed successfully! Order ID: ${newOrder.id}`);
    console.log(`Total amount: ${formatPrice(totalPrice)}`);
    console.log(`Shipping option: ${shippingOption}`);
  }

  displayOrders() {
    // Display all past orders made by the user
    console.log(`Total Orders: ${this.orders.length}`);
    console.log("---------------");
    for (const order of this.orders) {
      console.log(`Order ID: ${order.id}`);
      console.log(`Total: ${formatPrice(order.total)}`);
      console.log(`Shipping: ${order.shipping}`);
      console.log("Items: ");
      for (const item of order.items) {
        console.log(`${item.book.title} x${item.quantity}`);
      }
      console.log("---------------");
    }
  }
}

// -----------------------------------------------------------------------------------------------
// Usage Example

// Create books
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "Fiction", 10.99);
const book2 = new Book("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", "Science", 15.99);

// Create users
const user1 = new User("John Doe", "johndoe@example.com", "password1");
const user2 = new User("Jane Smith", "janesmith@example.com", "password2");

// Demonstrate user actions
user1.login();
user1.addToCart(book1);
user1.addToCart(book2, 3);
user1.placeOrder("Express");

user1.addToCart(book2);
user1.removeFromCart(book1);
user1.placeOrder("Standard");

user1.logout();
user1.displayOrders();

// -----------------------------------------------------------------------------------------------