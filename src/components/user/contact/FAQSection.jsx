// src/components/user/contact/FAQSection.jsx
import React from "react";
import FAQItem from "./FAQItem";
import "./FAQSection.css";

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I book a trip?",
      answer:
        "Simply reach out to us via the contact form, WhatsApp, or phone. We’ll handle everything else."
    },
    {
      question: "Can I customize my itinerary?",
      answer:
        "Yes! Our experts will tailor your itinerary according to your preferences."
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit/debit cards, UPI, and online payments for your convenience."
    },
    {
      question: "Do you provide travel insurance?",
      answer:
        "Yes, travel insurance is available on request and can be included in your package."
    }
  ];

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-heading">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isDefaultOpen={index === 0} // first FAQ open by default
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
