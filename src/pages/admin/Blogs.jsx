import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBlogs } from "../../services/blogService";
import BlogItem from "../../components/admin/blogs/BlogItem";
import "./Blogs.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const data = await getAllBlogs();
      setBlogs(data);
    } catch (err) {
      alert("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="blg-page">
      <div className="blg-header">
        <h1>Blogs</h1>
        <button
          className="blg-create-btn"
          onClick={() => navigate("/admin/blog-setup")}
        >
          + Create New Blog
        </button>
      </div>

      <div className="blg-list">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogItem
              key={blog._id}
              blog={blog}
              onClick={() => navigate(`/admin/blog-setup/${blog._id}`)}
            />
          ))
        ) : (
          <p className="blg-no-blogs">No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
