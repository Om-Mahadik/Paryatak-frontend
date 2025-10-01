import React from "react";
import "./Highlights.css";

const Highlights = ({ title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="highlights-section">
      <h3>{title}</h3>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Highlights;
