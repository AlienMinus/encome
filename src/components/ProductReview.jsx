import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import '../App.css';

const ProductReview = ({ productId, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { isLoggedIn, currentUserId, displayUsername } = useAuth(); // Get login status and user ID and display name

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert('Please log in to submit a review.');
      return;
    }

    if (rating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }

    const newReview = {
      productId,
      user: currentUserId, // Use currentUserId directly as we've checked isLoggedIn
      rating,
      comment,
    };

    onReviewSubmit(newReview);
    setRating(0); // Reset rating
    setComment(''); // Reset comment
  };

  if (!isLoggedIn) {
    return (
      <div className="product-review">
        <h3>Write a Review</h3>
        <p>Please log in to leave a review.</p>
      </div>
    );
  }

  return (
    <div className="product-review">
      <h3>Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
                <span className={ratingValue <= rating ? 'star-filled' : 'star-empty'}>&#9733;</span>
              </label>
            );
          })}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Optional: Write a comment..."
          rows="4"
        />
        <button type="submit" className='btn btn-primary-custom mt-2'>Submit Review</button>
      </form>
    </div>
  );
};

export default ProductReview;
