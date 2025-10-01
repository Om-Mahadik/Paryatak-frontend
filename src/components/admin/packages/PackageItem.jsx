import React from "react";
import { useNavigate } from "react-router-dom";

const PackageItem = ({ pkg }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/packages/${pkg._id}`); // navigate to edit page
  };

  return (
    <div
      onClick={handleClick}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        width: "250px",
        cursor: "pointer",
        transition: "0.2s",
      }}
    >
      <img
        src={pkg.thumbnail}
        alt={pkg.title}
        style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }}
      />
      <h3>{pkg.title}</h3>
      <p>{pkg.description}</p>
      <p>Price: ₹{pkg.price}</p>
      <p>Category: {pkg.category}</p>
      <p>Duration: {pkg.duration}</p>
    </div>
  );
};

export default PackageItem;
