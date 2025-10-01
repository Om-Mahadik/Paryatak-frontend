import React from "react";
import ItineraryItem from "./ItineraryItem";

const ItineraryTab = ({ itinerary }) => {
  if (!itinerary) return null;

  const sortedItinerary = [...itinerary].sort(
    (a, b) => parseInt(a.day) - parseInt(b.day)
  );

  return (
    <div className="itinerary-tab">
      {sortedItinerary.map((item, idx) => (
        <ItineraryItem
          key={idx}
          day={`Day ${item.day}`}
          title={item.title}
          description={item.description}
          photo={item.photo}
        />
      ))}
    </div>
  );
};

export default ItineraryTab;
