import React, { useEffect, useState } from "react";
import {
  Eye,
  Calendar,
  BarChart2,
  Activity,
  MessageSquare,
  Star,
  PlusCircle,
  FileText,
  Box,
  Database,
  Cloud,
  Server,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getVisitStats } from "../../services/visitService"; // import service
import "./Dashboard.css";

import DashboardHeader from "../../components/admin/dashboard/DashboardHeader";
import TodaysActivity from "../../components/admin/dashboard/TodaysActivity";
import QuickActions from "../../components/admin/dashboard/QuickActions";
import SystemInsights from "../../components/admin/dashboard/SystemInsights";
import QuickLinks from "../../components/admin/dashboard/QuickLinks";
import WebsiteViews from "../../components/admin/dashboard/WebsiteViews";
import ReviewLink from "../../components/admin/dashboard/ReviewLink";


const Dashboard = () => {
  // State for visitors
  const [visitors, setVisitors] = useState({
    liveCount: 0,
    todayCount: 0,
    weekCount: 0,
    monthCount: 0,
  });

  // Fetch stats on mount + every 5 sec
  useEffect(() => {
    const fetchStats = async () => {
      const data = await getVisitStats();
      setVisitors(data);
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  const viewsData = [
    { day: "Mon", views: 120 },
    { day: "Tue", views: 180 },
    { day: "Wed", views: 150 },
    { day: "Thu", views: 220 },
    { day: "Fri", views: 300 },
    { day: "Sat", views: 250 },
    { day: "Sun", views: 270 },
  ];

  return (
    <div className="dashboard">

      {/* Main 2-column layout */}
      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="left-column">
          <DashboardHeader userName="Priyanka" />
          <WebsiteViews />
          {/* Chart */}
          <section className="dashboard-block">
            <h3>Traffic Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </section>
          

          {/* System Insights */}
          <SystemInsights />

        </div>

        {/* Right Column */}
        <div className="right-column">

          <TodaysActivity />
          <ReviewLink />
          <QuickActions />
          <QuickLinks />

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
