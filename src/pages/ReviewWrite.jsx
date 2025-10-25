import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Send, CheckCircle } from "lucide-react";
import "./ReviewWrite.css";
import { fetchPackages } from "../services/packageService"; 
import reviewService from "../services/reviewService";

const ReviewWrite = () => {
  const { name } = useParams();
  const [userName, setUserName] = useState(decodeURIComponent(name || ""));
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [packagesList, setPackagesList] = useState(["Overall"]);
  const [selectedPackage, setSelectedPackage] = useState("Overall");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {
    const getPackages = async () => {
      try {
        const data = await fetchPackages();
        setPackagesList(["Overall", ...data.map((pkg) => pkg.title || "Unnamed Package")]);
      } catch (err) {
        console.error("Error fetching packages:", err);
      }
    };
    getPackages();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStarClick = (star) => setRating(star);

  const showMessage = (msg) => {
    setPopupMsg(msg);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return showMessage("Please select a rating!");

    const reviewData = {
      name: userName,
      rating,
      comment,
      package: selectedPackage === "Overall" ? null : selectedPackage
    };

    try {
      await reviewService.submitReview(reviewData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      showMessage("Error submitting review!");
    }
  };

  // ------------------- Success Card JSX -------------------
  if (submitted) {
    return (
      <div className="review-page">
        <div className="review-card success-card">
          <div className="success-icon">😊</div>
          <h2 className="review-title">Thank You, {userName || "there"}!</h2>
          <p className="review-subtitle">
            Your review has been submitted successfully. We appreciate your feedback.
          </p>
          <button
            className="submit-btn"
            onClick={() => {
              setSubmitted(false);
              setRating(0);
              setComment("");
              setSelectedPackage("Overall");
            }}
          >
            Submit Another Review
          </button>
        </div>
      </div>
    );
  }

  // ------------------- Normal Form JSX -------------------
  return (
    <div className="review-page">
      <div className="review-card compact">
        <h2 className="review-title">Hi {userName || "Traveller"}!</h2>
        <p className="review-subtitle">Share your experience with us below.</p>

        <form onSubmit={handleSubmit} className="review-form">
          <label className="input-label">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label className="input-label">Your Rating</label>
          <div className="star-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`star ${star <= rating ? "filled" : ""}`}
                onClick={() => handleStarClick(star)}
                viewBox="0 0 24 24"
              >
                <defs>
                  <linearGradient id={`grad-${star}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffce00" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
                <path
                  fill={star <= rating ? `url(#grad-${star})` : "#ddd"}
                  d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.78 1.4 8.162L12 18.896l-7.334 3.856 1.4-8.162L.132 9.21l8.2-1.192z"
                  rx="4"
                  ry="4"
                />
              </svg>
            ))}
          </div>

          <label className="input-label">Select Package</label>
          <div className="custom-dropdown" ref={dropdownRef}>
            <div
              className="dropdown-header"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {selectedPackage}
              <span className={`arrow ${dropdownOpen ? "up" : ""}`}></span>
            </div>
            {dropdownOpen && (
              <div className="dropdown-list">
                {packagesList.map((pkg, idx) => (
                  <div
                    key={idx}
                    className="dropdown-item"
                    onClick={() => {
                      setSelectedPackage(pkg);
                      setDropdownOpen(false);
                    }}
                  >
                    {pkg}
                  </div>
                ))}
              </div>
            )}
          </div>

          <label className="input-label">Your Comment</label>
          <textarea
            placeholder="Write your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />

          <button type="submit" className="submit-btn">
            <Send size={18} />
            Submit
          </button>
        </form>
      </div>

      {showPopup && <div className="custom-popup">{popupMsg}</div>}
    </div>
  );
};

export default ReviewWrite;
