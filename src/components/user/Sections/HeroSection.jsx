import React, { useEffect, useState } from "react";
import "./HeroSection.css";
import arrowIcon from "../../../imgs/icons/arrow.svg";
import { getHeroSections } from "../../../services/heroSectionService"; // adjust path if needed

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
        if (Array.isArray(data)) setContents(data);
        else if (data) setContents([data]); // fallback if single object
      } catch (error) {
        console.error("Error fetching hero sections:", error);
      }
    };
    fetchHeroSections();
  }, []);

  // ⏳ Crossfade every 8 seconds
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
      }, 1000); // duration of crossfade
    }, 8000);

    return () => clearInterval(interval);
  }, [contents, currentIndex]);

  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const current = contents[currentIndex] || {};
  const next = nextIndex !== null ? contents[nextIndex] : null;

  const renderContent = (item) => (
    <>
      <img src={item.imageUrl} alt="Hero" className="hero-image" />
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
        <button
          className="hero-btn"
          onClick={() =>
            item.buttonLink?.startsWith("http")
              ? (window.location.href = item.buttonLink)
              : handleScroll()
          }
        >
          {item.buttonText} <img src={arrowIcon} alt="arrow" />
        </button>
      </div>
    </>
  );

  return (
    <section className="hero">
      <div className="hero-slide current">{renderContent(current)}</div>
      {isCrossfading && next && (
        <div className="hero-slide next">{renderContent(next)}</div>
      )}
    </section>
  );
};

export default HeroSection;
