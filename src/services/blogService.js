import axios from "axios";
import { uploadHeadImage, updateHeadImage, deleteHeadImage } from "../firebase/headImg";

const API_BASE = process.env.REACT_APP_API_BASE_URL + "/blogs";

/** Get all blogs */
export const getAllBlogs = async () => {
  const res = await axios.get(`${API_BASE}`);
  return res.data;
};

/** Get single blog */
export const getBlogById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

/** Create blog with optional head image */
export const createBlog = async (blogData, headFile, progressCallback) => {
  let headImgUrl = null;

  if (headFile) {
    headImgUrl = await uploadHeadImage(headFile, progressCallback);
  }

  const payload = { ...blogData, headImg: headImgUrl };
  const res = await axios.post(`${API_BASE}`, payload);
  return res.data;
};

/** Update blog with optional new head image */
export const updateBlog = async (id, blogData, newHeadFile, oldHeadUrl, progressCallback) => {
  let headImgUrl = oldHeadUrl;

  if (newHeadFile) {
    // Only pass old URL if it's a string
    const oldUrl = oldHeadUrl;
    console.log("Old Url to Delete: ", oldHeadUrl);
    headImgUrl = await updateHeadImage(oldUrl, newHeadFile, progressCallback);
  }

  const payload = { ...blogData, headImg: headImgUrl };
  const res = await axios.put(`${API_BASE}/${id}`, payload);
  return res.data;
};



/** Delete blog by ID (delete Firebase head image first) */
export const deleteBlogById = async (id) => {
  try {
    // Fetch blog details to get head image URL
    const { data: blog } = await axios.get(`${API_BASE}/${id}`);

    // Delete head image from Firebase if exists
    if (blog.headImg) {
      console.log("Deleting head image from Firebase:", blog.headImg);
      await deleteHeadImage(blog.headImg);
    }

    // Delete blog from backend
    const res = await axios.delete(`${API_BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting blog:", err);
    throw err;
  }
};




/** Delete blog by ID (delete Firebase head image first) */
export const deleteBlog = async (id) => {
  try {
    // Fetch blog details to get head image URL
    const { data: blog } = await axios.get(`${API_BASE}/${id}`);

    // Delete head image from Firebase if exists
    if (blog.headImg) {
      console.log("Deleting head image from Firebase:", blog.headImg);
      await deleteHeadImage(blog.headImg);
    }

    // Delete blog from backend
    const res = await axios.delete(`${API_BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting blog:", err);
    throw err;
  }
};
