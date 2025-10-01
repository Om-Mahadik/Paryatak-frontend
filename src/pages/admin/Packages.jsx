import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPackages } from "../../services/packageService";
import PackageItem from "../../components/admin/packages/PackageItem";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all packages
  const fetchPackages = async () => {
    try {
      setLoading(true);
      const data = await getPackages();
      setPackages(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Packages</h2>

      <button
        onClick={() => navigate("/admin/packages/new")}
        style={{ marginBottom: "20px" }}
      >
        Create New Package
      </button>

      {loading ? (
        <p>Loading packages...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {packages.map((pkg) => (
            <PackageItem key={pkg._id} pkg={pkg} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Packages;
