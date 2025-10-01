import React, { useState, useEffect } from "react";
import ProcessSectionItem from "./ProcessSectionItem";
import "./OurProcessSection.css";

const OurProcessSection = () => {
  const processSteps = [
    {
      icon: "📞",
      title: "Contact Us",
      description: "Reach out via call, WhatsApp, or form and share your travel preferences.",
    },
    {
      icon: "📝",
      title: "We Plan Your Trip",
      description: "Our experts create a customized itinerary including flights, stay, and activities.",
    },
    {
      icon: "💳",
      title: "Confirm & Book",
      description: "We handle all bookings and send you the confirmations.",
    },
    {
      icon: "🧳",
      title: "Travel & Enjoy",
      description: "Everything’s ready—just pack your bags and enjoy a hassle-free journey.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % processSteps.length);
    }, 2000); // every 2 seconds
    return () => clearInterval(interval);
  }, [processSteps.length]);

  return (
    <section className="our-process">
      <div className="process-container">
        <h2 className="process-heading">We Plan, You Enjoy</h2>
        <p className="process-subline">
          Tell us your dream trip, then relax while we handle the planning and bookings.
        </p>

        <div className="process-grid">
          {processSteps.map((step, index) => (
            <ProcessSectionItem
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              active={index === activeIndex} // pass active prop
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcessSection;
