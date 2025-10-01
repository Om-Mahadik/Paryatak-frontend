import React from "react";
import { useParams } from "react-router-dom";
import blogs from "../data/blogs/blogs";
import "./BlogPage.css";

const BlogPage = () => {
  const { id } = useParams(); // get blog id from URL
  const blog = blogs.find(b => b.id === parseInt(id));

  if (!blog) {
    return <div className="blog-page"><h2>Blog not found!</h2></div>;
  }

  return (
    <div className="blog-page">
      <div className="blog-container">
        <h1 className="blog-title">{blog.title}</h1>
        <img src={blog.thumbnail} alt={blog.title} className="blog-thumbnail" />
        <div className="blog-meta">
          {blog.views} Views | Uploaded on {new Date(blog.uploadDate).toDateString()}
        </div>
        <div 
          className="blog-content" 
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
};

export default BlogPage;
