// src/pages/admin/BlogSetup.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { getBlogById, createBlog, updateBlog, deleteBlog } from "../../services/blogService";
import "./BlogSetup.css";

const BlogSetup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [headImg, setHeadImg] = useState(null);
  const [previewHeadImg, setPreviewHeadImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchedHeadImgUrl, setFetchedHeadImgUrl] = useState(null);

  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: [
        [{ font: [] }, { size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ header: 1 }, { header: 2 }, "blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }, { align: [] }],
        ["link", "image", "video", "formula"],
        ["clean"],
      ],
    },
  });

  // Fetch blog data
  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const data = await getBlogById(id);
          setTitle(data.title);
          setPreviewHeadImg(data.headImg || null);
          setFetchedHeadImgUrl(data.headImg || null);
          if (quill) quill.root.innerHTML = data.content;
        } catch (err) {
          console.error("Failed to fetch blog:", err);
        }
      };
      fetchBlog();
    }
  }, [id, quill]);

  // Drag-and-drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setHeadImg(file);
      setPreviewHeadImg(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleHeadImgClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHeadImg(file);
      setPreviewHeadImg(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!quill) return;
    setLoading(true);

    try {
      const content = quill.root.innerHTML;

      if (id) {
        await updateBlog(
          id,
          { title, content },
          headImg instanceof File ? headImg : null,
          headImg instanceof File ? fetchedHeadImgUrl : null,
          (progress) => console.log("Upload progress:", progress)
        );
        alert("Blog updated successfully!");
      } else {
        await createBlog(
          { title, content },
          headImg instanceof File ? headImg : null,
          (progress) => console.log("Upload progress:", progress)
        );
        alert("Blog created successfully!");
      }

      navigate("/admin/blogs");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await deleteBlog(id);
      alert("Blog deleted successfully!");
      navigate("/admin/blogs");
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog!");
    }
  };

  return (
    <div className="blog-setup-container">
      <div className="blog-card">
        <div className="blog-header">
          <h2>{id ? "Edit Blog" : "Create Blog"}</h2>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* Drag-and-drop header image */}
        <div
          className="head-img-dropzone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleHeadImgClick}
        >
          {previewHeadImg ? (
            <img src={previewHeadImg} alt="Header Preview" className="head-img-preview-full" />
          ) : (
            <p>Drag & Drop or Click to Upload Header Image</p>
          )}
        </div>

        <div className="blog-form">
          <label className="blog-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="blog-input"
          />

          <label className="blog-label">Content</label>
          <div ref={quillRef} className="blog-editor-scrollable" />

          <div className="blog-actions">
            <button onClick={handleSave} disabled={loading} className="save-btn">
              {id ? "Update Blog" : "Create Blog"}
            </button>

            <button onClick={() => navigate("/admin/blogs")} className="cancel-btn">
              Cancel
            </button>

            {id && (
              <button onClick={handleDelete} className="delete-btn">
                Delete Blog
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSetup;
