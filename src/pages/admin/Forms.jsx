import React, { useEffect, useState } from "react";
import "./Contacts.css"; // Reuse same styles
import {
  getAllCustomPackages,
  markPackageAsRead,
  markPackageAsUnread,
  deleteCustomPackage,
} from "../../services/customPackageService";
import DeleteIcon from "../../imgs/icons/delete.svg";
import PhoneIcon from "../../imgs/icons/phone.svg";
import WhatsAppIcon from "../../imgs/icons/whatsapp.svg";
import CopyIcon from "../../imgs/icons/copy.svg";
import MessageIcon from "../../imgs/icons/message.svg";
import EmailIcon from "../../imgs/icons/email.svg";
import PlusIcon from "../../imgs/icons/plus.svg";

const Forms = () => {
  const [forms, setForms] = useState([]);
  const [toast, setToast] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  // ✅ Modified fetchForms to preserve expanded state
  const fetchForms = async (keepExpandedId = null) => {
    try {
      const data = await getAllCustomPackages();
      setForms(data);

      // Keep the same expanded item open if still exists
      if (keepExpandedId && data.some((f) => f._id === keepExpandedId)) {
        setExpanded(keepExpandedId);
      } else if (data.length > 0 && expanded === null) {
        setExpanded(data[0]._id);
      } else if (data.length === 0) {
        setExpanded(null);
      }
    } catch (err) {
      console.error("Error fetching forms:", err);
    }
  };

  const handleDelete = async (id) => {
    await deleteCustomPackage(id);
    setConfirmDelete(null);
    setToast({ message: "Form deleted successfully!", type: "success" });
    fetchForms(); // no need to keep expanded since deleted
    setTimeout(() => setToast(null), 2500);
  };

  const handleMarkRead = async (id, isRead) => {
    if (isRead) await markPackageAsUnread(id);
    else await markPackageAsRead(id);
    fetchForms(id); // ✅ keep the same one expanded
  };

  const handleCopy = (text, label) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.top = "-1000px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setToast({ message: `${label} Copied!`, type: "success" });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error("Copy failed:", err);
      setToast({ message: `Failed to copy ${label}`, type: "error" });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleCall = (number) => window.open(`tel:${number}`, "_blank");
  const handleMessage = (number) => window.open(`sms:${number}`, "_blank");
  const handleWhatsApp = (number) =>
    window.open(`https://wa.me/${number}`, "_blank");
  const handleEmail = (email) => window.open(`mailto:${email}`, "_blank");

  const toggleExpand = (id) => setExpanded(expanded === id ? null : id);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return d.toLocaleDateString("en-GB", options);
  };

  return (
    <div className="admin-contacts-container">
      <div className="contacts-header">
        <h2>Custom Package Requests</h2>
      </div>

      {forms.map((form) => (
        <div
          key={form._id}
          className={`admin-contact-card ${!form.isRead ? "unread" : ""}`}
        >
          {/* Header */}
          <div className="contact-header" onClick={() => toggleExpand(form._id)}>
            <div className="contact-info">
              <h3>{form.name}</h3>
              <p>
                {form.destination} — {formatDate(form.createdAt)}
              </p>
            </div>
            <div className="popup-toggle">
              <img
                src={PlusIcon}
                alt="Toggle"
                className={expanded === form._id ? "rotated" : ""}
              />
            </div>
          </div>

          {/* Drawer */}
          <div
            className={`contact-drawer ${
              expanded === form._id ? "expanded" : ""
            }`}
          >
            <div className="contact-message">
              <strong>Message:</strong>
              <br />
              <br />
              {form.message || "—"}
            </div>

            <button
              className="popup-pill-btn mark-read"
              onClick={() => handleMarkRead(form._id, form.isRead)}
            >
              {form.isRead ? "Mark Unread" : "Mark Read"}
            </button>

            {/* Package Info */}
            <div className="contact-info-section">
              <div className="contact-info-item">
                <span>Destination:</span> {form.destination}
              </div>
              <div className="contact-info-item">
                <span>Adults:</span> {form.adults} | <span>Children:</span>{" "}
                {form.children}
              </div>
              <div className="contact-info-item">
                <span>Duration:</span> {form.duration}
              </div>
              <div className="contact-info-item">
                <span>Start Date:</span> {formatDate(form.startDate)}
              </div>
              <div className="contact-info-item">
                <span>Email: {form.email || "—"}</span>
                {form.email && (
                  <button
                    className="icon-btn"
                    onClick={() => handleCopy(form.email, "Email")}
                    title="Copy Email"
                  >
                    <img src={CopyIcon} alt="Copy" />
                  </button>
                )}
              </div>
              <div className="contact-info-item">
                <span>Phone: {form.phone}</span>
                <button
                  className="icon-btn"
                  onClick={() => handleCopy(form.phone, "Phone")}
                  title="Copy Phone"
                >
                  <img src={CopyIcon} alt="Copy" />
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="contact-drawer-bottom">
              <button
                className="contact-drawer-btn"
                onClick={() => handleCall(form.phone)}
              >
                <img src={PhoneIcon} alt="Call" /> Call
              </button>

              <button
                className="contact-drawer-btn"
                onClick={() => handleMessage(form.phone)}
              >
                <img src={MessageIcon} alt="Message" /> Message
              </button>

              <button
                className="contact-drawer-btn"
                onClick={() => handleWhatsApp(form.phone)}
              >
                <img src={WhatsAppIcon} alt="WhatsApp" /> WhatsApp
              </button>

              {form.email && (
                <button
                  className="contact-drawer-btn"
                  onClick={() => handleEmail(form.email)}
                >
                  <img src={EmailIcon} alt="Email" /> Email
                </button>
              )}

              <button
                className="icon-btn delete"
                onClick={() => setConfirmDelete(form._id)}
              >
                <img src={DeleteIcon} alt="Delete" />
              </button>
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

      {/* Toast */}
      {toast && (
        <div className={`custom-toast ${toast.type}`}>{toast.message}</div>
      )}
    </div>
  );
};

export default Forms;
