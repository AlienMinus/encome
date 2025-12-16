import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Home from "./pages/Home.jsx";
import Categories from "./pages/Categories.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Checkout from "./pages/Checkout.jsx"; // Import Checkout component
import OrderReceipt from "./pages/OrderReceipt.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import { useAuth } from "./context/AuthContext";

import Registration from "./components/Registration.jsx";
import Login from "./components/Login.jsx";

function App() {
  const [search, setSearch] = useState("");
  const { isLoggedIn, logout } = useAuth();

  return (
    <Router>
      <Registration />
      <Login />
      {isLoggedIn ? (
        <>
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
            <Route path="/order-receipt" element={<OrderReceipt />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </>
      ) : (
        <>
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
            <Route path="/order-receipt" element={<OrderReceipt />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
