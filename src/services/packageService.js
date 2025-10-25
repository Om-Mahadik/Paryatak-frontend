import axios from "axios";

const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/api/packages`;

// Fetch all packages
export const fetchPackages = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

// Get a single package by ID
export const getPackageById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching package:", err);
    throw err;
  }
};

// Get a single package by slug
export const getPackageBySlug = async (slug) => {
  try {
    const res = await axios.get(`${API_BASE}/slug/${slug}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching package by slug:", err);
    throw err;
  }
};

// Create a new package
export const createPackage = async (packageData) => {
  try {
    const res = await axios.post(API_BASE, packageData);
    return res.data;
  } catch (err) {
    console.error("Error creating package:", err);
    throw err;
  }
};

// Update existing package
export const updatePackage = async (id, packageData) => {
  try {
    const res = await axios.put(`${API_BASE}/${id}`, packageData);
    return res.data;
  } catch (err) {
    console.error("Error updating package:", err);
    throw err;
  }
};

// Delete package (optional)
export const deletePackage = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting package:", err);
    throw err;
  }
};





// Fetch International Packages
export const fetchInternationalPackages = async () => {
  try {
    const res = await axios.get(`${API_BASE}/international`);
    return res.data;
  } catch (err) {
    console.error("Error fetching international packages:", err);
    throw err;
  }
};

// Fetch National Packages
export const fetchNationalPackages = async () => {
  try {
    const res = await axios.get(`${API_BASE}/national`);
    return res.data;
  } catch (err) {
    console.error("Error fetching international packages:", err);
    throw err;
  }
};

// Fetch Featured Packages
export const fetchFeaturedPackages = async () => {
  try {
    const res = await axios.get(`${API_BASE}/featured`);
    return res.data;
  } catch (err) {
    console.error("Error fetching featured packages:", err);
    throw err;
  }
};