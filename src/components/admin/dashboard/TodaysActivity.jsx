import React, { useEffect, useState } from "react";
import { Bell, Send, Star, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getTodaysActivity } from "../../../services/activityService";
import "./TodaysActivity.css";

const TodaysActivity = () => {
  const navigate = useNavigate();

  // ✅ State matching backend keys
  const [activity, setActivity] = useState({
    popupsSubmitted: 0,
    peopleContacted: 0,
    reviewsReceived: 0,
  });

  // Fetch activity data every 10 seconds
  useEffect(() => {
    const fetchActivity = async () => {
      const data = await getTodaysActivity();
      setActivity(data);
    };

    fetchActivity();
    const interval = setInterval(fetchActivity, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  // Map activities for display
  const activities = [
    { 
      icon: <Bell size={20} />, 
      label: "Popups Submitted", 
      count: activity.popupsSubmitted, 
      link: "/admin/popups" 
    },
    { 
      icon: <Send size={20} />, 
      label: "People Contacted", 
      count: activity.peopleContacted, 
      link: "/admin/contacts" 
    },
    { 
      icon: <Star size={20} />, 
      label: "Reviews Received", 
      count: activity.reviewsReceived, 
      link: "/admin/reviews" 
    },
  ];

  return (
    <section className="dashboard-block todays-activity">
      <h3>Today’s Activity</h3>
      <div className="todays-activity-list">
        {activities.map((item, index) => (
          <div
            className="activity-row"
            key={index}
            onClick={() => navigate(item.link)}
          >
            <div className="activity-left">
              <div className="activity-icon">{item.icon}</div>
              <div className="activity-info">
                <h4>{item.count}</h4>
                <p>{item.label}</p>
              </div>
            </div>
            <ChevronRight className="activity-arrow" size={20} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodaysActivity;
