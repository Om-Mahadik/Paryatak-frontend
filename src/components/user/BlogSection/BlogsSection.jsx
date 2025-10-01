import React from "react";
import blogs from "../../../data/blogs/blogs"; // back 3 levels to reach src/blogs
import BlogSectionItem from "./sub/BlogSectionItem";
import "./BlogsSection.css";

const BlogsSection = () => {
  return (
    <div className="blogs-section">
      <div className="blogs-grid">
        {blogs.map((blog) => (
          <BlogSectionItem key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsSection;
