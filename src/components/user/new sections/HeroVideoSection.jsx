import React from 'react';
import './HeroVideoSection.css';
import heroVideo from '../../../imgs/herovideo.mp4';

const HeroVideoSection = () => {
  return (
    <section className="hp-hero-section">
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        className="hp-hero-video"
      />
      <div className="hp-hero-content">
        <h1 className="hp-hero-title">
          Travel the World <br /> with Us!
        </h1>
        <p className="hp-hero-subtitle">
          Your ultimate travel guide to unforgettable journeys
        </p>
        <a href="#services" className="hp-hero-button">
          Plan Your Trip
        </a>
      </div>
    </section>
  );
};

export default HeroVideoSection;
