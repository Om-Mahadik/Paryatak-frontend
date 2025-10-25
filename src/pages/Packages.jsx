import React from "react";
import InternationalPackagesSection from "../components/user/PackageSections/InternationalPackagesSection";
import NationalPackagesSection from "../components/user/PackageSections/NationalPackagesSection";
//import CustomPackagesSection from "../components/user/PackageSections/CustomPackagesSection";
import { internationalPackages, nationalPackages } from "../data/packages/packages";
import "./Packages.css";

const Packages = () => {
  //      <CustomPackagesSection packages={customPackages} />
  return (
    <div className="packages-page">
      <InternationalPackagesSection />
      <NationalPackagesSection />


    </div>
  );
};

export default Packages;