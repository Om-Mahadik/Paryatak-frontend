import React, { useState } from "react";
import { Search } from "lucide-react";
import CustomPackageModal from "./sub/CustomPackageModal";
import "./CustomPackage.css";

const CustomPackage = () => {
  const [destination, setDestination] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSearch = () => {
    if (destination.trim()) setShowModal(true);
  };

  return (
    <section className="custompkg-container">
      <div className="custompkg-card">
        <h2 className="custompkg-title">Looking for Custom Package?</h2>
        <p className="custompkg-subtitle">
          <span className="highlight">You Name it & We tailor make it!</span><br></br>
        </p>

        <div className="custompkg-search">
          <input
            type="text"
            placeholder="Enter your dream destination..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <button onClick={handleSearch}>
            <Search size={18} />
            <span>Get My Package</span>
          </button>
        </div>

        {showModal && (
          <CustomPackageModal
            destination={destination}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </section>
  );
};

export default CustomPackage;
