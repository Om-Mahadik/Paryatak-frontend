import React, { useEffect, useState, useRef } from "react";
import "./Popup.css";
import popupImg from "../../../imgs/home/popup.jpg";
import { sendPopupDataToSheet } from "../../../services/popupService";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const reopenTimeout = useRef(null);

  useEffect(() => {
    const submitted = localStorage.getItem("popupSubmitted");
    const closedTime = localStorage.getItem("popupClosedTime");
    const now = new Date().getTime();

    if (submitted === "true") return; // never show again if submitted

    const initialTimer = setTimeout(() => {
      if (!closedTime || now - parseInt(closedTime) > 15 * 60 * 1000) {
        setIsOpen(true);
      }
    }, 15000);

    return () => {
      clearTimeout(initialTimer);
      if (reopenTimeout.current) clearTimeout(reopenTimeout.current);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("popupClosedTime", new Date().getTime());

    reopenTimeout.current = setTimeout(() => {
      const submitted = localStorage.getItem("popupSubmitted");
      if (submitted !== "true") setIsOpen(true);
    }, 15 * 60 * 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const phone = e.target[1].value;
  
    await sendPopupDataToSheet({ name, phone }); // send to sheet
  
    localStorage.setItem("popupSubmitted", "true");
    setIsOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-container">
        <button className="popup-close" onClick={handleClose}>
          ✕
        </button>

        <div className="popup-left">
          <h2 className="popup-title">Let’s Stay Connected</h2>
          <p className="popup-subline">
            Discover fresh ideas, insights, and updates curated just for you.
          </p>

          <form className="popup-form" onSubmit={handleSubmit}>
            <label>
              <input type="text" placeholder="Enter Your Name Here" required />
            </label>
            <label>
              <input type="text" placeholder="Enter Your Phone Here" required />
            </label>
            <button type="submit" className="popup-submit">
              Submit
            </button>
          </form>
        </div>

        <div className="popup-right">
          <img src={popupImg} alt="Popup Visual" className="popup-image" />
        </div>
      </div>
    </div>
  );
};

export default Popup;
