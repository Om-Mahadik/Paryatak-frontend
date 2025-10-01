import React from "react";
import "./AccessButton.css";
import whatsappIcon from "../../../imgs/icons/whatsapp.svg"; // ✅ Correct path

const AccessButton = ({ link }) => {
  // Default WhatsApp number and message
  const phoneNumber = "7841805093"; // Replace with your number
  const defaultMessage = encodeURIComponent(
    "Hello! Can I get more details about your tour packages?"
  ); // URL-encoded friendly message
  const whatsappLink =
    link || `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="access-button"
    >
      <img src={whatsappIcon} alt="WhatsApp" className="access-icon" />
      <span className="access-text">Chat with Us</span>
    </a>
  );
};

export default AccessButton;
