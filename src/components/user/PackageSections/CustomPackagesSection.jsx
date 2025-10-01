import React from "react";
import PackageSectionItem from "../Sections/PackageSectionItem";
import "./CustomPackagesSection.css";

const CustomPackagesSection = ({ packages }) => {
  // Split packages: first 3 for top row, next 2 for bottom row
  const topPackages = packages.slice(0, 3);
  const bottomPackages = packages.slice(3, 5);

  return (
    <section className="custom-packages-section">
      <h2 className="section-headline">Custom Packages</h2>
      <p className="section-subheadline">
        Design your dream trip with our tailor-made packages
      </p>

      {/* Desktop grid */}
      <div className="packages-grid desktop-grid">
        {topPackages.map((pkg) => (
          <a key={pkg.id} href={pkg.link} className="package-link">
            <PackageSectionItem {...pkg} />
          </a>
        ))}
        {bottomPackages.map((pkg) => (
          <a key={pkg.id} href={pkg.link} className="package-link">
            <PackageSectionItem {...pkg} />
          </a>
        ))}
      </div>

      {/* Mobile scrollable */}
      <div className="packages-grid mobile-scroll">
        {packages.map((pkg) => (
          <a key={pkg.id} href={pkg.link} className="package-link">
            <PackageSectionItem {...pkg} />
          </a>
        ))}
      </div>
    </section>
  );
};

export default CustomPackagesSection;
