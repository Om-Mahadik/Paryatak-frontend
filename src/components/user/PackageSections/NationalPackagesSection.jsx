import React, { useEffect, useState } from "react";
import PackageSectionItem from "../Sections/PackageSectionItem";
import { fetchNationalPackages } from "../../../services/packageService";
import "./InternationalPackagesSection.css";

const NationalPackagesSection = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPackages = async () => {
      try {
        const data = await fetchNationalPackages();
        setPackages(data);
      } catch (err) {
        console.error("Error fetching international packages:", err);
      } finally {
        setLoading(false);
      }
    };

    getPackages();
  }, []);

  if (loading) {
    return <p>Loading national packages...</p>;
  }

  return (
    <section className="intl-section">
      <h2 className="intl-title">National Packages</h2>
      <p className="intl-subtitle">
        Explore our top travel destinations in India
      </p>

      {/* Desktop Grid */}
      <div className="intl-grid">
        {packages.map((pkg) => (
          <a key={pkg._id} href={pkg.slug ? `/packages/${pkg.slug}` : "#"} className="intl-link">
            <PackageSectionItem {...pkg} />
          </a>
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="intl-scroll">
        {packages.map((pkg) => (
          <a key={pkg._id} href={pkg.slug ? `/packages/${pkg.slug}` : "#"} className="intl-card">
            <PackageSectionItem {...pkg} />
          </a>
        ))}
      </div>
    </section>
  );
};

export default NationalPackagesSection;
