import React from "react";
import "./AnimatedStepsList.css";

const steps = [
  {
    name: "Register",
    description: "Sign up with HelloParyatak to start your adventure.",
    icon: "📝",
    color: "#4F46E5",
  },
  {
    name: "Choose Plan",
    description: "Select the travel plan that suits your style and budget.",
    icon: "📋",
    color: "#F97316",
  },
  {
    name: "Purchase",
    description: "Confirm your booking securely and easily.",
    icon: "💸",
    color: "#10B981",
  },
  {
    name: "Enjoy Trip",
    description: "Receive your itinerary and enjoy your unforgettable journey.",
    icon: "✈️",
    color: "#1E86FF",
  },
];

const Notification = ({ name, description, icon, color }) => (
  <div className="notification">
    <div className="notification-icon" style={{ backgroundColor: color }}>
      {icon}
    </div>
    <div className="notification-content">
      <div className="notification-name">{name}</div>
      <p className="notification-desc">{description}</p>
    </div>
  </div>
);

export default function AnimatedStepsList() {
  // Duplicate steps to make looping seamless
  const loopedSteps = [...steps, ...steps];

  return (
    <div className="animated-list-container">
      <div className="steps-title">
        <h2>Our Steps</h2>
        <p>Follow these steps to plan your perfect HelloParyatak adventure</p>
      </div>
      <div className="animated-list">
        <div className="animated-list-inner">
          {loopedSteps.map((step, idx) => (
            <Notification key={idx} {...step} />
          ))}
        </div>
      </div>
    </div>
  );
}
