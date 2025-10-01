import React, { useState, useEffect } from "react";
import ReviewItem from "./ReviewItem";
import "./ReviewsSection.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const reviewsData = [
  { name: "Aarav Sharma", comment: "Excellent service, everything was seamless.", rating: 5 },
  { name: "Priya Patel", comment: "Loved the attention to detail and guidance.", rating: 5 },
  { name: "Rohan Mehta", comment: "Friendly staff and smooth booking experience.", rating: 4 },
  { name: "Sneha Gupta", comment: "Memorable trip, very well organized.", rating: 5 },
  { name: "Ankit Verma", comment: "Good value for money and excellent support.", rating: 4 },
  { name: "Isha Singh", comment: "Had a wonderful experience, highly recommend.", rating: 5 },
  { name: "Karan Joshi", comment: "Professional and caring staff, loved it.", rating: 5 },
  { name: "Divya Rao", comment: "Amazing trips, felt completely hassle-free.", rating: 5 },
  { name: "Nisha Reddy", comment: "Wonderful guidance throughout.", rating: 5 },
  { name: "Manish Kumar", comment: "Very organized and professional.", rating: 5 },
  { name: "Sanya Kapoor", comment: "Loved the personalized experience.", rating: 4 },
  { name: "Ritesh Jain", comment: "Excellent communication and support.", rating: 5 },
  { name: "Meera Nair", comment: "Smooth booking process.", rating: 5 },
  { name: "Vikram Singh", comment: "Highly recommend to everyone.", rating: 5 },
  { name: "Tanya Sharma", comment: "Great attention to detail.", rating: 5 },
  { name: "Amit Desai", comment: "Amazing trip planning experience.", rating: 4 },
];

const ReviewsSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const firstRowReviews = reviewsData.slice(0, 8);
  const secondRowReviews = reviewsData.slice(8, 16);

  return (
    <section className="reviews-section">
      <h2 className="section-heading">Traveler Reviews</h2>
      <p className="section-subheadline">What our travelers are saying about us</p>

      {!isMobile ? (
        <div className="reviews-grid">
          {reviewsData.slice(0, 8).map((r, idx) => (
            <ReviewItem key={idx} {...r} />
          ))}
        </div>
      ) : (
        <>
          {/* Upper row: Right → Left */}
          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={1.5}
            loop={true}
            freeMode={true}
            freeModeMomentum={false}
            speed={10000} 
            initialSlide={0} // start at beginning
            autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: false }}
            grabCursor={true}
          >
            {[...firstRowReviews, ...firstRowReviews].map((r, idx) => (
              <SwiperSlide key={idx} style={{ width: "70%" }}>
                <ReviewItem {...r} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Bottom row: Left → Right, start at different point */}
          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={1.5}
            loop={true}
            freeMode={true}
            freeModeMomentum={false}
            speed={10000} 
            initialSlide={4} // start from middle of slides for offset
            autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: true }}
            grabCursor={true}
          >
            {[...secondRowReviews, ...secondRowReviews].map((r, idx) => (
              <SwiperSlide key={idx} style={{ width: "70%" }}>
                <ReviewItem {...r} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </section>
  );
};

export default ReviewsSection;
