import React from "react";
import "./PackageHeadThumbnail.css";

const PackageHeadThumbnail = ({ thumbnail }) => {
  return (
    <div className="thumbnail-wrapper">
      <img src={thumbnail} alt="Package Thumbnail" />
    </div>
  );
};

export default PackageHeadThumbnail;
