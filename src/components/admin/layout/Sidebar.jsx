import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import logo from "../../../imgs/logo.png";
import dashboardIcon from "../../../imgs/icons/dashboard.svg";
import packagesIcon from "../../../imgs/icons/packages.svg";
import blogsIcon from "../../../imgs/icons/blogs.svg";
import popupsIcon from "../../../imgs/icons/popups.svg";
import contactsIcon from "../../../imgs/icons/contacts.svg";
import reviewsIcon from "../../../imgs/icons/reviews.svg";

const Sidebar = ({ isOpen, isMobile, toggleSidebar }) => {
  const links = [
    { to: "/admin/dashboard", icon: dashboardIcon, label: "Dashboard" },
    { to: "/admin/packages", icon: packagesIcon, label: "Packages" },
    { to: "/admin/blogs", icon: blogsIcon, label: "Blogs" },
    { to: "/admin/popups", icon: popupsIcon, label: "Popups" },
    { to: "/admin/contacts", icon: contactsIcon, label: "Contacts" },
    { to: "/admin/reviews", icon: reviewsIcon, label: "Reviews" },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        {isMobile && (
          <button className="menu-toggle" onClick={toggleSidebar}>☰</button>
        )}
      </div>

      <nav className="sidebar-nav">
        <ul>
          {links.map(({ to, icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => (isActive ? "active-link" : "")}
                onClick={() => isMobile && toggleSidebar()}
              >
                <img src={icon} alt={label} className="icon" />
                <span className="label">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
