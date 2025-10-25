import React from "react";
import "./OverviewTab.css";

import Description from "./Description";
import Highlights from "./Highlights";
import Inclusions from "./Inclusions";
import UpcomingTours from "./UpcomingTours";
import Features from "./Features";
import ConvenienceCard from "./ConvenienceCard";
import Reviews from "./Reviews";

const OverviewTab = ({ description, highlights, inclusions, groupDates, brochure, reviews }) => {
  // Format the next tour date as a string
  const nextTour = groupDates && groupDates.length > 0 ? groupDates[0] : null;

  return (
    <div className="overview-tab">
      {/* Left Column 60% */}
      <div className="overview-left">

        <Description text={description} />
        <Features />
        <UpcomingTours dates={groupDates} />
        
        <Highlights title="Highlights" items={highlights} />
        <Inclusions title="What's Included" items={inclusions} />
      </div>

      {/* Right Column 40% */}
      <div className="overview-right">
        <ConvenienceCard dates={groupDates} brochureLink={brochure} />
        <Reviews reviews={reviews} />
      </div>
    </div>
  );
};

export default OverviewTab;
