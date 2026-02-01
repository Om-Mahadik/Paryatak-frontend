import React from "react";
import { Link } from 'react-router-dom';
import "./AboutUs.css";

const AboutUs = () => {
  const services = [
    { icon: "🌍", title: "Destinations", desc: "Curated itineraries for India's hidden gems." },
    { icon: "🧭", title: "Local Guidance", desc: "Expert travel tips and navigation advice." },
    { icon: "🏨", title: "Stays & Food", desc: "Handpicked recommendations for every budget." },
    { icon: "📸", title: "Inspiration", desc: "Visual stories for your next big adventure." }
  ];

  return (
    <section className="about-container">
      {/* 1. Hero Section */}
      <div className="about-hero">
        <span className="badge">Welcome to Hello Paryatak</span>
        <h1>Your Trusted <span>Travel Companion</span></h1>
        <p>
          Discovering India, one journey at a time. We make your travel 
          joyful, authentic, and completely stress-free.
        </p>
      </div>

      {/* 2. Content Grid */}
      <div className="about-content">
        <div className="about-card intro-card">
          <h2>Who We Are</h2>
          <p>
            <strong>Hello Paryatak</strong> was created with a simple mission —
            to help travelers explore beautiful destinations without confusion,
            stress, or hidden surprises. 
          </p>
          <p>
            Whether you're planning a peaceful getaway or an adventurous trip, 
            we guide you with reliable information and local insights.
          </p>
        </div>

        {/* 3. Services (Nice & Professional Addition) */}
        <div className="services-wrapper">
           <h2>What We Do</h2>
           <div className="services-grid">
              {services.map((s, i) => (
                <div key={i} className="service-item">
                  <span className="s-icon">{s.icon}</span>
                  <div>
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>

      </div>

      {/* 5. Footer CTA */}
      {/* 5. Footer CTA */}
      <div className="about-footer">
        <h3>Let’s Explore Together ✨</h3>
        <p>Wherever you go, let <strong>Hello Paryatak</strong> be a part of your journey.</p>
        
        {/* Updated to Link for internal routing */}
        <Link to="/packages">
          <button className="cta-btn">Start Your Journey</button>
        </Link>
      </div>
    </section>
  );
};

export default AboutUs;