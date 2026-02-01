import React from "react";
import "./InternationalPackagesSection.css";

const PackageSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image" />
      <div className="skeleton-content">
        <div className="skeleton-line title" />
        <div className="skeleton-line price" />
        <div className="skeleton-line details" />
      </div>
    </div>
  );
};

export default PackageSkeleton;