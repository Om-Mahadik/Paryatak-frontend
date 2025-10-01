import React from "react";
import "./TermsContent.css";

const TermsContent = () => {
  return (
    <div className="terms-content">
      <p>
        1. <strong>Booking and Payment:</strong> A booking is confirmed only after full payment is received. Prices are subject to change until the booking is confirmed.
      </p>
      <p>
        2. <strong>Cancellation Policy:</strong> Cancellations must be notified in writing. Refunds will be made according to the following:
        <br />- More than 30 days before departure: 90% refund
        <br />- 15-30 days: 50% refund
        <br />- Less than 15 days: No refund
      </p>
      <p>
        3. <strong>Travel Documents:</strong> Travelers are responsible for having valid passports, visas, and other travel documents.
      </p>
      <p>
        4. <strong>Health & Safety:</strong> Travelers must meet health requirements. The operator is not liable for personal injuries or loss.
      </p>
      <p>
        5. <strong>Changes to Itinerary:</strong> The operator reserves the right to make necessary changes due to weather, local conditions, or unforeseen circumstances.
      </p>
      <p>
        6. <strong>Liability:</strong> The operator acts as an agent and is not responsible for delays, injuries, or accidents beyond its control.
      </p>
      <p>
        7. <strong>Travel Insurance:</strong> Comprehensive travel insurance is highly recommended.
      </p>
      <p>
        8. <strong>Force Majeure:</strong> The operator is not liable for events beyond its control including natural disasters, strikes, or political unrest.
      </p>
      <p>
        9. <strong>Photography and Media:</strong> Travelers agree to allow photos or videos for promotional purposes.
      </p>
      <p>
        10. <strong>Governing Law:</strong> All bookings are governed by the laws of the country where the operator is registered.
      </p>
    </div>
  );
};

export default TermsContent;
