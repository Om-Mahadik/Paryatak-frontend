import React, { useState, useEffect } from 'react';

// CSS styles are included directly in the component file
const styles = `
.progress-bar-container {
  display: flex;
  position: relative;
  padding-left: 30px; /* Space for the line */
  font-family: Arial, sans-serif;
  max-width: 400px; /* Adjust as needed */
  margin: 20px auto;
}

.progress-line-wrapper {
  position: absolute;
  left: 38px; /* Align with the center of the circles */
  top: 0;
  bottom: 0;
  width: 4px; /* Thickness of the line */
  display: flex;
  flex-direction: column;
}

.progress-line-background {
  flex-grow: 1;
  background-color: #e0e0e0; /* Light grey for the unfilled part */
  border-radius: 2px;
}

.progress-line-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #6a0dad; /* Purple color for the filled part */
  transition: height 0.7s ease-in-out; /* Smooth animation */
  border-radius: 2px;
}

.steps-list {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Space between steps */
  padding-left: 30px; /* Offset to make space for the line/circles */
}

.step-item {
  display: flex;
  align-items: flex-start;
  position: relative;
  min-height: 50px; /* Ensure enough space for the circle and content */
}

.step-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #e0e0e0; /* Default grey circle */
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: -40px; /* Position relative to the step-item to align with the line */
  top: 0;
  border: 2px solid #e0e0e0;
  z-index: 1; /* Ensure circle is above the line */
}

.step-item.active .step-circle {
  background-color: #6a0dad; /* Purple for active step */
  border-color: #6a0dad;
  box-shadow: 0 0 0 5px rgba(106, 13, 173, 0.3); /* Glow for active step */
}

.step-item.completed .step-circle {
  background-color: #6a0dad; /* Purple for completed step */
  border-color: #6a0dad;
}

.step-check {
  color: white;
  font-size: 14px;
  line-height: 1;
}

.step-content {
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  margin-left: 0; /* No left margin needed for step content */
}

.step-item.active .step-content {
  background-color: #ffffff; /* White background for active step content */
  border: 1px solid #6a0dad; /* Purple border for active step content */
}

.step-title {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.step-item.active .step-title {
  color: #6a0dad; /* Purple title for active step */
}

.step-description {
  color: #666;
  font-size: 0.9em;
}

.step-item.active .step-description {
  color: #444;
}

/* Specific styling for the line at the very top/bottom */
.progress-line-wrapper::before,
.progress-line-wrapper::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 10px; /* Small line segment above/below for full connection */
  background-color: #e0e0e0;
  left: 0;
}

.progress-line-wrapper::before {
  top: -10px; /* Extend slightly above the first circle */
}

.progress-line-wrapper::after {
  bottom: -10px; /* Extend slightly below the last circle */
}
`;

const ProgressBar = ({ currentStep }) => {
  const totalSteps = 4;
  const [filledHeight, setFilledHeight] = useState(0);

  useEffect(() => {
    // Calculate the percentage of the line to fill
    const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    setFilledHeight(Math.max(0, Math.min(100, percentage))); // Ensure it's between 0 and 100
  }, [currentStep, totalSteps]);

  const steps = [
    { title: 'Step One', description: 'This is the first step.' },
    { title: 'Step Two', description: 'This is the second step.' },
    { title: 'Step Three', description: 'This is the third step.' },
    { title: 'Step Four', description: 'This is the fourth step.' },
  ];

  return (
    <>
      {/* This injects the CSS into the document's <head> */}
      <style>{styles}</style>
      
      <div className="progress-bar-container">
        <div className="progress-line-wrapper">
          <div className="progress-line-background"></div>
          <div className="progress-line-fill" style={{ height: `${filledHeight}%` }}></div>
        </div>
        <div className="steps-list">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step-item ${index + 1 === currentStep ? 'active' : ''} ${
                index + 1 < currentStep ? 'completed' : ''
              }`}
            >
              <div className="step-circle">
                {index + 1 < currentStep && <div className="step-check">✔</div>}
              </div>
              <div className="step-content">
                <div className="step-title">{step.title}</div>
                <div className="step-description">{step.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// --- Example of how to use it in your App.js ---
// You can copy this part into your App.js or similar entry file.
// Make sure to export 'ProgressBar' and import it here.

/*
// In your App.js
import React, { useState } from 'react';
// import ProgressBar from './ProgressBar'; // Assuming you saved the code above in ProgressBar.jsx

// --- PASTE THE ProgressBar COMPONENT CODE (including styles) ABOVE THIS LINE ---

function App() {
  const [currentStep, setCurrentStep] = useState(1); // Start at step 1

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  return (
    <div className="App">
      <h1>My 4-Step Process</h1>
      <ProgressBar currentStep={currentStep} />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={handlePrevStep} disabled={currentStep === 1}>Previous</button>
        <button onClick={handleNextStep} disabled={currentStep === 4} style={{ marginLeft: '10px' }}>Next</button>
      </div>
    </div>
  );
}

export default App; // Or export default ProgressBar if it's its own file
*/

export default ProgressBar;