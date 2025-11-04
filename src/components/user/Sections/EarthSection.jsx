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
        <h2>See the World Differently</h2>
        <p>
          From tropical islands to mountain escapes — your next adventure starts
          here. Discover handpicked destinations that inspire travel and joy.
        </p>
        <button onClick={() => navigate("/contact")}>Contact Us</button>
      </div>
    </section>
  );
};

export default EarthSection;
