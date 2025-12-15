import favicon from "../assets/favicon.png";
import { FaShoppingCart, FaUser, FaSearchengin } from "react-icons/fa";
import "../App.css";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export default function Navbar({ search, setSearch }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/products");
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home or login page after logout
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="light"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to="/">
            <img
              src={favicon}
              alt="Logo"
              height="40"
              className="d-inline-block align-text-top"
            />
            <span className="title text-hover-effect"> ShineX </span>
          </Link>

          <div className="d-flex align-items-center">
            <div className="icon-container">
              <a className="nav-link text-hover-effect" onClick={toggleSearch}>
                <FaSearchengin size={20} />
              </a>
              {isSearchVisible && (
                <form
                  className="d-flex search-form"
                  role="search"
                  onSubmit={handleSearch}
                >
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button className="btn btn-outline-success" type="submit">
                    <FaSearchengin size={20} />
                  </button>
                </form>
              )}
              <Link
                to="/cart"
                className="nav-link cart-icon-container text-hover-effect"
              >
                <FaShoppingCart size={20} />
                <span className="badge bg-danger">{cartItems.length}</span>
              </Link>
              {isLoggedIn ? (
                <a className="nav-link text-hover-effect" onClick={handleLogout}>
                  <FaUser size={20} /> Logout
                </a>
              ) : (
                <a className="nav-link text-hover-effect" data-bs-toggle="modal" data-bs-target="#loginModal">
                  <FaUser size={20} /> Login
                </a>
              )}
            </div>
          </div>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active " aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/categories">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/contact">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
