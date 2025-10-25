import React from "react";
import "./Topbar.css";

import adminIcon from "../../../imgs/icons/admin.svg";
import logoutIcon from "../../../imgs/icons/logout.svg";

const Topbar = ({ onLogout, toggleSidebar, isSidebarOpen }) => {
  const today = new Date();
  const dayNumber = today.getDate();
  const month = today.toLocaleString("default", { month: "short" });
  const year = today.getFullYear();
  const dayName = today.toLocaleString("default", { weekday: "long" });

  return (
    <header className="topbar">
      {/* Hamburger for mobile */}
      <button className="hamburger-btn" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Date container */}
      <div className="date-container">
        <div className="day-number">{dayNumber}</div>
        <div className="month-year">
          <div className="month">{month}</div>
          <div className="year">{year}</div>
        </div>
        <div className="weekday">{dayName}</div>
      </div>

      {/* Actions */}
      <div className="topbar-actions">
        <div className="pill admin-pill">
          <img src={adminIcon} alt="Admin" className="pill-icon" />
          <span>Admin</span>
        </div>

        <button className="pill logout-pill" onClick={onLogout}>
          <img src={logoutIcon} alt="Logout" className="pill-icon" />
          <span className="logout-text">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
