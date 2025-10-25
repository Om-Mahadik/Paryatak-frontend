import React from "react";
import "./DashboardHeader.css";

const DashboardHeader = ({ userName = "there" }) => {
  const initial = userName ? userName[0].toUpperCase() : "U";

  // Get IST time
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000; // convert local to UTC
  const istOffset = 5.5 * 60 * 60000; // IST is UTC +5:30
  const istTime = new Date(utc + istOffset);
  const hour = istTime.getHours();

  // Determine greeting
  let greeting = "Hello";
  if (hour >= 5 && hour < 12) greeting = "Good Morning";
  else if (hour >= 12 && hour < 16) greeting = "Good Afternoon";
  else if (hour >= 16 && hour < 20) greeting = "Good Evening";
  else greeting = "Good Night";

  return (
    <div className="dashboard-welcome-wrapper">
      <div className="dashboard-welcome">
        <h1>
          {greeting}, {userName}! <span role="img" aria-label="wave">👋</span>
        </h1>
        <p>Here’s what’s happening with your website today.</p>
      </div>
      <div className="dashboard-avatar">{initial}</div>
    </div>
  );
};

export default DashboardHeader;
