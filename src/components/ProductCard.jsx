import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import Rating from './Rating';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const originalPrice = (product.price * (Math.random() * 0.4 + 1.1)).toFixed(2);
  const discountPercentage = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="card mb-3 product-card">
      <img src={product.images[0]} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title text-hover-effect">{product.name}</h5>
        <p className="card-text text-hover-effect">{product.description.slice(0, 35) + "...."}</p>
        {/* Render Rating component */}
        <Rating
          value={product.averageRating}
          text={`${product.numOfReviews} reviews`}
        />
        <p className="card-text price-section">
          <span className="sale-badge">SALE</span>
          <small className="tag-price">${originalPrice}</small>
          <small className="text-muted current-price">${product.price}</small>
          <small className=" discount-percentage">({discountPercentage}% off)</small>
        </p>
        <div className="d-flex justify-content-between">
        <Link to={`/products/${product._id}`} className="btn btn-primary btn-view-details me-2">View Details</Link>
          <button className="btn btn-secondary btn-add-to-cart ms-2" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;