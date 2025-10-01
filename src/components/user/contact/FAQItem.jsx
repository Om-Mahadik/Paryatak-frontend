// src/components/user/contact/FAQItem.jsx
import React, { useState } from "react";
import plusIcon from "../../../imgs/icons/plus.svg"; // adjust path if needed
import "./FAQItem.css";

const FAQItem = ({ question, answer, isDefaultOpen }) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen || false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`} onClick={toggleOpen}>
      <div className="faq-question">
        <span>{question}</span>
        <img
          src={plusIcon}
          alt="toggle"
          className={`faq-toggle ${isOpen ? "rotated" : ""}`}
        />
      </div>
      <div className="faq-answer">{answer}</div>
    </div>
  );
};

export default FAQItem;
