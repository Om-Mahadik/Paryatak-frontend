import React from "react";
import "./ProcessSectionItem.css";

const ProcessSectionItem = ({ icon, title, description, active }) => {
  return (
    <div className={`process-item ${active ? "active" : ""}`}>
      <div className="process-icon">{icon}</div>
      <h3 className="process-title">{title}</h3>
      <p className="process-desc">{description}</p>
    </div>
  );
};

export default ProcessSectionItem;
