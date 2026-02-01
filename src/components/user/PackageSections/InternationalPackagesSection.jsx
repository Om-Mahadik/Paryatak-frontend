import React, { useEffect, useState } from "react";
import PackageSectionItem from "../Sections/PackageSectionItem";
import { fetchInternationalPackages } from "../../../services/packageService";
import PackageSkeleton from "./PackageSkeleton";
import "./InternationalPackagesSection.css";

const InternationalPackagesSection = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPackages = async () => {
      try {
        const data = await fetchInternationalPackages();
        setPackages(data);
      } catch (err) {
        console.error("Error fetching international packages:", err);
      } finally {
        setLoading(false);
      }
    };

    getPackages();
  }, []);

  // Define how many skeleton cards to show
  const skeletonItems = Array(4).fill(0);

  return (
    <section className="intl-section">
      <h2 className="intl-title">International Packages</h2>
      <p className="intl-subtitle">
        Explore our top international travel destinations
      </p>

      {/* Desktop Grid */}
      <div className="intl-grid">
        {loading
          ? skeletonItems.map((_, index) => <PackageSkeleton key={index} />)
          : packages.map((pkg) => (
              <a key={pkg._id} href={pkg.slug ? `/packages/${pkg.slug}` : "#"} className="intl-link">
                <PackageSectionItem {...pkg} />
              </a>
            ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="intl-scroll">
        {loading
          ? skeletonItems.map((_, index) => (
              <div key={index} className="intl-card">
                <PackageSkeleton />
              </div>
            ))
          : packages.map((pkg) => (
              <a key={pkg._id} href={pkg.slug ? `/packages/${pkg.slug}` : "#"} className="intl-card">
                <PackageSectionItem {...pkg} />
              </a>
            ))}
      </div>
    </section>
  );
};

export default InternationalPackagesSection;