// src/pages/admin/BlogSetup.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import DeleteIcon from "../../imgs/icons/delete.svg";
import { createBlog, updateBlog, getBlogById, deleteBlog } from "../../services/blogService";
import "./BlogSetup.css";

const BlogSetup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Form state
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [views, setViews] = useState("");
  const [uploadDate, setUploadDate] = useState("");
  const [headImg, setHeadImg] = useState(null); // new file to upload
  const [headImgUrl, setHeadImgUrl] = useState(null); // existing Firebase URL
  const [previewHeadImg, setPreviewHeadImg] = useState(null); // local preview
  const [loading, setLoading] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");

  // Quill editor
  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: [
        [{ font: [] }, { size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link", "image", "video"],
        ["clean"],
      ],
    },
  });

  // Fetch existing blog if editing
  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const data = await getBlogById(id);
          setTitle(data.title);
          setDuration(data.duration || "");
          setViews(data.views || "");
          setUploadDate(data.uploadDate ? data.uploadDate.slice(0, 10) : "");
          setHeadImgUrl(data.headImg || null);
          setPreviewHeadImg(data.headImg || null);
          if (quill) quill.root.innerHTML = data.content || "";
        } catch (err) {
          console.error("Failed to fetch blog:", err);
        }
      };
      fetchBlog();
    }
  }, [id, quill]);

  const handleHeadImgClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHeadImg(file);
      setPreviewHeadImg(URL.createObjectURL(file));
    }
  };

  const showPopup = (msg) => {
    setPopupMsg(msg);
    setTimeout(() => setPopupMsg(""), 3000);
  };

  const handleSave = async () => {
    if (!quill) return;
    setLoading(true);

    try {
      const content = quill.root.innerHTML;
      const blogData = {
        title,
        duration: duration ? Number(duration) : undefined,
        views: views ? Number(views) : undefined,
        uploadDate: uploadDate || new Date(),
        content,
      };

      if (id) {
        // Pass old Firebase URL if new image selected
        const oldUrl = headImg ? headImgUrl : null;
        await updateBlog(id, blogData, headImg, oldUrl, (progress) => console.log("Upload progress:", progress));
        showPopup("Blog updated successfully!");
      } else {
        await createBlog(blogData, headImg, (progress) => console.log("Upload progress:", progress));
        showPopup("Blog created successfully!");
      }

      setTimeout(() => navigate("/admin/blogs"), 1000);
    } catch (err) {
      console.error("Error saving blog:", err);
      showPopup("Error saving blog!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await deleteBlog(id);
      showPopup("Blog deleted successfully!");
      setTimeout(() => navigate("/admin/blogs"), 1000);
    } catch (err) {
      console.error("Error deleting blog:", err);
      showPopup("Error deleting blog!");
    }
  };

return (
  <div className="blog-setup-container">
    <div className="blog-card professional-layout">
      {/* ---------- Top Image ---------- */}
      <div className="top-side">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div className="head-img-dropzone" onClick={handleHeadImgClick}>
          {previewHeadImg ? (
            <>
              <img
                src={previewHeadImg}
                alt="Header Preview"
                className="head-img-preview-full"
              />
              <span className="overlay-text">
                Click here to replace the image
              </span>
            </>
          ) : (
            <p>Click here to upload header image</p>
          )}
        </div>
      </div>

      {/* ---------- Bottom Form ---------- */}
      <div className="bottom-side">
        <h2>{id ? "Edit Blog" : "Create Blog"}</h2>
        <div className="blog-form">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Duration (Numbers only)</label>
          <input
            type="number"
            min="0"
            placeholder="Enter duration"
            value={duration}
            onChange={(e) =>
              setDuration(e.target.value.replace(/\D/g, ""))
            }
          />

          <label>Views (Numbers only)</label>
          <input
            type="number"
            min="0"
            placeholder="Enter views count"
            value={views}
            onChange={(e) => setViews(e.target.value.replace(/\D/g, ""))}
          />

          <label>Upload Date</label>
          <input
            type="date"
            value={uploadDate}
            onChange={(e) => setUploadDate(e.target.value)}
          />

          <label>Content</label>
          <div ref={quillRef} className="blog-editor-scrollable" />

          {/* ---------- Action Buttons ---------- */}
          <div className="blog-actions">
            <button className="pill-btn save-btn" onClick={handleSave} disabled={loading}>
              {id ? "Update Blog" : "Create Blog"}
            </button>

            {id && (
              <button className="pill-btn delete-btn" onClick={handleDelete}>
                <img src={DeleteIcon} alt="Delete" className="btn-icon" />
                Delete Blog
              </button>
            )}
          </div>
        </div>
      </div>
    </div>

    {popupMsg && <div className="popup">{popupMsg}</div>}
  </div>
);




};

export default BlogSetup;
