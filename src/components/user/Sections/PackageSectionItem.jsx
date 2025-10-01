import React from "react";
import "./PackageSectionItem.css";
import pinIcon from "../../../imgs/icons/pin.svg";
import arrowIcon from "../../../imgs/icons/arrow-notail.svg";
import starIcon from "../../../imgs/icons/star.svg";

const PackageSectionItem = ({ title, country, description, thumbnail, rating }) => {
  return (
    <div className="package-card">
      {/* Image */}
      <img src={thumbnail} alt={title} className="package-image" />

      {/* Content */}
      <div className="package-content">
        <div className="package-header">
          <h3 className="package-name">{title}</h3>
          <div className="package-rating">
            {Array.from({ length: rating }, (_, i) => (
              <img key={i} src={starIcon} alt="star" className="star-icon" />
            ))}
          </div>
        </div>

        <div className="package-location">
          <img src={pinIcon} alt="pin" className="pin-icon" />
          <span>{country}</span>
        </div>

        <p className="package-description">{description}</p>

        <button className="know-more-btn">
          Know More
          <img src={arrowIcon} alt="arrow" className="arrow-icon" />
        </button>
      </div>
    </div>
  );
};

export default PackageSectionItem;
