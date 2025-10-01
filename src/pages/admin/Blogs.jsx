import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBlogs } from "../../services/blogService";
import BlogItem from "../../components/admin/blogs/BlogItem";
import "./Blogs.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch blogs");
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blogs-page">
      <div className="blogs-header">
        <h1>Blogs</h1>
        <button className="create-btn" onClick={() => navigate("/admin/blogs/new")}>
          Create Blog
        </button>
      </div>

      <div className="blogs-list">
        {blogs.map((blog) => (
          <BlogItem
            key={blog._id}
            blog={blog}
            onClick={() => navigate(`/admin/blogs/${blog._id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
