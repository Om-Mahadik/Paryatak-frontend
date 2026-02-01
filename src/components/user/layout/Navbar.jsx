import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../imgs/logo.png";
import menuIcon from "../../../imgs/icons/menu.svg";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  // Function to handle link click
  const handleLinkClick = () => {
    if (isOpen) setIsOpen(false); // Close mobile menu if open
  };

  return (
    <nav className={`navbar ${isHomePage ? "navbar-home" : "navbar-dark"}`}>
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Navigation links */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
        <li><Link to="/packages" onClick={handleLinkClick}>Packages</Link></li>
        <li><Link to="/gallery" onClick={handleLinkClick}>Gallery</Link></li>
        <li><Link to="/blogs" onClick={handleLinkClick}>Blogs</Link></li>
        <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
        {/* Contact as last nav item in mobile menu */}
        <li className="mobile-contact-btn">
          <Link to="/contact" onClick={handleLinkClick}>Contact Us</Link>
        </li>
      </ul>

      {/* Desktop Contact Button */}
      <Link to="/contact" className="contact-btn-layout">Contact Us</Link>

      {/* Mobile menu icon */}
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        <img src={menuIcon} alt="Menu" />
      </div>
    </nav>
  );
};

export default Navbar;
