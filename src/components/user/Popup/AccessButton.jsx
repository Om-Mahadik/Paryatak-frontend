import React from "react";
import "./AccessButton.css";
import whatsappIcon from "../../../imgs/icons/whatsapp.svg"; // WhatsApp icon
import phoneIcon from "../../../imgs/icons/phone.svg"; // Phone icon

const AccessButton = ({ link }) => {
  // WhatsApp
  const phoneNumber = "8999428110"; // Replace with your number
  const defaultMessage = encodeURIComponent(
    "Hello! Can I get more details about your tour packages?"
  );
  const whatsappLink =
    link || `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  // Call Now handler
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
    <div className="access-buttons-wrapper">
      {/* Call Now Button - ABOVE WhatsApp */}
      <button className="access-button call-now" onClick={handleCall}>
        <img src={phoneIcon} alt="Phone" className="access-icon" />
        <span className="access-text">Call Now</span>
      </button>

      {/* WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="access-button whatsapp-btn"
      >
        <img src={whatsappIcon} alt="WhatsApp" className="access-icon" />
        <span className="access-text">Chat with Us</span>
      </a>
    </div>
  );
};

export default AccessButton;
