// services/visitService.js

// Base URL from env
const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/visits`;

/**
 * Fetch visit stats: live, today, week, month
 */
export const getVisitStats = async () => {
  try {
    const response = await fetch(`${BASE_URL}/stats`);
    if (!response.ok) throw new Error("Failed to fetch stats");
    const data = await response.json();
    return data; // { liveCount, todayCount, weekCount, monthCount }
  } catch (err) {
    console.error("Error in getVisitStats:", err);
    return {
      liveCount: 0,
      todayCount: 0,
      weekCount: 0,
      monthCount: 0,
    };
  }
};

/**
 * Log a new visit (call from website frontend)
 */
export const logVisit = async () => {
  try {
    await fetch(BASE_URL, { method: "POST" });
  } catch (err) {
    console.error("Error in logVisit:", err);
  }
};
