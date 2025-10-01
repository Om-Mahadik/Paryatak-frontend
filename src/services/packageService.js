import axios from "axios";
import { uploadImage, deleteImage, updateImage } from "../firebase/storage";

const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/packages`;

export const getPackages = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const getPackageById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

/**
 * Create package with thumbnail and gallery images
 * onProgress: callback function to report progress per file
 */
export const createPackageWithImages = async (
  packageData,
  thumbnailFile,
  imageFiles = [],
  onProgress // <-- new callback
) => {
  // Upload thumbnail
  if (thumbnailFile) {
    packageData.thumbnail = await uploadImage(thumbnailFile, (p) => {
      if (onProgress) onProgress("thumbnail", p);
    });
  }

  // Upload other images one by one
  if (imageFiles.length > 0) {
    const urls = [];
    for (let i = 0; i < imageFiles.length; i++) {
      const url = await uploadImage(imageFiles[i], (p) => {
        if (onProgress) onProgress(`image_${i}`, p);
      });
      urls.push(url);
    }
    packageData.images = urls;
  }

  const res = await axios.post(API_BASE, packageData);
  return res.data;
};

/**
 * Update package with deleted images, new thumbnail, and new images
 */
export const updatePackageWithImages = async (
  id,
  packageData,
  newThumbnailFile = null,
  newImageFiles = [],
  deletedImages = [],
  onProgress // <-- new callback
) => {
  // Delete removed gallery images from Firebase
  if (deletedImages.length > 0) {
    await Promise.all(deletedImages.map((url) => deleteImage(url)));
    packageData.images = (packageData.images || []).filter(
      (url) => !deletedImages.includes(url)
    );
  }

  // Update thumbnail if new
  if (newThumbnailFile) {
    packageData.thumbnail = await updateImage(
      packageData.thumbnail,
      newThumbnailFile,
      "packages",
      (p) => {
        if (onProgress) onProgress("thumbnail", p);
      }
    );
  }

  // Upload new gallery images
  if (newImageFiles.length > 0) {
    for (let i = 0; i < newImageFiles.length; i++) {
      const url = await uploadImage(newImageFiles[i], (p) => {
        if (onProgress)
          onProgress(`image_${(packageData.images || []).length + i}`, p);
      });
      packageData.images = [...(packageData.images || []), url];
    }
  }

  const res = await axios.put(`${API_BASE}/${id}`, packageData);
  return res.data;
};

export const deletePackageById = async (id, packageData) => {
  // Delete images from Firebase first
  if (packageData.thumbnail) await deleteImage(packageData.thumbnail);
  if (packageData.images && packageData.images.length > 0) {
    await Promise.all(packageData.images.map((url) => deleteImage(url)));
  }

  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};
