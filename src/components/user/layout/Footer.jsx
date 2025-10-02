import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../imgs/logo.png";
import emailIcon from "../../../imgs/icons/email-white.svg";
import phoneIcon from "../../../imgs/icons/phone-white.svg";
import instagramIcon from "../../../imgs/icons/instagram.svg";
import whatsappIcon from "../../../imgs/icons/whatsapp.svg";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={logo} alt="HelloParyatak Logo" className="footer-logo" />
        <p className="footer-desc">
          HelloParyatak is your trusted travel companion. We provide curated, hassle-free tours and unforgettable experiences.
        </p>

        <ul className="footer-contact">
          <li>
            <img src={emailIcon} alt="Email" />
            <a href="mailto:travelsparyatak@gmail.com">travelsparyatak@gmail.com</a>
          </li>
          <li>
            <img src={phoneIcon} alt="Phone" />
            <a href="tel:+917841805093">+91 89994 28110</a>
          </li>
        </ul>

        <div className="footer-social">
          <a href="https://wa.me/918999428110" target="_blank" rel="noreferrer">
            <img src={whatsappIcon} alt="WhatsApp" />
          </a>
          <a href="https://instagram.com/helloparyatak" target="_blank" rel="noreferrer">
            <img src={instagramIcon} alt="Instagram" />
          </a>
        </div>
      </div>

      <div className="footer-right">
        <div className="footer-links-wrapper">
          <div className="footer-nav-block">
            <h4>Navigation</h4>
            <ul className="footer-nav">
              <li><button onClick={() => handleNavClick("/")}>Home</button></li>
              <li><button onClick={() => handleNavClick("/packages")}>Packages</button></li>
              <li><button onClick={() => handleNavClick("/gallery")}>Gallery</button></li>
              <li><button onClick={() => handleNavClick("/blogs")}>Blogs</button></li>
              <li><button onClick={() => handleNavClick("/contact")}>Contact</button></li>
            </ul>
          </div>
          <div className="footer-legal-block">
            <h4>Legal</h4>
            <ul className="footer-legal">
              <li><button onClick={() => handleNavClick("/legal/privacy-policy")}>Privacy Policy</button></li>
              <li><button onClick={() => handleNavClick("/legal/terms-conditions")}>Terms & Conditions</button></li>
              <li><button onClick={() => handleNavClick("/legal/refund-policy")}>Refund Policy</button></li>
              <li><button onClick={() => handleNavClick("/legal/disclaimer")}>Disclaimer</button></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 HelloParyatak. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
