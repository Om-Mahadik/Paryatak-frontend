import React, { useState } from "react";
import "./MobileNavbar.css";

const MobileNavbar = ({ toggleSidebar }) => {
  return (
    <header className="mobile-navbar">
      <div className="logo">
        <img src="/imgs/logo.png" alt="Logo" />
      </div>
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>
    </header>
  );
};

export default MobileNavbar;
