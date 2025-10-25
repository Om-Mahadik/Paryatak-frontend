import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuickActionCard.css";

const QuickActionCard = ({ title, icon: Icon, link, color }) => {
  const navigate = useNavigate();

  return (
    <button
      className="quick-action-card"
      style={{ background: color || "linear-gradient(135deg, #2563eb, #38bdf8)" }}
      onClick={() => navigate(link)}
    >
      <Icon size={18} color="#000000ff" />
      <span>{title}</span>
    </button>
  );
};

export default QuickActionCard;
