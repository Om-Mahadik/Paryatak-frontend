import React from "react";
import "./PackageHeadDetails.css";

// icons
import pinIcon from "../../../../imgs/icons/pin.svg";
import starIcon from "../../../../imgs/icons/star.svg";
import phoneIcon from "../../../../imgs/icons/phone.svg";
import whatsappIcon from "../../../../imgs/icons/whatsapp.svg";

const PackageHeadDetails = () => {
  const totalReviews = 120;
  const avgStars = 4.8;
  const days = 6;
  const nights = 5;
  const nextTourDate = "4 to 9 Oct 2025";

  const phoneNumber = "7841805093";
  const countryCode = "91"; // India country code

  // WhatsApp prefilled message
  const waMessage = encodeURIComponent(
    "Hello, I am interested in the Dubai 6 Days / 5 Nights package. Please provide more details."
  );
  const waLink = `https://wa.me/${countryCode}${phoneNumber}?text=${waMessage}`;

  const handleCall = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      navigator.clipboard.writeText(phoneNumber).then(() => {
        alert(`Phone number ${phoneNumber} copied to clipboard!`);
      });
    }
  };

  return (
    <div className="details-wrapper">
      {/* Title */}
      <h1 className="package-title">Dubai 6 Days / 5 Nights</h1>

      {/* Country */}
      <p className="package-country">
        <img src={pinIcon} alt="Location" className="icon" />
        United Arab Emirates
      </p>

      {/* Ratings */}
      <div className="ratings">
        {Array.from({ length: Math.round(avgStars) }).map((_, i) => (
          <img key={i} src={starIcon} alt="star" className="star-icon" />
        ))}
        <span className="rating-text">({totalReviews} reviews)</span>
      </div>

      {/* Duration */}
      <div className="info-block">
        <p className="label">Duration</p>
        <p className="value">
          {days} Days {nights} Nights
        </p>
      </div>

      {/* Next Date */}
      <div className="info-block">
        <p className="label">Next Tour Date</p>
        <p className="value">{nextTourDate}</p>
      </div>

      {/* Buttons */}
      <div className="buttons">
        <button className="btn enquire-btn" onClick={handleCall}>
          <img src={phoneIcon} alt="phone" className="btn-icon" />
          Enquire Now
        </button>

        {/* WhatsApp button styled as btn */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn whatsapp-btn"
          style={{ textDecoration: "none" }} // remove underline
        >
          <img src={whatsappIcon} alt="whatsapp" className="btn-icon" />
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default PackageHeadDetails;
