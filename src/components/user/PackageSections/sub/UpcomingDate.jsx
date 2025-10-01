import React from "react";
import "./UpcomingDate.css";
import bigArrow from "../../../../imgs/icons/bigarrow.svg"; // adjust path

const UpcomingDate = ({ start, end }) => {
  const startParts = start.split(" "); // ["4", "Oct", "2025"]
  const endParts = end.split(" ");     // ["9", "Oct", "2025"]

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
