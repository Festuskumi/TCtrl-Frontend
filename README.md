# TCTRL Fashion E-Commerce Frontend


---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Configuration](#-environment-configuration)
- [Available Scripts](#-available-scripts)
- [Component Documentation](#-component-documentation)
- [State Management](#-state-management)
- [Styling Guide](#-styling-guide)
- [Deployment](#-deployment)
- [Contact](#-contact)

---

## 🚀 Overview

TCTRL Fashion E-Commerce Frontend is a modern, responsive web application built with React and Vite. It provides an intuitive shopping experience with features like product browsing, cart management, user authentication, wishlist functionality, and secure checkout with multiple payment options.

The application is designed with performance, accessibility, and user experience in mind, making it suitable for a production e-commerce environment.

---

## ✨ Features

### User Experience
- Responsive design for all devices
- Fast page loading with optimized assets
- Intuitive navigation with navbar and search functionality
- Product filtering and sorting options
- Wishlist for saving favorite items

### Shopping Experience
- Product catalog with detailed product pages
- Shopping cart with real-time updates
- Secure checkout process
- Multiple payment options (Stripe, PayPal)
- Order tracking and history

### User Management
- User registration and login
- Profile management
- Password reset functionality
- Email verification

### Additional Features
- Blog section
- Contact form
- About page
- Newsletter subscription
- Responsive footer with important links

---

## 📦 Tech Stack

### Core
- **React** - UI library
- **Vite** - Build tool and development server
- **React Router** - Client-side routing

### State Management
- **React Context API** - Global state management
- **useReducer** - Complex state logic

### Styling
- **CSS** - Custom styling
- **CSS Modules** - Component-scoped styles

### Development Tools
- **ESLint** - Code linting
- **Babel** - JavaScript compiler
- **SWC** - Fast refresh and compilation

### Integrations
- **Stripe** - Payment processing
- **PayPal** - Alternative payment method

### Assets
- **Custom Icons** - SVG icons for UI elements
- **Videos** - Product demonstrations

---

## 🏗️ Project Structure

```
tctrl-frontend/
├── public/              # Static files
├── src/                 # Source files
│   ├── assets/          # Images, videos, and static assets
│   │   ├── Logo.png
│   │   ├── bin_icon.png
│   │   ├── cart_icon.png
│   │   └── ... (other assets)
│   │
│   ├── components/      # Reusable React components
│   │   ├── CartTotalCost.jsx
│   │   ├── Footer.jsx
│   │   ├── Heading.jsx
│   │   ├── Myhero.jsx
│   │   ├── NavBar.jsx
│   │   ├── New_drops.jsx
│   │   ├── NewsMailingBox.jsx
│   │   ├── PersonalInfoForm.jsx
│   │   ├── Policy.jsx
│   │   ├── ProductItems.jsx
│   │   ├── SearchBar.jsx
│   │   ├── ShippingForm.jsx
│   │   ├── SimilarProducts.jsx
│   │   └── Trending.jsx
│   │
│   ├── Context/         # React Context providers
│   │   └── ContextShop.jsx
│   │
│   ├── Pages/           # Page components
│   │   ├── Blog.jsx
│   │   ├── CartPage.jsx
│   │   ├── Collections.jsx
│   │   ├── Contact.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Home.jsx
│   │   ├── LoginPage.jsx
│   │   ├── OrderPlace.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── Product.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── Verify.jsx
│   │   ├── VerifyCode.jsx
│   │   └── Wishlist.jsx
│   │
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles
│   ├── main.jsx         # Application entry point
│   └── .env             # Environment variables
│
├── .eslintrc.js         # ESLint configuration
├── .gitignore           # Git ignore file
├── index.html           # HTML entry point
├── package.json         # Project dependencies
├── package-lock.json    # Dependency lock file
├── README.md            # Project documentation
├── vite.config.js       # Vite configuration
└── vercel.json          # Vercel deployment configuration
```

---

## 🔧 Installation

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Backend API running (see [Backend Repository](https://github.com/festuskumi/tctrl-backend))

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/festuskumi/tctrl-frontend.git
   cd tctrl-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Configure environment variables**
   - Create a `.env` file in the root directory (see Environment Configuration section)

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at `http://localhost:5173`.

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# API URL
VITE_BACKEND_URL=http://localhost:4000

# Optional: Analytics
# VITE_ANALYTICS_ID=your_analytics_id

# Optional: Sentry for error tracking
# VITE_SENTRY_DSN=your_sentry_dsn
```

**Important Security Notes:**
- Never commit your `.env` file to version control
- Keep sensitive information in environment variables
- Different environments (development, staging, production) should have their own `.env` files

---

## 📜 Available Scripts

In the project directory, you can run:

### `npm run dev` or `yarn dev`
Runs the app in development mode with hot-reloading.

### `npm run build` or `yarn build`
Builds the app for production to the `dist` folder.

### `npm run preview` or `yarn preview`
Previews the production build locally.

### `npm run lint` or `yarn lint`
Runs ESLint to check for code quality issues.

### `npm run lint:fix` or `yarn lint:fix`
Automatically fixes ESLint issues when possible.

---

## 🧩 Component Documentation

### Core Components

#### `NavBar.jsx`
The main navigation component with links to all major sections of the application.

#### `Footer.jsx`
Footer component with links to important pages, social media, and newsletter signup.

#### `Myhero.jsx`
Hero section component used on the home page for featured content.

#### `ProductItems.jsx`
Reusable component for displaying product cards in various listings.

### Page Components

#### `Home.jsx`
Landing page with hero section, featured products, new arrivals, and promotions.

#### `Product.jsx`
Detailed product page with images, description, pricing, size selection, and add to cart functionality.

#### `CartPage.jsx`
Shopping cart page displaying added items with quantity adjustment and checkout options.

#### `OrderPlace.jsx`
Checkout page with shipping information, payment options, and order summary.

### Form Components

#### `LoginPage.jsx` & `ForgotPassword.jsx`
User authentication forms with validation.

#### `ShippingForm.jsx` & `PersonalInfoForm.jsx`
Checkout forms for collecting user and shipping information.

---

## 🔄 State Management

The application uses React Context API for global state management:

### `ContextShop.jsx`
The main context provider that handles:

- User authentication state
- Shopping cart state and operations
- Wishlist management
- Product filtering and sorting
- Order processing

Example usage:

```jsx
import { useContext } from 'react';
import { ShopContext } from '../Context/ContextShop';

function MyComponent() {
  const { cart, addToCart, removeFromCart } = useContext(ShopContext);
  
  // Component logic using the context
}
```

---

## 🎨 Styling Guide

The application uses a combination of global styles and component-specific CSS:

### Global Styles
- `index.css` contains global styles, variables, and resets

### Component Styles
- Each component has its own scoped styles
- Consistent color scheme and typography throughout the application

### Design Principles
- Mobile-first responsive design
- Accessible UI elements with proper contrast
- Consistent spacing and alignment
- Smooth transitions and animations for interactive elements

---

## 🚢 Deployment

### Vercel Deployment

The project includes a `vercel.json` configuration file for easy deployment to Vercel:

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

### Other Deployment Options

#### Netlify
1. Build your application:
   ```bash
   npm run build
   ```

2. Deploy using Netlify CLI or connect your GitHub repository on the Netlify dashboard.

#### GitHub Pages
1. Adjust `vite.config.js` to include your base path:
   ```javascript
   export default {
     base: '/your-repo-name/'
   }
   ```

2. Build and deploy using GitHub Actions or manually.

---

## 📞 Contact

**Project Lead**: Festus Kumi  
**Email**: festuskumi8@gmail.com  
**GitHub**: [@festuskumi](https://github.com/festuskumi)

For bug reports, feature requests, or general inquiries, please create an issue in the GitHub repository.

---

<div align="center">
  <sub>Built with ❤️ BY Festus Kumi</sub>
</div>