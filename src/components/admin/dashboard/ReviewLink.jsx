import React, { useState } from "react";
import { ArrowRight, Copy, Share2 } from "lucide-react";
import "./ReviewLink.css";

const ReviewLink = () => {
  const [name, setName] = useState("");
  const [reviewLink, setReviewLink] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");

  const generateLink = () => {
    // Use empty string if name is blank
    const finalName = name.trim() || "";
    const generatedLink = `${window.location.origin}/reviews/${encodeURIComponent(finalName)}`;
    setReviewLink(generatedLink);
    showMessage("Review link generated successfully!");
  };
  

  const copyLink = async () => {
    if (!reviewLink) return showMessage("Generate link first!");
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(reviewLink);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = reviewLink;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      showMessage("Link copied!");
    } catch {
      showMessage("Failed to copy link.");
    }
  };

  const shareLink = async () => {
    if (!reviewLink) return showMessage("Generate link first!");

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Share Review Link",
          text: "Please share your experience with us!",
          url: reviewLink,
        });
        showMessage("Link shared successfully!");
      } catch {
        showMessage("Share cancelled.");
      }
    } else {
      // Fallback: copy link if share API not supported
      await copyLink();
      showMessage("Share not supported. Link copied instead!");
    }
  };

  const showMessage = (msg) => {
    setPopupMsg(msg);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <h3>Generate Review Link</h3>
      </div>

      <div className="review-input-wrapper">
        <input
          type="text"
          placeholder="Enter customer name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="generate-btn" onClick={generateLink}>
          <ArrowRight size={20} />
        </button>
      </div>

      {reviewLink && (
        <div className="review-link-box">
          <span className="link-text">{reviewLink}</span>
          <div className="link-actions">
            <button className="icon-btn" onClick={copyLink}>
              <Copy size={18} />
            </button>
            <button className="icon-btn" onClick={shareLink}>
              <Share2 size={18} />
            </button>
          </div>
        </div>
      )}

      {showPopup && <div className="custom-popup">{popupMsg}</div>}
    </div>
  );
};

export default ReviewLink;
