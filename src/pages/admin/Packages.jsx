import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PackageItem from "../../components/admin/packages/PackageItem";
import { fetchPackages, deletePackage } from "../../services/packageService";
import "./Packages.css";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  const loadPackages = async () => {
    try {
      const data = await fetchPackages();
      setPackages(data);
    } catch (err) {
      console.error("Error fetching packages:", err);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      await deletePackage(id);
      setPackages(packages.filter(pkg => pkg._id !== id));
    } catch (err) {
      console.error("Error deleting package:", err);
    }
  };

  const filteredPackages = packages.filter(pkg => {
    if (activeTab === "All") return true;
    if (activeTab === "International") return pkg.isInternational;
    if (activeTab === "National") return !pkg.isInternational;
    return true;
  });

  return (
    <div className="packages-page">
      <div className="packages-header">
        <div className="tabs">
          {["All", "International", "National"].map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          className="create-package-btn"
          onClick={() => navigate("/admin/package-setup")}
        >
          + Create New Package
        </button>
      </div>

      <div className="packages-grid">
        {filteredPackages.length === 0 ? (
          <p className="no-packages-text">No packages available.</p>
        ) : (
          filteredPackages.map(pkg => (
            <PackageItem key={pkg._id} pkg={pkg} handleDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default Packages;
