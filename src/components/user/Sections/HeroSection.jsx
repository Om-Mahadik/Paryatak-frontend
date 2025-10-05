import React from "react";
import "./HeroSection.css"; // keeps it modular
import heroImg from "../../../imgs/home/hero.jpg";
import arrowIcon from "../../../imgs/icons/arrow.svg";

const HeroSection = () => {

  const handleScroll = () => {
    // Scroll down by one full viewport height
    window.scrollBy({
      top: window.innerHeight, // full height of current viewport
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="hero">
      <img src={heroImg} alt="Hero" className="hero-image" />

      <div className="hero-text">
        <h1>
          Best Place to find <br />
          Your <strong>Inner Peace</strong>
        </h1>
        <p className="hero-subheadline">
          Feeling relaxed? Connect with us to plan your journey and explore the world!
        </p>

        <button className="hero-btn" onClick={handleScroll}>
          Explore <img src={arrowIcon} alt="arrow" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
