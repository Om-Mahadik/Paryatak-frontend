import React from "react";
import "./QuickLinkCard.css";

const QuickLinkCard = ({ icon, link, title }) => {
  return (
    <a
      href={link}
      className="quick-link-card-icon"
      target="_blank"
      rel="noopener noreferrer"
      title={title} // tooltip on hover
    >
      <img src={icon} alt={title} className="link-icon-only" />
    </a>
  );
};

export default QuickLinkCard;
