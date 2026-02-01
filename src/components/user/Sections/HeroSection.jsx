import React, { useEffect, useState } from "react";
import "./HeroSection.css";
import arrowIcon from "../../../imgs/icons/arrow.svg";
import { getHeroSections } from "../../../services/heroSectionService";

const HeroSection = () => {
  const [contents, setContents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [isCrossfading, setIsCrossfading] = useState(false);

  // ✅ Fetch hero content from backend
  useEffect(() => {
    const fetchHeroSections = async () => {
      try {
        const data = await getHeroSections();
        if (Array.isArray(data)) {
          setContents(data);
        } else if (data) {
          setContents([data]); 
        }
      } catch (error) {
        console.error("Error fetching hero sections:", error);
      }
    };
    fetchHeroSections();
  }, []);

  // ⏳ Crossfade logic
  useEffect(() => {
    if (contents.length <= 1) return;

    const interval = setInterval(() => {
      const next = (currentIndex + 1) % contents.length;
      setNextIndex(next);
      setIsCrossfading(true);

      setTimeout(() => {
        setCurrentIndex(next);
        setNextIndex(null);
        setIsCrossfading(false);
      }, 1500); // Matches the CSS transition duration
    }, 9000);

    return () => clearInterval(interval);
  }, [contents, currentIndex]);

  const handleAction = (item) => {
    if (!item) return;
    if (item.buttonLink?.startsWith("http")) {
      window.open(item.buttonLink, "_blank");
    } else {
      // Smooth scroll to next section
      window.scrollBy({
        top: window.innerHeight * 0.8, // Adjust based on your hero height
        left: 0,
        behavior: "smooth",
      });
    }
  };

  if (contents.length === 0) return null;

  const currentItem = contents[currentIndex];
  const nextItem = nextIndex !== null ? contents[nextIndex] : null;

  const SlideContent = ({ item, type }) => (
    <div className={`hero-slide ${type}`}>
      <img src={item.imageUrl} alt="Travel Destination" className="hero-image" />
      <div className="hero-text">
        <h1 style={{ color: item.headlineColor || "#ffffff" }}>
          {item.headline}
        </h1>
        <p
          className="hero-subheadline"
          style={{ color: item.subHeadlineColor || "#dddddd" }}
        >
          {item.subHeadline}
        </p>
        <div className="hero-btn-wrapper">
          <button className="hero-btn">
            {item.buttonText || "Explore Now"} 
            <img src={arrowIcon} alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section 
      className="hero" 
      onClick={() => handleAction(currentItem)}
      title="Click to explore"
    >
      {/* Current Active Slide */}
      <SlideContent item={currentItem} type="current" />

      {/* Next Slide (incoming during crossfade) */}
      {isCrossfading && nextItem && (
        <SlideContent item={nextItem} type="next" />
      )}
      
      {/* Bottom Indicator (Optional UI Polish) */}
      <div className="hero-indicator-bar">
        {contents.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === currentIndex ? "active" : ""}`} 
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;