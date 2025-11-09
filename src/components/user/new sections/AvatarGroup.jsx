import React from "react";
import "./AvatarGroup.css";

// Import local images
import a1 from "../../../imgs/avatars/a1.png";
import a2 from "../../../imgs/avatars/a2.png";
import a3 from "../../../imgs/avatars/a3.png";

const customers = [a1, a2, a3];

export default function AvatarGroup() {
  return (
    <div className="avatar-group-section">
      <div className="avatar-group-container">
        <div className="avatar-group">
          {customers.map((src, index) => (
            <div key={index} className="avatar">
              <img src={src} alt={`Customer ${index + 1}`} />
            </div>
          ))}
          {/* Placeholder */}
          <div className="avatar placeholder">
            <span>+243</span>
          </div>
        </div>

        {/* Rating on the right */}
        <div className="avatar-group-rating">
          <span>⭐ 4.7 Star Rated</span>
        </div>
      </div>

      <p className="avatar-group-subtitle">
        Thousands of travelers choose HelloParyatak for unforgettable experiences
      </p>
    </div>
  );
}
