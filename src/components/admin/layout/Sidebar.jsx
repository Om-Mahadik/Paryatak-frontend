import React from "react";
import { NavLink } from "react-router-dom";
import "./Layout.css";

const Sidebar = () => (
  <aside className="sidebar">
    <h2>Paryatak Admin</h2>
    <nav>
      <ul>
        <li><NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "active-link" : ""}>Dashboard</NavLink></li>
        <li><NavLink to="/admin/packages" className={({ isActive }) => isActive ? "active-link" : ""}>Packages</NavLink></li>
        <li><NavLink to="/admin/blogs" className={({ isActive }) => isActive ? "active-link" : ""}>Blogs</NavLink></li>
        <li><NavLink to="/admin/users" className={({ isActive }) => isActive ? "active-link" : ""}>Users</NavLink></li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
