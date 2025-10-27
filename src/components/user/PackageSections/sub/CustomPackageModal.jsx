import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  X,
  Users,
  Baby,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  List,
} from "lucide-react";
import "./CustomPackageModal.css";

const CustomPackageModal = ({ destination, onClose }) => {
  const [formData, setFormData] = useState({
    destination: destination || "",
    adults: "",
    children: "",
    duration: "",
    startDate: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        adults: Number(formData.adults),
        children: Number(formData.children),
        duration: String(formData.duration),
      };

      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/custom-packages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        alert("🎉 Your custom trip request has been sent successfully!");
        onClose();
      } else {
        alert("⚠️ Unable to submit. Please try again later.");
      }
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalContent = (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <button className="close-btn" onClick={onClose}>
          <X size={22} />
        </button>

        <h2 className="modal-title">Customize Your Trip</h2>
        <p className="modal-desc">
          Tell us a few details about your journey to{" "}
          <strong>{destination}</strong> — and we'll craft the perfect package
          for you.
        </p>

        <form onSubmit={handleSubmit} className="custom-form">
          <div className="form-group">
            <label>Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              readOnly
            />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>
                <Users size={18} className="icon" /> Adults
              </label>
              <input
                type="number"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="form-group half">
              <label>
                <Baby size={18} className="icon" /> Children
              </label>
              <input
                type="number"
                name="children"
                value={formData.children}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              <Clock size={18} className="icon" /> Trip Duration (Days)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <Calendar size={18} className="icon" /> Preferred Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <User size={18} className="icon" /> Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <Mail size={18} className="icon" /> Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <Phone size={18} className="icon" /> Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <List size={18} className="icon" /> Travel Preferences / Special
              Requests
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about your travel style, hotel type, meals, or special requirements..."
            ></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default CustomPackageModal;
