# Encome - Modern E-Commerce Platform

Encome is a comprehensive, full-stack e-commerce solution designed to provide a high-performance shopping experience. Built on the proven MERN stack (MongoDB, Express, React, Node.js), Encome bridges the gap between sophisticated user-facing storefronts and powerful administrative back-office management.

## 🚀 Detailed Features

### For the End User (Customer Experience)

- **Secure Authentication Suite:** Beyond simple login, the system utilizes JSON Web Tokens (JWT) for stateless sessions. Features include account registration with encrypted password storage, login persistence, and a dedicated password reset workflow.

- **Intuitive Product Discovery:**

  - **Dynamic Filtering:** Browse products filtered by category or search via a responsive search bar.

  - **Rich Product Views:** Detailed pages showcasing high-quality images, descriptions, pricing, and availability.

- **Advanced Shopping Cart:** A persistent cart implementation using React Context API. Users can modify quantities, remove items, and see real-time price calculations before proceeding to checkout.

- **Streamlined Checkout & Receipts:** A multi-step checkout process that culminates in a generated order receipt. The system captures shipping details and validates order summaries.

- **User Central:** A personalized dashboard where users can update their profile information, change passwords, and view a comprehensive history of past orders with their current fulfillment status.

- **Social Proof & Engagement:** Integrated star-rating and review system allowing customers to share feedback, which in turn influences the "Recommended Products" algorithm.

- **PWA (Progressive Web App):** Optimized with a service worker and manifest file, allowing users to "install" Encome on their mobile devices for an app-like experience without the App Store.

### For Administrators (Business Management)

- **Analytical Dashboard:** A centralized hub providing a birds-eye view of total sales, recent orders, and inventory health.

- **Full CRUD Inventory Control:** Add new product lines, update existing descriptions/prices, and manage stock levels through a protected interface.

- **Category Architecture:** Dynamically organize the store's taxonomy to improve SEO and user navigation.

- **Order Fulfillment Pipeline:** Track orders from "Pending" to "Delivered," ensuring transparency in the supply chain.

- **Customer Relationship Management (CRM):** An admin-only contact portal to review customer inquiries submitted through the site's contact forms, facilitating efficient customer support.

## 🛠 Technical Architecture & Stack

### Frontend Architecture

- **Framework:** React.js scaffolded with Vite for lightning-fast development and optimized production builds.

- **State Management:** Utilizes the React Context API across three primary providers:

  - `AuthContext`: Handles user session state and permissions.

  - `CartContext`: Manages the global shopping basket state.

  - `LoadingContext`: Orchestrates global UI loading states for better UX.

- **Styling:** Modern, responsive CSS3 utilizing flexbox and grid systems to ensure compatibility across desktop, tablet, and mobile browsers.

- **Networking:** Axios with custom interceptors that automatically attach JWT headers to outgoing requests and handle 401 Unauthorized responses gracefully.

### Backend & Database

- **Runtime:** Node.js with the Express.js framework providing a RESTful API layer.

- **Data Modeling:** Mongoose ODM for MongoDB, enforcing schema validation for:

  - `User`: Handles credentials, roles (User/Admin), and profile data.

  - `Product`: Stores catalog details, pricing, and category links.

  - `Order`: Links users to products with status tracking.

  - `Review`: Captures user feedback and numerical ratings.

  - `Category`: Manages the store's structural hierarchy.

  - `Contact`: Logs incoming support tickets.

- **Security:** Implementation of Bcrypt.js for one-way password hashing and JWT for secure, scalable authentication.

## 📂 Project Structure Explained

```
├── public/                # Static assets, PWA manifest, and Service Worker logic
├── server/                # The Backend Engine
│   ├── middleware/        # authMiddleware (JWT validation) & adminMiddleware (Role checking)
│   ├── models/            # Mongoose schemas defining our data shapes
│   ├── routes/            # API endpoints grouped by feature (Auth, Products, Orders)
│   └── server.js          # Main entry point; initializes DB connection and Express app
├── src/                   # The Frontend Application
│   ├── assets/            # Global images and brand icons
│   ├── components/        # Atomic UI pieces (Navbar, ProductCards, Spinners)
│   ├── context/           # Logic for global state management
│   ├── pages/             # Route components for different views
│   └── main.jsx           # React DOM mounting and Router initialization
└── vite.config.js         # Configuration for Vite, including build alias and proxy settings
```

## ⚙️ Detailed Setup & Installation

### 1. Prerequisite Checklist

- **Node.js:** Recommended version 18.x or higher.

- **MongoDB:** A local instance or a MongoDB Atlas cloud cluster.

- **Environment Knowledge:** Familiarity with `.env` files and shell commands.

### 2. Backend Initialization

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Configure your environment variables in a `.env` file:

- `PORT`: The port your server will run on (e.g., 5000).

- `MONGO_URI`: Your MongoDB connection string (crucial for data persistence).

- `JWT_SECRET`: A long, random string used to sign your security tokens.

Launch the backend:

```bash
npm start
```

### 3. Frontend Initialization

Return to the root directory and set up the React client:

```bash
cd ..
npm install
npm run dev
```

The application will typically be available at `http://localhost:5173`.

## 🛡 Security Implementations

- **Stateless Auth:** JWT prevents the need for server-side sessions, allowing for better horizontal scaling.

- **Role-Based Access Control (RBAC):** Specific API routes (like product creation or order management) are strictly guarded. Only users with the `isAdmin` flag in their JWT can access these endpoints.

- **Sensitive Data Protection:** All API keys and secrets are managed via environment variables and are excluded from version control via `.gitignore`.

## 🚀 Deployment & Scaling

The project is pre-configured for Vercel deployment via the `vercel.json` file. For production scaling:

- **Database:** Use MongoDB Atlas for automated backups and scaling.

- **Images:** For a production environment, it is recommended to integrate a cloud storage provider (like Cloudinary or AWS S3) for product images.

## 📄 License & Attribution

This project is open-source under the MIT License. Created and maintained with ❤️ by Alienminus.