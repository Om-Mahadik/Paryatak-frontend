import React, { useEffect, useState } from "react";
import "./Popups.css";
import {
  getPopups,
  deletePopup,
  markPopupAsRead,
} from "../../services/popupService";
import DeleteIcon from "../../imgs/icons/delete.svg";
import PhoneIcon from "../../imgs/icons/phone.svg";
import WhatsAppIcon from "../../imgs/icons/whatsapp.svg";
import CopyIcon from "../../imgs/icons/copy.svg";
import MessageIcon from "../../imgs/icons/message.svg";
import SheetIcon from "../../imgs/icons/sheet.svg";
import PlusIcon from "../../imgs/icons/plus.svg";

const Popups = () => {
  const [popups, setPopups] = useState([]);
  const [toast, setToast] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchPopups();
  }, []);

  const fetchPopups = async () => {
    const data = await getPopups();
    setPopups(data);
  };

  const handleDelete = async (id) => {
    await deletePopup(id);
    setConfirmDelete(null);
  
    // Show custom toast
    setToast({ 
      message: "Popup deleted successfully!", 
      type: "success" // green background
    });
  
    fetchPopups();
  
    // Clear toast after 2.5s
    setTimeout(() => setToast(null), 2500);
  };
  

  const handleMarkRead = async (id, readStatus) => {
    await markPopupAsRead(id, !readStatus);
    fetchPopups();
  };

  const handleCopy = (number) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(number);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = number;
        textArea.style.position = "fixed";
        textArea.style.top = "-1000px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
  
      // ✅ Show custom alert
      setToast({ message: "Phone Number Copied to Clipboard", type: "success" });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Copy failed:", err);
      setToast({ message: "Failed to Copy Number", type: "error" });
      setTimeout(() => setToast(null), 3000);
    }
  };
  


  const handleMessage = (number) => {
    window.open(`sms:${number}`, "_blank");
  };

  const handleCall = (number) => {
    window.open(`tel:${number}`, "_blank");
  };

  const handleWhatsApp = (number) => {
    window.open(`https://wa.me/${number}`, "_blank");
  };

  const toggleExpand = (id) => setExpanded(expanded === id ? null : id);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return d.toLocaleDateString("en-GB", options);
  };

  return (
    <div className="admin-popups-container">
      {/* Header */}
      <div className="popups-header">
        <h2>Popup Submissions</h2>
        <button
          className="popup-pill-btn sheet-btn"
          onClick={() =>
            window.open(
              "https://docs.google.com/spreadsheets/d/1Aw8cZxQahHKl79g_wCEIWWZ6XTw5lyoNMXf4t6WIa0M/edit?gid=0#gid=0",
              "_blank"
            )
          }
        >
          <img src={SheetIcon} alt="Sheet" /> Open Sheet
        </button>
      </div>

      {/* List */}
      {popups.map((popup) => (
        <div
          key={popup._id}
          className={`popup-card ${!popup.isRead ? "unread" : ""}`}
        >
          <div className="popup-header" onClick={() => toggleExpand(popup._id)}>
            <div className="popup-info">
              <h3 className="popup-name">{popup.name}</h3>
              <p className="popup-date">{formatDate(popup.createdAt)}</p>
            </div>
            <div className="popup-toggle">
              <img
                src={PlusIcon}
                alt="Toggle"
                className={expanded === popup._id ? "rotated" : ""}
              />
            </div>
          </div>

          {/* Expanded Drawer */}
          <div
            className={`popup-drawer ${expanded === popup._id ? "expanded" : ""}`}
          >
            <div className="popup-drawer-top">
              <div className="popup-phone-section">
                <span className="popup-phone-label">Phone: {popup.phone}</span>
                <button
                  className="icon-btn"
                  onClick={() => handleCopy(popup.phone)}
                  title="Copy number"
                >
                  <img src={CopyIcon} alt="Copy" />
                </button>
              </div>

              <div className="popup-drawer-actions">
                <button
                  className="popup-pill-btn mark-read"
                  onClick={() => handleMarkRead(popup._id, popup.isRead)}
                >
                  {popup.isRead ? "Mark Unread" : "Mark Read"}
                </button>
              </div>
            </div>


            <div className="popup-drawer-bottom">
              <div className="popup-drawer-left">
                <button
                  className="popup-drawer-btn"
                  onClick={() => handleCall(popup.phone)}
                >
                  <img src={PhoneIcon} alt="Call" /> Call
                </button>

                <button
                  className="popup-drawer-btn"
                  onClick={() => handleMessage(popup.phone)}
                >
                  <img src={MessageIcon} alt="Message" /> Message
                </button>

                <button
                  className="popup-drawer-btn"
                  onClick={() => handleWhatsApp(popup.phone)}
                >
                  <img src={WhatsAppIcon} alt="WhatsApp" /> WhatsApp
                </button>
              </div>

              <div className="popup-drawer-right">
                <button
                  className="icon-btn delete"
                  onClick={() => setConfirmDelete(popup._id)}
                  title="Delete"
                >
                  <img src={DeleteIcon} alt="Delete" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <p>Are you sure you want to delete this entry?</p>
            <div className="modal-actions">
              <button
                className="popup-pill-btn danger"
                onClick={() => handleDelete(confirmDelete)}
              >
                Yes, Delete
              </button>
              <button
                className="popup-pill-btn"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`custom-toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
      
    </div>
  );
};

export default Popups;
