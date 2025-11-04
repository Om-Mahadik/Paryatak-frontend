import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Popup from "..//Popup/Popup"; // ✅ import Popup
import AccessButton from "../Popup/AccessButton"; // ✅ import AccessButton

import FloatingBalloon from "./FloatingBalloon"; // ✅ import FloatingBalloon

import "./UserLayout.css";

import { logVisit } from "../../../services/visitService"; 


const UserLayout = ({ children }) => {

  useEffect(() => {
    logVisit(); // logs a visit whenever this layout mounts
  }, []);


  return (
    <>
      <Navbar />      
      <FloatingBalloon />
      <main>{children}</main>  
      <Footer />      
      {/* Site-wide popup */}
      <Popup />
      <AccessButton link="https://wa.me/918999428110" />
      
    </>
  );
};

export default UserLayout;
