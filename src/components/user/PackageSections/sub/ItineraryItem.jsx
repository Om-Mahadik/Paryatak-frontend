import React from "react";
import "./ItineraryItem.css";

const ItineraryItem = ({ day, title, description, photo }) => {
  return (
    <div className="itinerary-item">
      <div className="itinerary-img">
        <img src={photo} alt={title} />
      </div>
      <div className="itinerary-details">
        {/* Use day as-is, already formatted in parent */}
        <h3>{day}: {title}</h3>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default ItineraryItem;
