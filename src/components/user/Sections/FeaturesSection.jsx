import React, { useState, useEffect } from "react";
import "./FeaturesSection.css";

import AccommodationIcon from "../../../imgs/icons/accommodation.svg";
import FlightsIcon from "../../../imgs/icons/flights.svg";
import TourGuideIcon from "../../../imgs/icons/tour-guide.svg";
import MealsIcon from "../../../imgs/icons/meals.svg";
import ActivitiesIcon from "../../../imgs/icons/activities.svg";
import LocalIcon from "../../../imgs/icons/local.svg";
import CabIcon from "../../../imgs/icons/cab.svg";
import HandShakeIcon from "../../../imgs/icons/handshake.svg";

const featuresList = [
  {
    title: "Comfortable Stays",
    description: "Relax in premium accommodations designed for ultimate comfort.",
    icon: AccommodationIcon,
    points: [
      "Air-conditioned rooms & scenic views",
      "Complimentary breakfast included",
      "24×7 room service & cleanliness"
    ]
  },
  {
    title: "Seamless Flights",
    description: "We take care of your flight bookings for a hassle-free journey.",
    icon: FlightsIcon,
    points: [
      "Round-trip flight bookings managed",
      "Best deals on fares & timings",
      "Instant e-ticket confirmations"
    ]
  },
  {
    title: "Expert Guides",
    description: "Explore destinations with professionals who know every hidden gem.",
    icon: TourGuideIcon,
    points: [
      "Certified multilingual guides",
      "Local insights & hidden stories",
      "Personalized itinerary assistance"
    ]
  },
  {
    title: "Delicious Meals",
    description: "Taste local cuisines and fresh delicacies curated for your experience.",
    icon: MealsIcon,
    points: [
      "Authentic regional dishes daily",
      "Special dietary options available",
      "Hygienic, chef-prepared meals"
    ]
  },
  {
    title: "Fun Activities",
    description: "Adventure, culture, and entertainment — all in one unforgettable trip.",
    icon: ActivitiesIcon,
    points: [
      "Trekking, kayaking, and more",
      "Cultural shows & evening bonfires",
      "Adventure sports arrangements"
    ]
  },
  {
    title: "Local Experiences",
    description: "Immerse yourself in the authentic traditions of every destination.",
    icon: LocalIcon,
    points: [
      "Village tours & cultural workshops",
      "Traditional art & craft sessions",
      "Interaction with local communities"
    ]
  },
  {
    title: "Luxury Transfers",
    description: "Travel comfortably with our reliable and stylish transfer services.",
    icon: CabIcon,
    points: [
      "Private AC cars & minibuses",
      "Pickup & drop from airport/hotel",
      "Safe, on-time transport guaranteed"
    ]
  },
  {
    title: "Personal Assistance",
    description: "Our support team is available throughout your trip for any needs.",
    icon: HandShakeIcon,
    points: [
      "Dedicated travel coordinator",
      "24/7 emergency helpline",
      "Instant response via WhatsApp"
    ]
  }
];


const FeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuresList.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="orbit-section">
      <div className="orbit-wrapper">
        {/* Circle background */}
        <div className="orbit-center-circle">
          <img
            src={featuresList[activeIndex].icon}
            alt="active feature"
            className="center-icon"
          />
        </div>

        {/* Floating surrounding icons */}
        <div className="orbit-icons">
          {featuresList.map((feature, index) => (
            <div
              key={index}
              className={`orbit-icon ${
                index === activeIndex ? "active" : ""
              } orbit-${index + 1}`}
            >
              <img src={feature.icon} alt={feature.title} />
            </div>
          ))}
        </div>
      </div>

      {/* Feature description */}
      <div className="orbit-details">
        <h3 className="orbit-title">{featuresList[activeIndex].title}</h3>
        <p className="orbit-desc">{featuresList[activeIndex].description}</p>
        <ul className="orbit-points">
          {featuresList[activeIndex].points.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      
      </div>
    </div>
  );
};

export default FeaturesSection;
