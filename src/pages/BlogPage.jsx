import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../services/blogService";
import "./BlogPage.css";

const BlogPage = () => {
  const { id } = useParams(); // get blog id from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Blog not found");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="blog-page"><p>Loading blog...</p></div>;
  if (error) return <div className="blog-page"><h2>{error}</h2></div>;
  if (!blog) return <div className="blog-page"><h2>Blog not found!</h2></div>;

  return (
    <div className="blog-page">
      <div className="blog-container">
        <h1 className="blog-title">{blog.title}</h1>
        {blog.headImg && (
          <img src={blog.headImg} alt={blog.title} className="blog-thumbnail" />
        )}
        <div className="blog-meta">
          {blog.views ?? 0} Views | Uploaded on {new Date(blog.uploadDate).toDateString()}
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
