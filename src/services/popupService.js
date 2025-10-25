// services/popupService.js
const API_BASE = process.env.REACT_APP_API_BASE_URL + "/api/popups";
const SHEET_URL = process.env.REACT_APP_POPUPS_GOOGLE_SHEET_URL; 

// Send popup data to MongoDB
export const sendPopupDataToMongo = async ({ name, phone }) => {
  try {
    const res = await fetch(`${API_BASE}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone }),
    });
    return await res.json();
  } catch (err) {
    console.error("Error sending data to MongoDB:", err);
  }
};

// Send popup data to Google Sheet
export const sendPopupDataToSheet = async ({ name, phone }) => {
  try {
    await fetch(SHEET_URL, {
      method: "POST",
      body: JSON.stringify({ name, phone }),
    });
    console.log("Data sent to Google Sheet!");
  } catch (err) {
    console.error("Error sending data to Google Sheet:", err);
  }
};

// Send to both MongoDB and Google Sheet
export const sendPopupData = async ({ name, phone }) => {
  await Promise.all([
    sendPopupDataToMongo({ name, phone }),
    sendPopupDataToSheet({ name, phone }),
  ]);
};

export const getPopups = async () => {
  try {
    const res = await fetch(`${API_BASE}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching popups:", err);
    return [];
  }
};

export const markPopupAsRead = async (id, markRead = true) => {
  try {
    const res = await fetch(`${API_BASE}/${id}/read`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: markRead }),
    });
    return await res.json();
  } catch (err) {
    console.error("Error marking popup as read/unread:", err);
  }
};

export const deletePopup = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    return await res.json();
  } catch (err) {
    console.error("Error deleting popup:", err);
  }
};
