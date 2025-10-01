import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Popup from "..//Popup/Popup"; // ✅ import Popup
import AccessButton from "../Popup/AccessButton"; // ✅ import AccessButton
import "./UserLayout.css";

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />      
      <main>{children}</main>  
      <Footer />      
      {/* Site-wide popup */}
      <Popup />
      <AccessButton link="https://wa.me/917841805093" />
    </>
  );
};

export default UserLayout;
