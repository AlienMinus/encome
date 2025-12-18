import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products.json';
import staticReviews from '../data/reviews.json'; // Import static reviews
import { CartContext } from '../context/CartContext';
import '../App.css';
import Recommended from '../components/Recommended';
import ProductReview from '../components/ProductReview';
import ReviewList from '../components/ReviewList'; // Import ReviewList


const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const product = products.find((p) => p.id === parseInt(id));

  // Initialize reviews state with static reviews for this product
  const [reviews, setReviews] = useState(
    staticReviews.filter((review) => review.productId === parseInt(id))
  );

  // State to manage the dynamic product rating
  const [productRating, setProductRating] = useState(product ? product.rating : 0);

  const handleReviewSubmit = (newReview) => {
    setReviews((prevReviews) => {
      const updatedReviews = [newReview, ...prevReviews]; // Add new review to the top

      // Recalculate average rating
      const totalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
      const newAverageRating = totalRating / updatedReviews.length;
      setProductRating(newAverageRating); // Update the product rating state

      return updatedReviews;
    });
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const originalPrice = (product.price * (Math.random() * 0.4 + 1.1)).toFixed(2);
  const discountPercentage = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="container product-details-container">
      <div className="row">
        <div className="col-md-6">
          <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              {product.images.map((image, index) => (
                <button
                  type="button"
                  data-bs-target="#productCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-current={index === 0 ? 'true' : 'false'}
                  aria-label={`Slide ${index + 1}`}
                  key={index}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {product.images.map((image, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                  <img src={image} className="d-block w-100 product-image" alt={product.name} />
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
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
                <span key={i} className={i < Math.round(productRating) ? 'star-filled' : 'star-empty'}>
                  &#9733;
                </span>
              ))}
            </div>
          </div>
          <p>
            <strong>Stock:</strong> {product.stock > 0 ? (product.stock < 10 ? `Low stock (${product.stock} left)` : `${product.stock} available`) : 'Out of stock'}
          </p>
          <p className="price-section">
            <span className="sale-badge">SALE</span>
            <small className="tag-price">${originalPrice}</small>
            <small className="text-muted current-price">${product.price}</small>
            <small className="discount-percentage">({discountPercentage}% off)</small>
          </p>
          <button className="btn btn-add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ProductReview productId={product.id} onReviewSubmit={handleReviewSubmit} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
 <ReviewList productId={product.id} reviews={reviews} />

      <div className="row container mb-5">
        <Recommended currentProductId={product.id} currentProductCategory={product.category} />
      </div>
    </div>
    </div>
    </div>
  );
};

export default ProductDetails;
