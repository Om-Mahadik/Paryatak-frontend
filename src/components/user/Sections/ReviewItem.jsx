import React from "react";
import "./ReviewItem.css";
import starIcon from "../../../imgs/icons/star.svg";

const ReviewItem = ({ name, comment, rating = 5 }) => {
  return (
    <div className="review-card">
      <div className="review-stars">
        {Array.from({ length: rating }).map((_, i) => (
          <img key={i} src={starIcon} alt="" className="star-icon" />
        ))}
      </div>
      <p className="review-comment">{comment}</p>
      <p className="reviewer-name">~ {name}</p>
    </div>
  );
};

export default ReviewItem;
