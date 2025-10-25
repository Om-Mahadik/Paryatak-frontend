import React from "react";
import "./UpcomingDate.css";
import bigArrow from "../../../../imgs/icons/bigarrow.svg"; // adjust path

const UpcomingDate = ({ dates }) => {
  if (!dates || dates.length === 0) return null;

  // Take first date only
  const nextDate = dates[0];

  const formatDateParts = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = dateObj.getDate();
    const monthShort = dateObj.toLocaleString("default", { month: "short" });
    const year = dateObj.getFullYear();
    return [day, monthShort, year];
  };

  const startParts = formatDateParts(nextDate.startDate);
  const endParts = formatDateParts(nextDate.endDate);

  return (
    <div className="upcoming-date-wrapper">
      <div className="date-pill">
        {/* Start Date */}
        <div className="date-part">
          <div className="date-big">{startParts[0]}</div>
          <div className="month-year-right">
            <span className="month">{startParts[1]}</span>
            <span className="year">{startParts[2]}</span>
          </div>
        </div>

        {/* Arrow */}
        <img src={bigArrow} alt="arrow" className="date-arrow" />

        {/* End Date */}
        <div className="date-part">
          <div className="date-big">{endParts[0]}</div>
          <div className="month-year-right">
            <span className="month">{endParts[1]}</span>
            <span className="year">{endParts[2]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingDate;
