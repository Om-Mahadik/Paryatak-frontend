import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPackageBySlug } from "../../services/packageService"; // import service

// Sections
import PackageHeadSection from "../../components/user/PackageSections/PackageHeadSection";
import PackageBottomSection from "../../components/user/PackageSections/PackageBottomSection";

import "./PackageDetailPage.css";

const PackageDetailPage = () => {
  const { slug } = useParams(); // Get slug from URL
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        // Call service to fetch package by slug
        const data = await getPackageBySlug(slug); 
        setPackageData(data);
      } catch (err) {
        setError(err.message || "Error fetching package");
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [slug]);

  if (loading) return <p className="loading">Loading package...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!packageData) return null;

  return (
    <div className="package-page">
      {/* Head Section */}
      <PackageHeadSection data={packageData} />

      {/* Bottom Section */}
      <PackageBottomSection data={packageData} />
    </div>
  );
};

export default PackageDetailPage;
