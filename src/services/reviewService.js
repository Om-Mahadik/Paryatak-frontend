import axios from "axios";

// Base URL for backend

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_BASE = `${BASE_URL}/api/reviews`;


const reviewService = {
  // ----------------- Public -----------------
  
  // Submit a new review (pending)
  submitReview: async (reviewData) => {
    try {
      const res = await axios.post(`${API_BASE}`, reviewData);
      return res.data;
    } catch (err) {
      throw err.response || err;
    }
  },

  // Get approved reviews for a specific package
  getApprovedReviewsForPackage: async (packageId) => {
    try {
      const res = await axios.get(`${API_BASE}/package/${packageId}`);
      return res.data;
    } catch (err) {
      throw err.response || err;
    }
  },

  // Get overall approved reviews
  getOverallApprovedReviews: async () => {
    try {
      const res = await axios.get(`${API_BASE}/overall`);
      return res.data;
    } catch (err) {
      throw err.response || err;
    }
  },

  // ----------------- Admin -----------------
  
  // Get all pending reviews
  getPendingReviews: async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin/pending`);
      return res.data;
    } catch (err) {
      throw err.response || err;
    }
  },

  // Approve a review
  approveReview: async (reviewId) => {
    try {
      const res = await axios.put(`${API_BASE}/admin/approve/${reviewId}`);
      return res.data;
    } catch (err) {
      throw err.response || err;
    }
  },

  // Delete a review
  deleteReview: async (reviewId) => {
    try {
      const res = await axios.delete(`${API_BASE}/admin/delete/${reviewId}`);
      return res.data;
    } catch (err) {
      throw err.response || err;
    }
  },
};

export default reviewService;
