import { useContext, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Recommended from '../components/Recommended';
import { useAuth } from '../context/AuthContext';
import { useCart } from "../context/CartContext";
import ProductReview from '../components/ProductReview';
import ReviewList from '../components/ReviewList';
import Rating from '../components/Rating';

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to manage the dynamic product rating
  const [productRating, setProductRating] = useState(0);

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        // Fetch product
        const productResponse = await fetch(`/api/products/${id}`);
        if (!productResponse.ok) {
          throw new Error("Product not found");
        }
        const productData = await productResponse.json();
        setProduct(productData);
        setProductRating(productData.rating);

        // Fetch reviews
        const reviewsResponse = await fetch(`/api/reviews/${id}`);
        if (!reviewsResponse.ok) {
          throw new Error("Could not fetch reviews");
        }
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndReviews();
  }, [id]);

  const handleReviewSubmit = async (newReview) => {
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newReview, product: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const savedReview = await response.json();
      setReviews((prevReviews) => {
        const updatedReviews = [savedReview, ...prevReviews];

        // Recalculate average rating
        const totalRating = updatedReviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        const newAverageRating = totalRating / updatedReviews.length;
        setProductRating(newAverageRating); // Update the product rating state

        return updatedReviews;
      });
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const originalPrice = (product.price * (Math.random() * 0.4 + 1.1)).toFixed(
    2
  );
  const discountPercentage = Math.round(
    ((originalPrice - product.price) / originalPrice) * 100
  );

  return (
    <div className="container product-details-container">
      <div className="row">
        <div className="col-md-6">
          <div
            id="productCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              {product.images.map((image, index) => (
                <button
                  type="button"
                  data-bs-target="#productCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : "false"}
                  aria-label={`Slide ${index + 1}`}
                  key={index}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {product.images.map((image, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={index}
                >
                  <img
                    src={image}
                    className="d-block w-100 product-image"
                    alt={product.name}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#productCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#productCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="col-md-6 product-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <div className="rating-section">
            <strong>Rating:</strong>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={
                    i < Math.round(productRating) ? "star-filled" : "star-empty"
                  }
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
          <p>
            <strong>Stock:</strong>{" "}
            {product.stock > 0
              ? product.stock < 10
                ? `Low stock (${product.stock} left)`
                : `${product.stock} available`
              : "Out of stock"}
          </p>
          <p className="price-section">
            <span className="sale-badge">SALE</span>
            <small className="tag-price">${originalPrice}</small>
            <small className="text-muted current-price">${product.price}</small>
            <small className="discount-percentage">
              ({discountPercentage}% off)
            </small>
          </p>
          <button
            className="btn btn-add-to-cart"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ProductReview
            productId={product._id}
            onReviewSubmit={handleReviewSubmit}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ReviewList productId={product._id} reviews={reviews} />

          <div className="row container mb-5">
            <Recommended
              currentProductId={product._id}
              currentProductCategory={product.category}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
