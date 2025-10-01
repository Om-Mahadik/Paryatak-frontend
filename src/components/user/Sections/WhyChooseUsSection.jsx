// src/components/user/Sections/WhyChooseUsSection.jsx
import React from "react";
import "./WhyChooseUsSection.css";

// Import icons directly
import icon1 from "../../../imgs/icons/icon1.svg";
import icon2 from "../../../imgs/icons/icon2.svg";
import icon3 from "../../../imgs/icons/icon3.svg";
import icon4 from "../../../imgs/icons/icon4.svg";

// Define the features data here
const featuresData = [
  {
    icon: icon1,
    title: "All-Inclusive Packages",
    subtitle: "Stay, travel, food, and guides — everything handled for a seamless trip.",
    bgColor: "#ffc7c7ff",
  },
  {
    icon: icon2,
    title: "Customizable Journeys",
    subtitle: "Design your dream trip exactly the way you want it.",
    bgColor: "#cbe9ffff",
  },
  {
    icon: icon3,
    title: "Expert Guides & Local Insights",
    subtitle: "Travel with professionals who know the destinations best.",
    bgColor: "#d3ffdfff",
  },
  {
    icon: icon4,
    title: "Affordable & Transparent Pricing",
    subtitle: "No hidden charges — just clear, value-packed travel experiences.",
    bgColor: "#ffe9beff",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="why-choose-us">
      <h2 className="section-heading">Why Choose Us</h2>
      <p className="section-subheadline">Here’s why travelers love GoParyatak</p>

      <div className="features-grid">
        {featuresData.map((feature, index) => (
          <div key={index} className="feature-card">
            <div
              className="feature-icon-circle"
              style={{ backgroundColor: feature.bgColor }}
            >
              <img src={feature.icon} alt={feature.title} className="feature-icon" />
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-subtitle">{feature.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
