import React from "react";
import "./PackageHeadDetails.css";

// icons
import pinIcon from "../../../../imgs/icons/pin.svg";
import starIcon from "../../../../imgs/icons/star.svg";
import phoneIcon from "../../../../imgs/icons/phone.svg";
import whatsappIcon from "../../../../imgs/icons/whatsapp.svg";

const PackageHeadDetails = ({ data }) => {
  const { title, country, days, nights, rating, groupDates } = data;

  // Filter upcoming dates (startDate >= tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const upcomingDates = groupDates?.filter(
    (d) => new Date(d.startDate) >= tomorrow
  );

  // Get the next upcoming tour
  const nextTour = upcomingDates?.length > 0 ? upcomingDates[0] : null;

  const nextTourDate = nextTour
    ? `${new Date(nextTour.startDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })} to ${new Date(nextTour.endDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}`
    : "Dates Coming Soon";

  const phoneNumber = "8999428110";
  const countryCode = "91";

  const waMessage = encodeURIComponent(
    `Hello, I am interested in the ${title} package. Please provide more details.`
  );
  const waLink = `https://wa.me/${countryCode}${phoneNumber}?text=${waMessage}`;

  const handleCall = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      navigator.clipboard.writeText(phoneNumber).then(() => {
        alert(`Phone number ${phoneNumber} copied to clipboard!`);
      });
    }
  };

  return (
    <div className="details-wrapper">
      <h1 className="package-title">{title}</h1>

      <p className="package-country">
        <img src={pinIcon} alt="Location" className="icon" />
        {country}
      </p>

      <div className="ratings">
        {Array.from({ length: rating.stars }).map((_, i) => (
          <img key={i} src={starIcon} alt="star" className="star-icon" />
        ))}
        <span className="rating-text">({rating.reviews} reviews)</span>
      </div>

      <div className="info-block">
        <p className="label">Duration: </p>
        <p className="value">
          {nights} Nights {days} Days
        </p>
      </div>

      <div className="info-block">
        <p className="label">Next Tour Date: </p>
        <p className="value">{nextTourDate}</p>
      </div>

      <div className="buttons">
        <button className="btn enquire-btn" onClick={handleCall}>
          <img src={phoneIcon} alt="phone" className="btn-icon" />
          Enquire Now
        </button>

        <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn wp-btn">
          <img src={whatsappIcon} alt="whatsapp" className="btn-icon" />
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default PackageHeadDetails;
