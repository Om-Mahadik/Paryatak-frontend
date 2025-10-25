import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";
import "./Layout.css";

const Layout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update sidebar state on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSidebarOpen(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);           // Firebase logout
      navigate("/admin/login");      // Redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="admin-layout">
      <Sidebar
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        toggleSidebar={toggleSidebar}
      />

      <div
        className="main-content"
        style={{ marginLeft: isSidebarOpen && !isMobile ? 220 : 0 }}
      >
        <Topbar
          onLogout={handleLogout}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="content">
          <Outlet /> {/* Only this area scrolls */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
