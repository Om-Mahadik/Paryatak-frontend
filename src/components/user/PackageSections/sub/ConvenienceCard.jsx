import React from "react";
import "./ConvenienceCard.css";
import TickIcon from "../../../../imgs/icons/tick.svg";
import DownloadIcon from "../../../../imgs/icons/download.svg";
import UpcomingDate from "./UpcomingDate"; // adjust path

const ConvenienceCard = ({ nextTour, brochureLink }) => {
  if (!nextTour) return null;

  // Static 6 lines example
  const conveniencePoints = [
    "Round trip airfare included",
    "5-star accommodation",
    "Daily breakfast provided",
    "Sightseeing tours with transfers",
    "Travel insurance covered",
    "Professional tour guide",
  ];

  // Helper to format date as "D MMM YYYY"
  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = dateObj.getDate();
    const monthShort = dateObj.toLocaleString("default", { month: "short" });
    const year = dateObj.getFullYear();
    return `${day} ${monthShort} ${year}`;
  };

  return (
    <div className="convenience-card">
      {/* Next Tour Date */}
      <div className="next-tour">
        <h3>Upcoming</h3>
        <div className="next-tour-date">
          <UpcomingDate
            start={formatDate(nextTour.start)}
            end={formatDate(nextTour.end)}
          />
        </div>
      </div>

      {/* Contact Us Button */}
      <button className="btn-contact">Contact Us</button>

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
      <a
        href={brochureLink}
        download="Dubai_Package_Brochure.pdf" // default file name
        className="btn-download"
      >
        <img src={DownloadIcon} alt="Download" className="download-icon" />
        Download Brochure
      </a>
            
    </div>
  );
};

export default ConvenienceCard;
