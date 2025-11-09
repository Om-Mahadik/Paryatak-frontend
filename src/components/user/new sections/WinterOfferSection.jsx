import React, { useState, useEffect } from "react";
import "./WinterOfferSection.css";

const WinterOfferSection = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const offerEnd = new Date();
    offerEnd.setDate(offerEnd.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = offerEnd - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="winter-offer-section">
      <div className="offer-content">
        <div className="text-area">
          <h2 className="offer-title">Winter Special Adventure!</h2>
          <p className="offer-subtitle">
            Discover hidden paradises this winter. Book within a week and save big on your dream getaway!
          </p>
          <button className="book-now-btn">Book Now</button>
        </div>

        <div className="countdown">
          <div className="countdown-item">
            <span>{timeLeft.days}</span>
            <small>Days</small>
          </div>
          <div className="countdown-item">
            <span>{timeLeft.hours}</span>
            <small>Hours</small>
          </div>
          <div className="countdown-item">
            <span>{timeLeft.minutes}</span>
            <small>Minutes</small>
          </div>
          <div className="countdown-item">
            <span>{timeLeft.seconds}</span>
            <small>Seconds</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WinterOfferSection;
