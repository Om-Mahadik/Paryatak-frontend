import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/custom-packages`;

/**
 * 📨 Submit a new custom package inquiry
 */
export const submitCustomPackage = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}`, formData);
    return res.data;
  } catch (err) {
    console.error("❌ Error submitting custom package:", err.response?.data || err.message);
    throw err;
  }
};

/**
 * 📋 Get all custom package inquiries (Admin use)
 * Optional: filter by read/unread → pass { isRead: false }
 */
export const getAllCustomPackages = async (filter = {}) => {
  try {
    const res = await axios.get(`${BASE_URL}`, { params: filter });
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching packages:", err.response?.data || err.message);
    throw err;
  }
};



/**
 * ✅ Mark a package inquiry as read
 */
export const markPackageAsRead = async (id) => {
  try {
    const res = await axios.patch(`${BASE_URL}/${id}/read`);
    return res.data;
  } catch (err) {
    console.error("❌ Error marking as read:", err.response?.data || err.message);
    throw err;
  }
};

/**
 * 🔄 Mark a package inquiry as unread
 */
export const markPackageAsUnread = async (id) => {
  try {
    const res = await axios.patch(`${BASE_URL}/${id}/unread`);
    return res.data;
  } catch (err) {
    console.error("❌ Error marking as unread:", err.response?.data || err.message);
    throw err;
  }
};

/**
 * 🗑️ Delete a package inquiry
 */
export const deleteCustomPackage = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("❌ Error deleting package:", err.response?.data || err.message);
    throw err;
  }
};
