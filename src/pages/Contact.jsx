import React from "react";
import ContactForm from "../components/user/contact/ContactForm";
import ContactInfo from "../components/user/contact/ContactInfo";
import FAQSection from "../components/user/contact/FAQSection";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Heading */}
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p className="subline">We’d love to hear from you! Reach out with any questions.</p>
      </div>

      {/* Two Columns */}
      <div className="contact-container">
        <ContactForm />
        <ContactInfo />
      </div>

      <FAQSection />
    </div>
  );
};

export default Contact;
