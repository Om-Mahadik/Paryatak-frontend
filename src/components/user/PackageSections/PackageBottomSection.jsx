import React, { useState, useEffect } from "react";
import OverviewTab from "./sub/OverviewTab";
import ItineraryTab from "./sub/ItineraryTab";
import GalleryTab from "./sub/GalleryTab";
import TermsTab from "./sub/TermsTab";
import "./PackageBottomSection.css";

const PackageBottomSection = ({ data }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const tabs = ["Overview", "Itinerary", "Gallery", "Terms"];

  const handleTabClick = (tab, e) => {
    setActiveTab(tab);

    // Move the underline
    const target = e.target;
    setUnderlineStyle({ left: target.offsetLeft, width: target.offsetWidth });
  };

  useEffect(() => {
    // Set initial underline position on mount
    const activeBtn = document.querySelector(".tab-btn.active");
    if (activeBtn) {
      setUnderlineStyle({ left: activeBtn.offsetLeft, width: activeBtn.offsetWidth });
    }
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <OverviewTab
            description={data.overview}
            highlights={data.highlights}
            inclusions={data.inclusions}
            groupDates={data.groupDates}
            brochure={data.brochure}
            reviews={data.reviews}
          />
        );
      case "Itinerary":
        return <ItineraryTab itinerary={data.itinerary} />;
      case "Gallery":
        return <GalleryTab gallery={data.galleryImages} />;
      case "Terms":
        return <TermsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="package-bottom-section">
      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={(e) => handleTabClick(tab, e)}
          >
            {tab}
          </button>
        ))}

        {/* Sliding underline */}
        <span
          className="tab-underline"
          style={{ left: underlineStyle.left, width: underlineStyle.width }}
        ></span>
      </div>

      {/* Tab Content with fade animation */}
      <div className="tab-content fade-in">{renderTabContent()}</div>
    </div>
  );
};

export default PackageBottomSection;
