import React from "react";
import InternationalPackagesSection from "../components/user/PackageSections/InternationalPackagesSection";
import NationalPackagesSection from "../components/user/PackageSections/NationalPackagesSection";
import CustomPackagesSection from "../components/user/PackageSections/CustomPackagesSection";
import { internationalPackages, nationalPackages, customPackages } from "../data/packages/packages";
import "./Packages.css";

const Packages = () => {
  return (
    <div className="packages-page">
      <InternationalPackagesSection packages={internationalPackages} />
      <NationalPackagesSection packages={nationalPackages} />
      <CustomPackagesSection packages={customPackages} />
    </div>
  );
};

export default Packages;


