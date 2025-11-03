import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const HERO_SECTION_URL = `${API_BASE_URL}/api/home-content`;

// ✅ Fetch all hero sections (public)
export const getHeroSections = async () => {
  try {
    const response = await axios.get(HERO_SECTION_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching hero sections:", error);
    throw error;
  }
};

// ✅ Add a new hero section (admin only)
export const addHeroSection = async (formData, token) => {
  try {
    const response = await axios.post(HERO_SECTION_URL, formData, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding hero section:", error);
    throw error;
  }
};

// ✅ Update an existing hero section (admin only)
export const updateHeroSection = async (id, formData, token) => {
  try {
    const response = await axios.put(`${HERO_SECTION_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating hero section:", error);
    throw error;
  }
};

// ✅ Delete a hero section (admin only)
export const deleteHeroSection = async (id, token) => {
  try {
    const response = await axios.delete(`${HERO_SECTION_URL}/${id}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting hero section:", error);
    throw error;
  }
};
