import React, { useState } from "react";
import "./ContactForm.css";
import { sendContactFormToSheet } from "../../../services/contactService";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const result = await sendContactFormToSheet(formData);

    setLoading(false);
    if (result) {
      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="contact-form">
      <form onSubmit={handleSubmit}>
        {/* First Row */}
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="+91 1234567890"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* Message */}
        <div className="form-group">
          <label>Message</label>
          <textarea
            rows="5"
            name="message"
            placeholder="Write your message..."
            required
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Sending..." : "Submit"}
        </button>

        {/* Success Message */}
        {success && <p className="success-msg">Message sent successfully!</p>}
      </form>
    </div>
  );
};

export default ContactForm;
