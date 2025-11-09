import React, { useEffect, useState } from "react";
import "./StatsSection.css";

const StatsSection = () => {
  const statsData = [
    { value: 68, label: "Destinations Explored", suffix: "+" },
    { value: 35, label: "Trips Completed", suffix: "+" },
    { value: 800, label: "Happy Travelers", suffix: "+" },
    { value: 98, label: "Satisfaction Rate", suffix: "%" }, // ✅ percent instead of plus
  ];

  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const duration = 1500;
    const interval = 20;
    const steps = duration / interval;

    statsData.forEach((stat, i) => {
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easedProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[i] = Math.floor(stat.value * easedProgress);
          return newCounts;
        });
        if (currentStep >= steps) clearInterval(timer);
      }, interval);
    });
  }, []);

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-text">
          <h2>Our Stats</h2>
          <p>We help you to unleash the power within your business.</p>
        </div>

        <div className="stats-grid">
          {statsData.map((stat, i) => (
            <div key={i} className="stat-item">
              <h3>
                {counts[i]}
                <span className="plus">{stat.suffix}</span>
              </h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
