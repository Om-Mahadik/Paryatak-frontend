import React from "react";

const RefundPolicy = () => {
  return (
    <div style={{ padding: "40px", paddingTop: "120px", maxWidth: "900px", margin: "0 auto", fontFamily: "DM Sans, sans-serif", lineHeight: "1.7", color: "#333" }}>
      <h1>Refund Policy</h1>
      <p>Last updated: October 2025</p>

      <h2>1. General Policy</h2>
      <p>HelloParyatak is committed to customer satisfaction. Refunds are provided under specific circumstances, as outlined below.</p>

      <h2>2. Cancellation by Customer</h2>
      <ul>
        <li>Cancellations made 15 days prior to the tour start date are eligible for a full refund minus payment gateway fees.</li>
        <li>Cancellations made within 7-14 days of the tour start date will receive a 50% refund.</li>
        <li>No refunds for cancellations made less than 7 days before the tour.</li>
      </ul>

      <h2>3. Cancellation by HelloParyatak</h2>
      <p>In case HelloParyatak cancels a tour due to unforeseen circumstances, customers are eligible for a 100% refund or rescheduling option.</p>

      <h2>4. Process</h2>
      <p>Refund requests must be submitted via email to <a href="mailto:info@helloparyatak.com">info@helloparyatak.com</a> with booking details. Refunds are processed within 7-10 business days.</p>

      <h2>5. Exceptions</h2>
      <p>No refunds for non-attendance, voluntary cancellation without notice, or missed tours due to personal reasons.</p>

      <h2>6. Contact</h2>
      <p>For refund-related queries, reach out to us at <a href="mailto:info@helloparyatak.com">info@helloparyatak.com</a>.</p>
    </div>
  );
};

export default RefundPolicy;
