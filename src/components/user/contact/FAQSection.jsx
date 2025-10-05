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
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Our cancellation policy depends on the package and time of cancellation. Full details will be shared at booking."
    },
    {
      question: "Are flights included in the packages?",
      answer:
        "Flights are not always included by default. However, we can book them for you as part of a customized package."
    },
    {
      question: "Do you provide visa assistance?",
      answer:
        "Yes, we guide you through the visa process and provide all necessary documentation support."
    },
    {
      question: "Are your packages suitable for families with kids?",
      answer:
        "Absolutely! We offer family-friendly itineraries with activities for both kids and adults."
    },
    {
      question: "What safety measures do you follow?",
      answer:
        "Your safety is our top priority. We work only with trusted partners, verified hotels, and experienced guides."
    },
    {
      question: "Can I travel solo with your packages?",
      answer:
        "Yes, solo travelers are welcome! We offer special packages and support for solo adventurers."
    },
    {
      question: "Do you arrange group tours?",
      answer:
        "Yes, we organize both fixed-date group tours and private group packages for families, friends, and corporate teams."
    },
    {
      question: "How early should I book my trip?",
      answer:
        "We recommend booking at least 2–3 months in advance to get the best deals and secure availability."
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
