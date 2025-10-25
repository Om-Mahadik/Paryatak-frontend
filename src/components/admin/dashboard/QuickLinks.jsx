import React from "react";
import QuickLinkCard from "./QuickLinkCard"; 
import "./QuickLinks.css";

// Import SVG icons
import WhatsAppIcon from "../../../imgs/icons/whatsapp.svg";
import GmailIcon from "../../../imgs/icons/email.svg";
import InstagramIcon from "../../../imgs/icons/instagram.svg";
import FacebookIcon from "../../../imgs/icons/facebook.svg";
import AdsManagerIcon from "../../../imgs/icons/ads-manager.svg";
import GeminiIcon from "../../../imgs/icons/gemini.svg"; // replacing ChatGPT
import GoogleAdsIcon from "../../../imgs/icons/google-ads.svg";
import CanvaIcon from "../../../imgs/icons/canva.svg";
import SheetsIcon from "../../../imgs/icons/sheet.svg";

const QuickLinks = () => {
  const links = [
    { title: "WhatsApp", icon: WhatsAppIcon, link: "https://wa.me/your-number" },
    { title: "Gmail", icon: GmailIcon, link: "mailto:your-email@gmail.com" },
    { title: "Instagram", icon: InstagramIcon, link: "https://instagram.com/your-page" },
    { title: "Facebook", icon: FacebookIcon, link: "https://facebook.com/your-page" },
    { title: "Ads Manager", icon: AdsManagerIcon, link: "https://business.facebook.com/adsmanager" },
    { title: "Gemini", icon: GeminiIcon, link: "https://gemini.com/" },
    { title: "Google Ads", icon: GoogleAdsIcon, link: "https://ads.google.com/" },
    { title: "Canva", icon: CanvaIcon, link: "https://www.canva.com/" },
    { title: "Sheets", icon: SheetsIcon, link: "https://sheets.google.com/" },
  ];

  return (
    <section className="dashboard-block quick-links">
      <h3>Quick Links</h3>
      <div className="quick-links-row">
          {links.map((link, idx) => (
            <QuickLinkCard key={idx} {...link} />
          ))}
        </div>
      
    </section>
  );
};

export default QuickLinks;
