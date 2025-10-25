import React from "react";
import { useNavigate } from "react-router-dom";
import "./ConvenienceCard.css";
import TickIcon from "../../../../imgs/icons/tick.svg";
import DownloadIcon from "../../../../imgs/icons/download.svg";
import UpcomingDate from "./UpcomingDate";

const ConvenienceCard = ({ dates, brochureLink }) => {
  const navigate = useNavigate();

  if (!dates || dates.length === 0) return null;

  // Only consider upcoming dates (startDate >= tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const upcomingDates = dates.filter(d => new Date(d.startDate) >= tomorrow);
  if (upcomingDates.length === 0) return null;

  const conveniencePoints = [
    "Round trip airfare included",
    "5-star accommodation",
    "Daily breakfast provided",
    "Sightseeing tours with transfers",
    "Travel insurance covered",
    "Professional tour guide",
  ];

  // Opens brochure in a new tab
  const handleDownload = () => {
    if (!brochureLink) {
      alert("Brochure link not available");
      return;
    }
    window.open(brochureLink, "_blank", "noopener,noreferrer");
  };

  // Navigate to contact page
  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <div className="convenience-card">
      {/* Next Tour Date */}
      <div className="next-tour">
        <h3>Upcoming</h3>
        <div className="next-tour-date">
          {/* Pass all upcoming dates, but UpcomingDate will pick first automatically */}
          <UpcomingDate dates={upcomingDates} />
        </div>
      </div>

      {/* Contact Us Button */}
      <button className="btn-contact" onClick={handleContact}>
        Contact Us
      </button>

      {/* Convenience Points */}
      <ul className="convenience-points">
        {conveniencePoints.map((point, idx) => (
          <li key={idx}>
            <img src={TickIcon} alt="Tick" className="tick-icon" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {/* Download Brochure */}
      <button className="btn-download" onClick={handleDownload}>
        <img src={DownloadIcon} alt="Download" className="download-icon" />
        Download Brochure
      </button>
    </div>
  );
};

export default ConvenienceCard;
