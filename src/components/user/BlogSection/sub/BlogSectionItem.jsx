import React from "react";
import { Link } from "react-router-dom";
import TimeIcon from "../../../../imgs/icons/time.svg"; // your time icon
import "./BlogSectionItem.css";

const BlogSectionItem = ({ blog }) => {
  // Calculate duration string
  const durationStr =
    blog.duration >= 60
      ? `${Math.floor(blog.duration / 60)}h ${blog.duration % 60}m`
      : `${blog.duration}m`;

  // Calculate how long ago
  const now = new Date();
  const upload = new Date(blog.uploadDate);
  const diffDays = Math.floor((now - upload) / (1000 * 60 * 60 * 24));
  let timeAgo = "";
  if (diffDays < 7) timeAgo = `${diffDays} Days ago`;
  else if (diffDays < 30) timeAgo = `${Math.floor(diffDays / 7)} Weeks ago`;
  else if (diffDays < 365) timeAgo = `${Math.floor(diffDays / 30)} Months ago`;
  else timeAgo = `${Math.floor(diffDays / 365)} Years ago`;

  return (
    <div className="blog-card">
      <div className="blog-img-wrapper">
        <img src={blog.headImg} alt={blog.title} className="blog-thumbnail" />
      </div>
      <div className="blog-content">
        <div className="blog-duration">
          <img src={TimeIcon} alt="time" className="time-icon" />
          {durationStr}
        </div>
        <h3 className="blog-title">{blog.title}</h3>
        <Link to={`/blogs/${blog._id}`} className="blog-readmore">
          Read More
        </Link>
        <div className="blog-meta">
          View: {blog.views} | {timeAgo}
        </div>
      </div>
    </div>
  );
};

export default BlogSectionItem;
