import React from "react";
import "./ContactInfo.css";

import logoDark from "../../../imgs/logo-dark.png";
import emailIcon from "../../../imgs/icons/email.svg";
import phoneIcon from "../../../imgs/icons/phone.svg";
import webIcon from "../../../imgs/icons/web.svg";
import whatsappIcon from "../../../imgs/icons/whatsapp.svg";
import instagramIcon from "../../../imgs/icons/instagram.svg";
import linkedinIcon from "../../../imgs/icons/linkedin.svg";

const ContactInfo = () => {
  return (
    <div className="contact-card">
      {/* Logo */}
      <img src={logoDark} alt="Logo" className="contact-logo" />

      {/* Subline */}
      <p className="contact-subline">
        We’re here to help and answer any question you might have.
      </p>

      {/* Contact items with pastel pill background */}
      <a href="mailto:info@goparyatak.com" className="contact-item email-pill">
        <img src={emailIcon} alt="Email" />
        <span>info@goparyatak.com</span>
      </a>

      <a href="tel:+917841805093" className="contact-item phone-pill">
        <img src={phoneIcon} alt="Phone" />
        <span>+91 78418 05093</span>
      </a>

      <a href="https://www.goparyatak.com" target="_blank" rel="noreferrer" className="contact-item web-pill">
        <img src={webIcon} alt="Website" />
        <span>www.goparyatak.com</span>
      </a>

      {/* Social links */}
      <div className="social-links">
        <a href="https://wa.me/917841805093" target="_blank" rel="noreferrer">
          <img src={whatsappIcon} alt="WhatsApp" />
        </a>
        <a href="https://instagram.com/goparyatak" target="_blank" rel="noreferrer">
          <img src={instagramIcon} alt="Instagram" />
        </a>
        <a href="https://linkedin.com/company/goparyatak" target="_blank" rel="noreferrer">
          <img src={linkedinIcon} alt="LinkedIn" />
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;
