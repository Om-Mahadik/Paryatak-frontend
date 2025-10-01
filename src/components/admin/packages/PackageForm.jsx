import React from "react";
import "./PackageForm.css";

const PackageForm = ({ formData, handleChange }) => {
  return (
    <div className="package-form">
      <h2>Package Details</h2>

      {/* Title */}
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter package title"
        />
      </div>

      {/* Short Description */}
      <div className="form-group">
        <label htmlFor="description">Short Description</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter a short description"
        />
      </div>

      {/* Long Description */}
      <div className="form-group">
        <label htmlFor="longDescription">Long Description</label>
        <textarea
          id="longDescription"
          name="longDescription"
          rows="6"
          value={formData.longDescription}
          onChange={handleChange}
          placeholder="Detailed description about this package..."
        />
      </div>

      {/* Price */}
      <div className="form-group">
        <label htmlFor="price">Price (₹)</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
        />
      </div>

      {/* Duration */}
      <div className="form-group">
        <label htmlFor="duration">Duration (days)</label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Enter duration in days"
        />
      </div>

      {/* Category */}
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g. Adventure, Family, Honeymoon"
        />
      </div>
    </div>
  );
};

export default PackageForm;
