import React from "react";
import { baliGroupPackage } from "../../data/packages/baliGroupPackage";

// Sections
import PackageHeadSection from "../../components/user/PackageSections/PackageHeadSection";
import PackageBottomSection from "../../components/user/PackageSections/PackageBottomSection";

import "./DubaiPackage.css";

const BaliPackage = () => {
  return (
    <div className="package-page">
      <PackageHeadSection data={baliGroupPackage} />
      <PackageBottomSection data={baliGroupPackage} />
    </div>
  );
};

export default BaliPackage;
