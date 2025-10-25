import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../../services/blogService";
import BlogSectionItem from "./sub/BlogSectionItem";
import "./BlogsSection.css";

const BlogsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="blogs-section">
      <div className="blogs-grid">
        {blogs.map((blog) => (
          <BlogSectionItem key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsSection;
