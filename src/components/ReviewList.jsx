import React from 'react';
import '../App.css';

const ReviewList = ({ productId, reviews }) => {
  const productReviews = reviews.filter(review => review.productId === productId);

  return (
    <div className="review-list">
      <h4>Customer Reviews</h4>
      {productReviews.length > 0 ? (
        productReviews.map((review) => (
          <div key={review._id} className="review-item">
            <div className="review-author">{review.author}</div>
            <div className="review-rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < review.rating ? 'star-filled' : 'star-empty'}>&#9733;</span>
              ))}
            </div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to write one!</p>
      )}
    </div>
  );
};

export default ReviewList;
