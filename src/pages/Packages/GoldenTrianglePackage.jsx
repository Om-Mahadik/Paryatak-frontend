import React from "react";
import { goldenTrianglePackage } from "../../data/packages/goldenTrianglePackage";

// Sections
import PackageHeadSection from "../../components/user/PackageSections/PackageHeadSection";
import PackageBottomSection from "../../components/user/PackageSections/PackageBottomSection";

import "./DubaiPackage.css";

const GoldenTrianglePackage = () => {
  return (
    <div className="package-page">
      <PackageHeadSection data={goldenTrianglePackage} />
      <PackageBottomSection data={goldenTrianglePackage} />
    </div>
  );
};

export default GoldenTrianglePackage;
