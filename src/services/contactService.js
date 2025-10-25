// services/contactService.js
const API_BASE = process.env.REACT_APP_API_BASE_URL + "/api/contacts";
const SHEET_URL = process.env.REACT_APP_CONTACTS_GOOGLE_SHEET_URL;

export const sendContactDataToMongo = async (formData) => {
  console.log("Sending contact data to MongoDB:", formData); // ✅ Log outgoing data

  try {
    const res = await fetch(`${API_BASE}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    console.log("Response status:", res.status); // ✅ Log HTTP status

    const data = await res.json().catch(() => {
      console.warn("Failed to parse JSON from response");
      return null;
    });

    console.log("Response data:", data); // ✅ Log response body

    if (!res.ok) {
      throw new Error(data?.message || "Failed to send contact to MongoDB");
    }

    return data;
  } catch (err) {
    console.error("Error sending contact data to MongoDB:", err); // ✅ Log full error
    throw err; // propagate error
  }
};



// Send contact form data to Google Sheet
export const sendContactDataToSheet = async (formData) => {
  try {
    await fetch(SHEET_URL, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    console.log("Contact data sent to Google Sheet!");
  } catch (err) {
    console.error("Error sending contact data to Google Sheet:", err);
  }
};

// Send to both MongoDB and Google Sheet
export const sendContactData = async (formData) => {
  await Promise.all([
    sendContactDataToMongo(formData),
    sendContactDataToSheet(formData),
  ]);
};

// Fetch all contacts
export const getContacts = async () => {
  try {
    const res = await fetch(`${API_BASE}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching contacts:", err);
    return [];
  }
};

// Mark contact as read/unread
export const markContactAsRead = async (id, markRead = true) => {
  try {
    const res = await fetch(`${API_BASE}/${id}/read`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: markRead }),
    });
    return await res.json();
  } catch (err) {
    console.error("Error marking contact as read/unread:", err);
  }
};

// Delete a contact
export const deleteContact = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    return await res.json();
  } catch (err) {
    console.error("Error deleting contact:", err);
  }
};
