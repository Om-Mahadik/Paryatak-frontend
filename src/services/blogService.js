// src/services/blogService.js
import axios from "axios";
import { uploadHeadImage, updateHeadImage, deleteHeadImage } from "../firebase/headImg";

const API_BASE = process.env.REACT_APP_API_BASE_URL + "/api/blogs";


/** Get single blog by ID */
export const getBlogById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};



/** Get all blogs */
export const getAllBlogs = async () => {
  try {
    const res = await axios.get(`${API_BASE}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching blogs:", err);
    throw err;
  }
};




/** Create a blog with optional head image */
export const createBlog = async (blogData, headFile, progressCallback) => {
  try {
    let headImgUrl = null;

    if (headFile) {
      headImgUrl = await uploadHeadImage(headFile, progressCallback);
    }

    const payload = { ...blogData, headImg: headImgUrl };
    const res = await axios.post(`${API_BASE}`, payload);
    return res.data;
  } catch (err) {
    console.error("Error creating blog:", err);
    throw err;
  }
};



/** Update blog with optional new head image */
export const updateBlog = async (id, blogData, newHeadFile, oldHeadUrl, progressCallback) => {
  try {
    let headImgUrl = oldHeadUrl;

    if (newHeadFile) {
      // Delete old image and upload new
      headImgUrl = await updateHeadImage(oldHeadUrl, newHeadFile, progressCallback);
    }

    // Convert numeric fields if necessary
    const payload = {
      ...blogData,
      headImg: headImgUrl,
      duration: blogData.duration ? Number(blogData.duration) : undefined,
      views: blogData.views ? Number(blogData.views) : undefined,
      uploadDate: blogData.uploadDate || new Date(),
    };

    const res = await axios.put(`${API_BASE}/${id}`, payload);
    return res.data;
  } catch (err) {
    console.error("Error updating blog:", err);
    throw err;
  }
};



/** Delete blog by ID (delete Firebase head image first) */
export const deleteBlog = async (id) => {
  try {
    // Fetch the latest blog details from backend
    const { data: blog } = await axios.get(`${API_BASE}/${id}`);
    console.log("Deleting blog, fetched blog data:", blog);

    // Delete head image from Firebase if exists
    if (blog.headImg && typeof blog.headImg === "string") {
      console.log("Deleting head image from Firebase:", blog.headImg);
      await deleteHeadImage(blog.headImg);
    }

    // Delete blog from backend
    const res = await axios.delete(`${API_BASE}/${id}`);
    console.log("Blog deleted successfully from backend:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error deleting blog:", err);
    throw err;
  }
};