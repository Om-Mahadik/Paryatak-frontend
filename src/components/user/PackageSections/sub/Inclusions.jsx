import React from "react";
import "./Inclusions.css";

const Inclusions = ({ title = "What's Included", items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="inclusions-section">
      <h3>{title}</h3>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Inclusions;
