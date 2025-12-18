import { Link } from "react-router-dom";
import '../App.css'; // Import the CSS file
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [carouselProducts, setCarouselProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        setCarouselProducts(products.sort(() => 0.5 - Math.random()).slice(0, 5));
        setFeaturedProducts(products.sort(() => 0.5 - Math.random()).slice(0, 4));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const categoriesData = await response.json();
        setCategories(categoriesData.sort(() => 0.5 - Math.random()).slice(0, 4));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);
  return (
    <>
      <div id="carouselExampleCaptions" className="container carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {carouselProducts.map((_, index) => (
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              key={index}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {carouselProducts.map((product, index) => (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={product._id}>
              <img src={product.images[0]} className="d-block w-100 carousel-image" alt={product.name} />
              <div className="carousel-caption  d-md-block">
                <h5 className="card-title">{product.name}</h5>
                <p>{product.description.slice(0, 100)}...</p>
                <Link to={`/products/${product._id}`} className="btn btn-primary-custom">View Details</Link>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row">
          {featuredProducts.map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4">Shop by Category</h2>
        <div className="row">
          {categories.map((category) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={category._id}>
              <CategoryCard item={category} />
            </div>
          ))}
        </div>
      </div>

      <div className="container my-5 text-center call-to-action-banner">
        <div className="p-5 rounded-3">
          <h1 className="text-body-emphasis">Discover Your Next Favorite Item!</h1>
          <p className="col-lg-8 mx-auto fs-5 text-muted">
            Explore our wide range of products and find exactly what you're looking for.
            Quality, style, and affordability all in one place.
          </p>
          <Link to="/products" className="btn btn-primary-custom btn-lg">Shop Now</Link>
        </div>
      </div>

    </>
  );
}