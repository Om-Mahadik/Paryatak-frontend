import React from "react";
import { vietnamExpressPackage } from "../../data/packages/vietnamExpressPackage";

// Sections
import PackageHeadSection from "../../components/user/PackageSections/PackageHeadSection";
import PackageBottomSection from "../../components/user/PackageSections/PackageBottomSection";

import "./DubaiPackage.css";

const VietnamPackage = () => {
  return (
    <div className="package-page">
      <PackageHeadSection data={vietnamExpressPackage} />
      <PackageBottomSection data={vietnamExpressPackage} />
    </div>
  );
};

export default VietnamPackage;
