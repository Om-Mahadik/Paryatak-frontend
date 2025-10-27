import React, { useEffect, useState } from "react";
import "./Contacts.css";
import {
  getContacts,
  deleteContact,
  markContactAsRead,
} from "../../services/contactService";
import DeleteIcon from "../../imgs/icons/delete.svg";
import PhoneIcon from "../../imgs/icons/phone.svg";
import WhatsAppIcon from "../../imgs/icons/whatsapp.svg";
import CopyIcon from "../../imgs/icons/copy.svg";
import MessageIcon from "../../imgs/icons/message.svg";
import EmailIcon from "../../imgs/icons/email.svg";
import PlusIcon from "../../imgs/icons/plus.svg";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [toast, setToast] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const data = await getContacts();
    setContacts(data);
    // Expand first item by default
    if (data.length > 0) setExpanded(data[0]._id);
  };

  const handleDelete = async (id) => {
    await deleteContact(id);
    setConfirmDelete(null);
    setToast({ message: "Contact deleted successfully!", type: "success" });
    fetchContacts();
    setTimeout(() => setToast(null), 2500);
  };

  const handleMarkRead = async (id, readStatus) => {
    await markContactAsRead(id, !readStatus);
    fetchContacts();
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
        <h2>Contact Submissions</h2>
        <button
          className="sheet-btn"
          onClick={() =>
            window.open(
              "https://docs.google.com/spreadsheets/d/18fLdJwRXnov8QbaE6KRWPLm1R9BP6_rd5uTJa723Dfs/edit?gid=0#gid=0",
              "_blank"
            )
          }
        >
          Open Sheet
        </button>
      </div>

      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`admin-contact-card ${
            !contact.isRead ? "unread" : ""
          }`}
        >
          {/* Header */}
          <div
            className="contact-header"
            onClick={() => toggleExpand(contact._id)}
          >
            <div className="contact-info">
              <h3>
                {contact.firstName} {contact.lastName}
              </h3>
              <p>{formatDate(contact.createdAt)}</p>
            </div>
            <div className="popup-toggle">
              <img
                src={PlusIcon}
                alt="Toggle"
                className={expanded === contact._id ? "rotated" : ""}
              />
            </div>
          </div>

          {/* Drawer */}
          <div
            className={`contact-drawer ${
              expanded === contact._id ? "expanded" : ""
            }`}
          >
            {/* Message Section */}
            <p className="contact-message">Message: <br/><br/>{contact.message}</p>

            {/* Mark as Read Button */}
            <button
              className="popup-pill-btn mark-read"
              onClick={() => handleMarkRead(contact._id, contact.isRead)}
            >
              {contact.isRead ? "Mark Unread" : "Mark Read"}
            </button>

            {/* Info Section */}
            <div className="contact-info-section">
              <div className="contact-info-item">
                <span>Email: {contact.email}</span>
                <button
                  className="icon-btn"
                  onClick={() => handleCopy(contact.email, "Email")}
                  title="Copy Email"
                >
                  <img src={CopyIcon} alt="Copy" />
                </button>
              </div>
              <div className="contact-info-item">
                <span>Phone: {contact.phone}</span>
                <button
                  className="icon-btn"
                  onClick={() => handleCopy(contact.phone, "Phone")}
                  title="Copy Phone"
                >
                  <img src={CopyIcon} alt="Copy" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="contact-drawer-bottom">
              <button
                className="contact-drawer-btn"
                onClick={() => handleCall(contact.phone)}
              >
                <img src={PhoneIcon} alt="Call" /> Call
              </button>

              <button
                className="contact-drawer-btn"
                onClick={() => handleMessage(contact.phone)}
              >
                <img src={MessageIcon} alt="Message" /> Message
              </button>

              <button
                className="contact-drawer-btn"
                onClick={() => handleWhatsApp(contact.phone)}
              >
                <img src={WhatsAppIcon} alt="WhatsApp" /> WhatsApp
              </button>

              <button
                className="contact-drawer-btn"
                onClick={() => handleEmail(contact.email)}
              >
                <img src={EmailIcon} alt="Email" /> Email
              </button>

              <button
                className="icon-btn delete"
                onClick={() => setConfirmDelete(contact._id)}
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
      {toast && <div className={`custom-toast ${toast.type}`}>{toast.message}</div>}
    </div>
  );
};

export default Contacts;
