import React, { useEffect, useState } from "react";
import { Server, Database, Clock } from "lucide-react";
import axios from "axios";
import "./SystemInsights.css";

const SystemInsights = () => {
  const [databaseStatus, setDatabaseStatus] = useState("Checking...");
  const [backupTime, setBackupTime] = useState("");

  // Check if database is responding
  const checkDatabase = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API_BASE_URL}`);
      setDatabaseStatus("Synced");
    } catch (err) {
      setDatabaseStatus("Issue");
    }
  };

  // Calculate backup time
  const calculateBackup = () => {
    const now = new Date();
    const backupHour = 2; // 2 AM fixed backup
    const backupDate = new Date();
    backupDate.setHours(backupHour, 0, 0, 0);
    if (now < backupDate) backupDate.setDate(backupDate.getDate() - 1);
    const diffHours = Math.floor((now - backupDate) / (1000 * 60 * 60));
    setBackupTime(`${diffHours} hr ago`);
  };

  useEffect(() => {
    checkDatabase();
    calculateBackup();

    const interval = setInterval(() => {
      checkDatabase();
      calculateBackup();
    }, 30000); // refresh every 30s

    return () => clearInterval(interval);
  }, []);

  const insights = [
    { title: "Server", value: "Online", icon: Server },
    { title: "Database", value: databaseStatus, icon: Database },
    { title: "Backup", value: backupTime, icon: Clock },
  ];

  return (
    <section className="dashboard-block system-insights">
      <h3>System Insights</h3>
      <div className="insight-grid">
        {insights.map((insight, idx) => {
          const Icon = insight.icon;
          return (
            <div key={idx} className="insight-card">
              <div className="insight-left">
                <Icon size={18} className="insight-icon" />
                <span className="insight-title">{insight.title}:</span>
              </div>
              <div className="insight-value">{insight.value}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SystemInsights;
