import React from "react";
import "./Reviews.css";
import StarIcon from "../../../../imgs/icons/star.svg"; // import your star icon

const Reviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return null;

  // Limit to max 6 reviews
  const displayReviews = reviews.slice(0, 6);

  return (
    <div className="reviews-section">
      <h2>Customer Reviews</h2>
      <div className="reviews-list">
        {displayReviews.map((rev, idx) => (
          <div key={idx} className="review-card">
            <div className="review-stars">
              {Array.from({ length: rev.rating }).map((_, i) => (
                <img key={i} src={StarIcon} alt="star" className="star-icon" />
              ))}
            </div>
            <p className="review-text">"{rev.comment}"</p>
            <p className="reviewer-name">~ {rev.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
