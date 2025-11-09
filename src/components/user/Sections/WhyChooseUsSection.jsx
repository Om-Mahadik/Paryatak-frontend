import React from "react";
import "./WhyChooseUsSection.css";
import { FaUmbrellaBeach, FaRoute, FaMapSigns, FaWallet } from "react-icons/fa";

const featuresData = [
  {
    icon: <FaUmbrellaBeach />,
    title: "All-Inclusive Packages",
    subtitle:
      "Stay, travel, food, and guides — everything handled for a seamless trip.",
  },
  {
    icon: <FaRoute />,
    title: "Customizable Journeys",
    subtitle: "Design your dream trip exactly the way you want it.",
  },
  {
    icon: <FaMapSigns />,
    title: "Expert Guides & Local Insights",
    subtitle: "Travel with professionals who know the destinations best.",
  },
  {
    icon: <FaWallet />,
    title: "Affordable & Transparent Pricing",
    subtitle: "No hidden charges — just clear, value-packed travel experiences.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="why-choose-us">
      <h2 className="section-title">Why Choose Us</h2>
      <p className="section-subtitle">Here’s why travelers love GoParyatak</p>

      <div className="features-grid">
        {featuresData.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-subtitle">{feature.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
