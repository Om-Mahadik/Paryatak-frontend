import React from "react";
import { sriLankaGroupPackage } from "../../data/packages/sriLankaGroupPackage";

// Sections
import PackageHeadSection from "../../components/user/PackageSections/PackageHeadSection";
import PackageBottomSection from "../../components/user/PackageSections/PackageBottomSection";

import "./DubaiPackage.css";

const SriLankaPackage = () => {
  return (
    <div className="package-page">
      <PackageHeadSection data={sriLankaGroupPackage} />
      <PackageBottomSection data={sriLankaGroupPackage} />
    </div>
  );
};

export default SriLankaPackage;
