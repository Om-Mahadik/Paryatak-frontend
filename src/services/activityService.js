import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Fetch today's activity data
export const getTodaysActivity = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/activity/today`);
    return res.data;
  } catch (err) {
    console.error("Error fetching today's activity:", err);
    // Use the same keys as backend returns
    return { popupsSubmitted: 0, peopleContacted: 0, reviewsReceived: 0 };
  }
};
