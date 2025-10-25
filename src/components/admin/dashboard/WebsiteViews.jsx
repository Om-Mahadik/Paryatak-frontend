import React, { useEffect, useState } from "react";
import { Eye, Calendar, BarChart2, Activity } from "lucide-react";
import { getVisitStats } from "../../../services/visitService"; // adjust path as needed
import "./WebsiteViews.css";

const WebsiteViews = () => {
  const [visitors, setVisitors] = useState({
    liveCount: 0,
    todayCount: 0,
    weekCount: 0,
    monthCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getVisitStats();
      setVisitors(data);
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { title: "Live Visitors", value: visitors.liveCount, icon: <Eye size={22} /> },
    { title: "Today", value: visitors.todayCount, icon: <Calendar size={22} /> },
    { title: "This Week", value: visitors.weekCount, icon: <BarChart2 size={22} /> },
    { title: "This Month", value: visitors.monthCount, icon: <Activity size={22} /> },
  ];

  return (
    <section className="dashboard-block website-views">
      <h3>Website Overview</h3>
      <div className="views-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            {stat.icon}
            <h4>{stat.title}</h4>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WebsiteViews;
