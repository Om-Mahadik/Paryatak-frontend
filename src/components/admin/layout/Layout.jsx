import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./Layout.css";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/admin"); // redirect to login
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar onLogout={handleLogout} />
        <main className="content">
          <Outlet /> {/* Dashboard, Blogs, Packages will render here */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
