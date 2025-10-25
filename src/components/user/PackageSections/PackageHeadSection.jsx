import React from "react";
import PackageHeadThumbnail from "./sub/PackageHeadThumbnail";
import PackageHeadDetails from "./sub/PackageHeadDetails";
import "./PackageHeadSection.css";

const PackageHeadSection = ({ data }) => {
  return (
    <div className="package-head-section">
      <div className="thumbnail">
        <PackageHeadThumbnail thumbnail={data.mainImage} />
      </div>
      <div className="details">
        <PackageHeadDetails data={data} />
      </div>
    </div>
  );
};

export default PackageHeadSection;
