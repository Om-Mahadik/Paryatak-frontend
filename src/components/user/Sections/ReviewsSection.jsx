import React, { useState, useEffect } from "react";
import ReviewItem from "./ReviewItem";
import "./ReviewsSection.css";

const reviewsData = [
  { name: "Aarav Sharma", comment: "Excellent service, everything was seamless.", rating: 5 },
  { name: "Priya Patel", comment: "Loved the attention to detail and guidance.", rating: 5 },
  { name: "Rohan Mehta", comment: "Friendly staff and smooth booking experience.", rating: 4 },
  { name: "Sneha Gupta", comment: "Memorable trip, very well organized.", rating: 5 },
  { name: "Ankit Verma", comment: "Good value for money and excellent support.", rating: 4 },
  { name: "Isha Singh", comment: "Had a wonderful experience, highly recommend.", rating: 5 },
  { name: "Karan Joshi", comment: "Professional and caring staff, loved it.", rating: 5 },
  { name: "Divya Rao", comment: "Amazing trips, felt completely hassle-free.", rating: 5 },
];

const ReviewsSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="reviews-section">
      <h2 className="section-heading">Traveler Reviews</h2>
      <p className="section-subheadline">What our travelers are saying about us</p>

      {!isMobile ? (
        <div className="reviews-grid">
          {reviewsData.map((r, idx) => (
            <ReviewItem key={idx} {...r} />
          ))}
        </div>
      ) : (
        <>
          <div className="mobile-scroll-container">
            <div className="mobile-scroll-line line1">
              {reviewsData.slice(0, 4).map((r, idx) => (
                <ReviewItem key={idx} {...r} />
              ))}
            </div>
          </div>
          <div className="mobile-scroll-container">
            <div className="mobile-scroll-line line2">
              {reviewsData.slice(4, 8).map((r, idx) => (
                <ReviewItem key={idx} {...r} />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ReviewsSection;
