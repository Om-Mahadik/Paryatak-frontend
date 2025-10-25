import React from "react";
import TimeIcon from "../../../imgs/icons/time.svg"; // update path if needed
import "./BlogItem.css"; // we’ll rewrite this CSS

const BlogItem = ({ blog, onClick }) => {
  const defaultImage =
    "https://via.placeholder.com/400x250?text=No+Image+Available";

  // Duration string
  const durationStr =
    blog.duration >= 60
      ? `${Math.floor(blog.duration / 60)}h ${blog.duration % 60}m`
      : `${blog.duration}m`;

  // Time ago
  const now = new Date();
  const upload = new Date(blog.uploadDate || blog.createdAt);
  const diffDays = Math.floor((now - upload) / (1000 * 60 * 60 * 24));

  let timeAgo = "";
  if (diffDays < 1) timeAgo = "Today";
  else if (diffDays < 7) timeAgo = `${diffDays} Days ago`;
  else if (diffDays < 30) timeAgo = `${Math.floor(diffDays / 7)} Weeks ago`;
  else if (diffDays < 365) timeAgo = `${Math.floor(diffDays / 30)} Months ago`;
  else timeAgo = `${Math.floor(diffDays / 365)} Years ago`;

  return (
    <div className="bi-card" onClick={onClick}>
      <div className="bi-image-wrapper">
        <img
          src={blog.headImg && blog.headImg.trim() !== "" ? blog.headImg : defaultImage}
          alt={blog.title}
          className="bi-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />
      </div>

      <div className="bi-content">
        <div className="bi-duration">
          <img src={TimeIcon} alt="time" className="bi-time-icon" />
          {durationStr}
        </div>

        <h3 className="bi-title">{blog.title}</h3>

        <div className="bi-meta">
          Views: {blog.views || 0} | {timeAgo}
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
