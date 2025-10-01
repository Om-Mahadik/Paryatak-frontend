import React from "react";
import { dubaiPackage } from "../../data/packages/dubaiPackage";

// Sections
import PackageHeadSection from "../../components/user/PackageSections/PackageHeadSection";
import PackageBottomSection from "../../components/user/PackageSections/PackageBottomSection";
// Later we’ll add OverviewSection, HighlightsSection, IncludedSection, ItinerarySection, GallerySection, DatesSection, BrochureSection, ReviewsSection

import "./DubaiPackage.css";

const DubaiPackage = () => {
  return (
    <div className="package-page">
      {/* Head Section */}
      <PackageHeadSection data={dubaiPackage} />
      <PackageBottomSection data={dubaiPackage} />

      {/* Other sections will go here one by one */}
    </div>
  );
};

export default DubaiPackage;
