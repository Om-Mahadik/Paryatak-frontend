import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import deleteIcon from "../../imgs/icons/delete.svg";
import {
  getHeroSections,
  addHeroSection,
  updateHeroSection,
  deleteHeroSection,
} from "../../services/heroSectionService";
import "./HeroSectionSetup.css";

const HeroSectionSetup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrl: "",
    headline: "",
    subHeadline: "",
    buttonText: "",
    buttonLink: "",
    headlineColor: "#000000",
    subHeadlineColor: "#555555",
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const [confirmPopup, setConfirmPopup] = useState({ show: false });

  useEffect(() => {
    const fetchSection = async () => {
      if (id && id !== "new") {
        try {
          const data = await getHeroSections();
          const section = data.find((item) => item._id === id);
          if (section) {
            setFormData({
              imageUrl: section.imageUrl,
              headline: section.headline,
              subHeadline: section.subHeadline,
              buttonText: section.buttonText,
              buttonLink: section.buttonLink,
              headlineColor: section.headlineColor || "#000000",
              subHeadlineColor: section.subHeadlineColor || "#555555",
            });
          }
        } catch (err) {
          console.error("Error fetching hero section:", err);
        }
      }
    };
    fetchSection();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (id && id !== "new") {
        await updateHeroSection(id, formData, token);
        setPopup({ show: true, message: "Section Updated Successfully!", type: "success" });
      } else {
        await addHeroSection(formData, token);
        setPopup({ show: true, message: "New Section Created Successfully!", type: "success" });
      }
      setTimeout(() => navigate("/admin/hero-section"), 1200);
    } catch (err) {
      console.error("Error saving hero section:", err);
      setPopup({ show: true, message: "Failed to save section!", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => setConfirmPopup({ show: true });

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await deleteHeroSection(id, token);
      setConfirmPopup({ show: false });
      setPopup({ show: true, message: "Section Deleted Successfully!", type: "success" });
      setTimeout(() => navigate("/admin/hero-section"), 1200);
    } catch (err) {
      console.error("Error deleting hero section:", err);
      setPopup({ show: true, message: "Delete failed!", type: "error" });
    }
  };

  return (
    <div className="hero-setup-page">
      <div className="hero-setup-header">
        <h2>{id === "new" ? "Add New Hero Section" : "Edit Hero Section"}</h2>
        <button className="cancel-btn" onClick={() => navigate("/admin/hero-section")}>
          Back
        </button>
      </div>

      <form className="hero-setup-form" onSubmit={handleSave}>
        <label>Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          required
        />

        {formData.imageUrl && (
          <div className="preview">
            <div className="image-preview-wrapper">
              <img src={formData.imageUrl} alt="Preview" className="preview-image" />
              <div className="image-text-overlay">
                <h3 style={{ color: formData.headlineColor }}>{formData.headline}</h3>
                <p style={{ color: formData.subHeadlineColor }}>{formData.subHeadline}</p>
              </div>
            </div>
          </div>
        )}

        <label>Headline</label>
        <input
          type="text"
          name="headline"
          value={formData.headline}
          onChange={handleChange}
          placeholder="Enter main headline"
          required
        />

        <div className="color-field">
          <label>
            Headline Color
            <span
              className="color-preview-circle"
              style={{ backgroundColor: formData.headlineColor }}
            ></span>
          </label>
          <input
            type="color"
            name="headlineColor"
            value={formData.headlineColor}
            onChange={handleChange}
          />
        </div>

        <label>Sub Headline</label>
        <input
          type="text"
          name="subHeadline"
          value={formData.subHeadline}
          onChange={handleChange}
          placeholder="Enter sub headline"
          required
        />

        <div className="color-field">
          <label>
            Subheadline Color
            <span
              className="color-preview-circle"
              style={{ backgroundColor: formData.subHeadlineColor }}
            ></span>
          </label>
          <input
            type="color"
            name="subHeadlineColor"
            value={formData.subHeadlineColor}
            onChange={handleChange}
          />
        </div>

        <label>Button Text</label>
        <input
          type="text"
          name="buttonText"
          value={formData.buttonText}
          onChange={handleChange}
          placeholder="e.g. Explore Now"
          required
        />

        <label>Button Link</label>
        <input
          type="text"
          name="buttonLink"
          value={formData.buttonLink}
          onChange={handleChange}
          placeholder="/explore"
          required
        />

        <div className="form-buttons">
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Saving..." : id === "new" ? "Create New" : "Save Changes"}
          </button>

          {id !== "new" && (
            <button type="button" className="deletee-btn" onClick={handleDeleteClick} disabled={loading}>
              <img src={deleteIcon} alt="Delete" className="delete-icon" />
            </button>
          )}
        </div>
      </form>

      {confirmPopup.show && (
        <div className="confirm-popup">
          <div className="confirm-box">
            <p>Are you sure you want to delete this section?</p>
            <div className="confirm-actions">
              <button className="confirm-yes" onClick={confirmDelete}>Yes, Delete</button>
              <button className="confirm-no" onClick={() => setConfirmPopup({ show: false })}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {popup.show && (
        <div className={`custom-popup ${popup.type}`}>
          <p>{popup.message}</p>
          <button onClick={() => setPopup({ show: false })}>OK</button>
        </div>
      )}
    </div>
  );
};

export default HeroSectionSetup;
