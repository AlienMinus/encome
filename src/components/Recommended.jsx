import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';
import { CartContext } from '../context/CartContext';

const Recommended = ({ currentProductId, currentProductCategory }) => {
  const { addToCart } = useContext(CartContext);

  // Filter out the current product and recommend products from the same category
  const recommendedProducts = productsData.filter(
    (product) =>
      product.id !== currentProductId && product.category === currentProductCategory
  ).slice(0, 4); // Limit to 4 recommended products

  if (recommendedProducts.length === 0) {
    return null; // Don't render if no recommendations
  }

  return (
    <div className="recommended-products-container mt-5">
      <h3 className='mb-5'>You might also like:</h3>
      <div className="row">
        {recommendedProducts.map((product) => {
          const originalPrice = (product.price * (Math.random() * 0.4 + 1.1)).toFixed(2);
          const discountPercentage = Math.round(((originalPrice - product.price) / originalPrice) * 100);

          return (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
              <div className="card h-100 product-card">
                <img src={product.images[0]} className="card-img-top" alt={product.name} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-hover-effect">{product.name}</h5>
                  <p className="card-text price-section">
                    <span className="sale-badge">SALE</span>
                    <small className="tag-price">${originalPrice}</small>
                    <small className="text-muted current-price">${product.price}</small>
                    <small className=" discount-percentage">({discountPercentage}% off)</small>
                  </p>
                  <div className="d-flex justify-content-between mt-auto">
                    <Link to={`/products/${product.id}`} className="btn btn-primary btn-view-details me-2">View Details</Link>
                    <button className="btn btn-secondary btn-add-to-cart ms-2" onClick={() => addToCart(product)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recommended;
