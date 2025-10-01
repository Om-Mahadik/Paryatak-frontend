import React from "react";
import "./BlogItem.css";

const BlogItem = ({ blog, onClick }) => {
  return (
    <div className="blog-item" onClick={onClick}>
      {blog.headImg && <img src={blog.headImg} alt={blog.title} className="blog-headimg" />}
      <div className="blog-info">
        <h2 className="blog-title">{blog.title}</h2>
        <p className="blog-date">{new Date(blog.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default BlogItem;
