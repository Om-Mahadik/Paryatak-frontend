import React from "react";
import "./HeroSection.css"; // keeps it modular
import heroImg from "../../../imgs/home/hero.jpg";
import arrowIcon from "../../../imgs/icons/arrow.svg";

const HeroSection = () => {
  return (
    <section className="hero">
      <img src={heroImg} alt="Hero" className="hero-image" />

      <div className="hero-text">
        <h1>
          Best Place to find <br />
          <strong>Your Inner Peace</strong>
        </h1>
        <p className="hero-subheadline">
          Feeling Relax? Connect with us to find & plan your journey to Explore the World!
        </p>

        <button className="hero-btn">
          Explore <img src={arrowIcon} alt="arrow" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
