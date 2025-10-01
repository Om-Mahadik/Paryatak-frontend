import React from "react";
import { hampiBadamiPackage } from "../../data/packages/hampiBadamiPackage";

// Sections
import PackageHeadSection from "../../components/user/PackageSections/PackageHeadSection";
import PackageBottomSection from "../../components/user/PackageSections/PackageBottomSection";

import "./DubaiPackage.css";

const HampiPackage = () => {
  return (
    <div className="package-page">
      <PackageHeadSection data={hampiBadamiPackage} />
      <PackageBottomSection data={hampiBadamiPackage} />
    </div>
  );
};

export default HampiPackage;
