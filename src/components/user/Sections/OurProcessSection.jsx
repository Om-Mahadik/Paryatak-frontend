import React, { useState, useEffect } from "react";
import "./OurProcessSection.css";

import f1 from "../../../imgs/icons/f1.svg";
import f2 from "../../../imgs/icons/f2.svg";
import f3 from "../../../imgs/icons/f3.svg";
import f4 from "../../../imgs/icons/f4.svg";

const OurProcessSection = () => {
  const processData = [
    {
      icon: f1,
      title: "Contact Us",
      description:
        "Reach out via call, WhatsApp, or form and share your travel preferences.",
    },
    {
      icon: f2,
      title: "We Plan Your Trip",
      description:
        "Our experts create a customized itinerary including flights, stay, and activities.",
    },
    {
      icon: f3,
      title: "Confirm & Book",
      description:
        "We handle all bookings and send you the confirmations instantly.",
    },
    {
      icon: f4,
      title: "Travel & Enjoy",
      description:
        "Everything’s ready—just pack your bags and enjoy a hassle-free journey.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % processData.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [processData.length]);

  return (
    <section className="travel-process">
      <div className="travel-process-container">
        <h2 className="travel-process-heading">We Plan, You Enjoy</h2>
        <p className="travel-process-subtext">
          Tell us your dream trip, then relax while we handle the planning and bookings.
        </p>

        <div className="travel-process-grid">
          {processData.map((step, index) => (
            <div
              key={index}
              className={`travel-step ${
                index === activeIndex ? "travel-step-active" : ""
              }`}
            >
              <div className="travel-step-icon-box">
                <img
                  src={step.icon}
                  alt={step.title}
                  className="travel-step-icon"
                />
              </div>
              <div className="travel-step-text">
                <h3 className="travel-step-title">{step.title}</h3>
                <p className="travel-step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcessSection;
