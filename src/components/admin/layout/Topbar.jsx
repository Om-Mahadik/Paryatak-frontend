import React from "react";

const Topbar = ({ onLogout }) => (
  <header className="topbar">
    <h3>Admin Panel</h3>
    <div>
      <button onClick={onLogout}>Logout</button>
    </div>
  </header>
);

export default Topbar;
