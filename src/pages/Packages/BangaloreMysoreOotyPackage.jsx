import React from "react";
import { bangaloreMysoreOotyPackage } from "../../data/packages/bangaloreMysoreOotyPackage";

// Sections
import PackageHeadSection from "../../components/user/PackageSections/PackageHeadSection";
import PackageBottomSection from "../../components/user/PackageSections/PackageBottomSection";

import "./DubaiPackage.css";

const BangaloreMysoreOotyPackage = () => {
  return (
    <div className="package-page">
      <PackageHeadSection data={bangaloreMysoreOotyPackage} />
      <PackageBottomSection data={bangaloreMysoreOotyPackage} />
    </div>
  );
};

export default BangaloreMysoreOotyPackage;
