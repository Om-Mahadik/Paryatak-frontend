import React from "react";
import "./GalleryTab.css";

const GalleryTab = ({ gallery }) => {
  return (
    <div className="gallery-tab">
      <h2>Gallery</h2>
      <div className="gallery-container">
        {gallery.map((img, idx) => (
          <div key={idx} className="gallery-item">
            <img src={img} alt={`Gallery ${idx + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryTab;
