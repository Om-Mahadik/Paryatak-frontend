import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHeroSections } from "../../services/heroSectionService";
import "./HeroSectionAdmin.css";

const HeroSectionAdmin = () => {
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();

  const fetchSections = async () => {
    try {
      const data = await getHeroSections();
      if (Array.isArray(data)) setSections(data);
      else if (data) setSections([data]);
    } catch (error) {
      console.error("Error loading hero sections:", error);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/admin/hero-section-setup/${id}`);
  };

  const handleAddNew = () => {
    navigate("/admin/hero-section-setup/");
  };

  return (
    <div className="hero-admin-page">
      <div className="hero-admin-header">
        <h2>Hero Section Management</h2>
        <button className="addd-btn" onClick={handleAddNew}>
          + Add New
        </button>
      </div>

      <div className="hero-list">
        {sections.length === 0 ? (
          <p className="empty">No hero sections found.</p>
        ) : (
          <div className="hero-grid">
            {sections.map((item) => (
              <div
                className="hero-card"
                key={item._id}
                onClick={() => handleCardClick(item._id)}
              >
                <div className="hero-img-container">
                  <img src={item.imageUrl} alt="Hero Preview" />
                </div>
                <div className="hero-card-text">
                  <h3>{item.headline}</h3>
                  <p>{item.subHeadline}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSectionAdmin;
