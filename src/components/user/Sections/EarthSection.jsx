import React from "react";
import RotatingEarth from "./RotatingEarth";
import { useNavigate } from "react-router-dom";
import "./EarthSection.css";

const EarthSection = () => {
  const navigate = useNavigate();

  return (
    <section className="earth-section">
      <div className="earth-container">
        <RotatingEarth />
      </div>

      <div className="earth-text">
        <h2>Anywhere on Earth, Your Way</h2>
        <p>
          Plan journeys to untouched destinations, hidden corners, and breathtaking spots.
        </p>
        <button onClick={() => navigate("/contact")}>Contact Us</button>
      </div>
    </section>
  );
};

export default EarthSection;
