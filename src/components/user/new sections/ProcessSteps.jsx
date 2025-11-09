import React, { useState, useEffect } from "react";
import "./ProcessSteps.css";

const steps = [
  { title: "Register", desc: "Sign up with HelloParyatak to start your adventure." },
  { title: "Choose Plan", desc: "Select a travel plan that suits your style and budget." },
  { title: "Purchase", desc: "Confirm your booking securely and easily." },
  { title: "Enjoy Trip", desc: "Receive your itinerary and enjoy your unforgettable journey." },
];

export default function ProfessionalStepper() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Calculate progress for animated line
  const progress = (currentStep / (steps.length - 1)) * 100;

  return (
    <section className="process-section">
      {/* Title & Subtitle */}
      <div className="process-header">
        <h2 className="process-title">Our Step-by-Step Process</h2>
        <p className="process-subtitle">
          We make your journey seamless from start to finish. Follow these simple steps to plan your perfect adventure.
        </p>
      </div>

      {/* Stepper */}
      <div className="stepper-container">
        <div className="stepper">
          {steps.map((step, index) => (
            <div key={index} className="step-wrapper">
              <div className={`circle ${index <= currentStep ? "active" : ""}`}>
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="line-bg">
                  <div className="line-fill" style={{ width: `${progress}%` }}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step description */}
      <p className="step-description">{steps[currentStep].desc}</p>
    </section>
  );
}
