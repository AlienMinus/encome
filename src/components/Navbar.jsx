import favicon from "../assets/favicon.png";
import "../App.css";
import { FaShoppingCart, FaUser, FaSearchengin, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaClipboardList } from "react-icons/fa";
import { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export default function Navbar({ search, setSearch }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const navbarCollapseRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarCollapseRef.current && !navbarCollapseRef.current.contains(event.target)) {
        const bsCollapse = window.bootstrap.Collapse.getInstance(navbarCollapseRef.current);
        if (bsCollapse && bsCollapse._isShown) {
          bsCollapse.hide();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            {isSearchVisible && (
                <form
                  className="d-flex search-form"
                  role="search"
                  onSubmit={handleSearch}
                >
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
              )}
            <div className="icon-container">
              
              <a className="nav-link text-hover-effect" onClick={toggleSearch}>
                <FaSearchengin size={20} />
              </a>
              
              <Link
                to="/cart"
                className="nav-link cart-icon-container text-hover-effect"
              >
                <FaShoppingCart size={20} />
                <span className="badge bg-danger">{cartItems.length}</span>
              </Link>
              {isLoggedIn ? (
                <div className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-hover-effect"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUser size={20} />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <FaUser size={18} className="me-2" /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/order-history">
                        <FaClipboardList size={18} className="me-2" /> Order History
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <a className="dropdown-item" onClick={handleLogout}>
                        <FaSignOutAlt size={18} className="me-2" /> Logout
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <a className="nav-link text-hover-effect" data-bs-toggle="modal" data-bs-target="#loginModal">
                    <FaSignInAlt size={20} className="me-1" /> Login
                  </a>
                  {/* <a className="nav-link text-hover-effect" data-bs-toggle="modal" data-bs-target="#registrationModal">
                    <FaUserPlus size={20} className="me-1" /> Register
                  </a> */}
                </>
              )}
            </div>
          </div>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
            ref={navbarCollapseRef}
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
                <Link className="nav-link " to="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
