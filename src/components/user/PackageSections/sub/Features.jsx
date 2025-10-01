import React from "react";
import "./Features.css";

// Import your icons (replace with actual SVG imports)
import AccommodationIcon from "../../../../imgs/icons/accommodation.svg";
import FlightsIcon from "../../../../imgs/icons/flights.svg";
import TourGuideIcon from "../../../../imgs/icons/tour-guide.svg";
import MealsIcon from "../../../../imgs/icons/meals.svg";
import ActivitiesIcon from "../../../../imgs/icons/activities.svg";

const featuresData = [
  { title: "Accommodation", icon: AccommodationIcon },
  { title: "Flights", icon: FlightsIcon },
  { title: "Tour Guide", icon: TourGuideIcon },
  { title: "Meals", icon: MealsIcon },
  { title: "Activities", icon: ActivitiesIcon },
];

const Features = () => {
  return (
    <div className="features-section">
      {featuresData.map((feature, idx) => (
        <div key={idx} className="feature-card">
          <img src={feature.icon} alt={feature.title} />
          <p>{feature.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
