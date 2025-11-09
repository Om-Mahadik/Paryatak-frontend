import React from "react";
import "./BentoGrid.css";

const BentoGrid = () => {
  return (
    <div className="bento-container">
      <div className="block large-rect">Hero / Featured</div>
      <div className="block small-rect">Highlight 1</div>
      <div className="block small-rect">Highlight 2</div>
      <div className="block square">Stats</div>
      <div className="block square">Gallery</div>
      <div className="block rect">Article / News</div>
      <div className="block circle">Profile</div>
      <div className="block rect">Content Block</div>
      <div className="block square">Icon / Feature</div>
    </div>
  );
};

export default BentoGrid;
