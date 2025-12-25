import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Home from "./pages/Home.jsx";
import Categories from "./pages/Categories.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderReceipt from "./pages/OrderReceipt.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import { useAuth } from "./context/AuthContext";
import Profile from "./pages/Profile.jsx";


import Registration from "./components/Registration.jsx";
import Login from "./components/Login.jsx";
import PasswordReset from "./components/PasswordReset.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import AdminContacts from "./pages/admin/AdminContacts.jsx";
import AuthInterceptor from "./components/AuthInterceptor.jsx"; // Import AuthInterceptor

// AdminProtectedRoute component for admin access
const AdminProtectedRoute = ({ children }) => {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn || !user || user.role !== 'admin') {
    // Redirect to home or an unauthorized page
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [search, setSearch] = useState("");
  const { isLoggedIn } = useAuth(); // isLoggedIn is still used by Navbar or other components if needed

  return (
    <Router>
      <AuthInterceptor /> {/* Render AuthInterceptor here */}
      <Registration />
      <Login />
      <PasswordReset />
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route
          path="/products"
          element={<Products search={search} setSearch={setSearch} />}
        />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-receipt/:orderId" element={<OrderReceipt />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order-history" element={<OrderHistory />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminProtectedRoute>
              <AdminProducts />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminProtectedRoute>
              <AdminOrders />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <AdminProtectedRoute>
              <AdminContacts />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
