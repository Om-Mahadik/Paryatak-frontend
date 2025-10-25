import React from "react";
import { useNavigate } from "react-router-dom";
import starIcon from "../../../imgs/icons/star.svg";

const PackageItem = ({ pkg }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/package-setup/${pkg._id}`);
  };

  const stars = pkg.rating?.stars ? Math.round(pkg.rating.stars) : 0;

  return (
    <div className="admin-package-card" onClick={handleClick}>
      <img
        src={pkg.mainImage || pkg.thumbnail}
        alt={pkg.title}
        className="admin-package-image"
      />
      <div className="admin-package-content">
        <h3 className="admin-package-title">{pkg.title}</h3>

        {/* Star rating */}
        <div className="admin-package-stars">
          {Array.from({ length: stars }, (_, i) => (
            <img key={i} src={starIcon} alt="star" />
          ))}
        </div>

        

        <div className="admin-package-details">
          <span className="price">
            {pkg.price ? `₹${pkg.price}` : "Check details"}
          </span>
          <span className="category">
            {pkg.isInternational ? "🌍" : "🇮🇳"}
          </span>
        </div>

        <p className="admin-package-duration">
          {pkg.days} Days / {pkg.nights} Nights
        </p>
        
      </div>
    </div>
  );
};

export default PackageItem;
