// Reviews.js
import React, { useEffect, useState } from "react";
import reviewService from "../../services/reviewService";
import "./Reviews.css";
import { FaStar, FaChevronDown } from "react-icons/fa";
import DeleteIcon from "../../imgs/icons/delete.svg";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewService.getPendingReviews();
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (id) => {
    await reviewService.approveReview(id);
    fetchReviews();
  };

  const handleDelete = async (id) => {
    await reviewService.deleteReview(id);
    fetchReviews();
  };

  const toggleExpand = (id) => setExpanded(expanded === id ? null : id);

  if (loading) return <p>Loading reviews...</p>;
  if (!reviews.length) return <p>No pending reviews.</p>;

  return (
    <div className="admin-reviews-container">
      <h2 className="h2class">Pending Reviews</h2>
      {reviews.map((rev) => {
        const isExpanded = expanded === rev._id;
        return (
          <div
            key={rev._id}
            className={`admin-review-card ${!rev.read ? "unread" : ""}`}
          >
            {/* Header */}
            <div className="review-header" onClick={() => toggleExpand(rev._id)}>
              <div className="review-user">{rev.name}</div>
              <div className="review-stars">
                {Array.from({ length: rev.rating || 0 }).map((_, i) => (
                  <FaStar key={i} color="#fbbf24" />
                ))}
              </div>
              <div className={`review-arrow ${isExpanded ? "rotated" : ""}`}>
                <FaChevronDown />
              </div>
            </div>

            {/* Collapsible Content */}
            <div className={`review-drawer ${isExpanded ? "expanded" : ""}`}>
              <p className="review-comment">{rev.comment}</p>
              <div className="review-package">Package: {rev.package?.title || "Overall"}</div>
              <div className="review-actions">
                <button
                  className="approve-btn"
                  onClick={() => handleApprove(rev._id)}
                >
                  Approve
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(rev._id)}
                  title="Delete"
                >
                  <img src={DeleteIcon} alt="Delete" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
