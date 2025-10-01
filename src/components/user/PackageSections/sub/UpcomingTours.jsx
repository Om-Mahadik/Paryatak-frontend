import React from "react";
import "./UpcomingTours.css";
import UpcomingDate from "./UpcomingDate"; // import your component

// Pastel colors for pills
const pastelColors = [
  "#FFD8D8", // pink
  "#D8F0FF", // light blue
  "#D8FFD8", // light green
  "#FFF0D8", // light orange
  "#F0D8FF", // light purple
  "#D8FFF0", // mint
];

const UpcomingTours = ({ dates }) => {
  if (!dates || dates.length === 0) return null;

  // Helper to format date as "D MMM YYYY"
  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = dateObj.getDate();
    const monthShort = dateObj.toLocaleString("default", { month: "short" });
    const year = dateObj.getFullYear();
    return `${day} ${monthShort} ${year}`;
  };

  return (
    <div className="upcoming-tours-section">
      <h3>Upcoming Group Departures</h3>

      {/* First date as UpcomingDate */}
      <div className="upcoming-date-left">
        <UpcomingDate
          start={formatDate(dates[0].start)}
          end={formatDate(dates[0].end)}
        />
      </div>

      {/* Display all dates normally */}
      <ul>
        {dates.map((d, idx) => {
          const startDate = new Date(d.start);
          const monthShort = startDate.toLocaleString("default", { month: "short" });
          const color = pastelColors[idx % pastelColors.length];

          return (
            <li key={idx}>
              <span className="month-pill" style={{ backgroundColor: color }}>
                {monthShort}
              </span>
              <span className="tour-text">
                {d.group} : {formatDate(d.start)} to {formatDate(d.end)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UpcomingTours;
