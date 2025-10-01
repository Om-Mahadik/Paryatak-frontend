import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { app } from "./config";

const storage = getStorage(app);

/**
 * Upload a single file to Firebase Storage with progress callback
 * @param {File} file - File object from input
 * @param {String} folder - Folder name in Firebase Storage
 * @param {Function} onProgress - Callback(progress: number) for upload progress
 * @returns {Promise<String>} - Download URL
 */
export const uploadImage = (file, onProgress, folder = "packages") => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (onProgress) {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          onProgress(progress);
        }
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(url);
      }
    );
  });
};


/**
 * Delete an image from Firebase Storage
 * @param {String} imageUrl - Full Firebase Storage URL
 */
export const deleteImage = async (imageUrl) => {
  try {
    const storageRef = ref(storage, imageUrl);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

/**
 * Update an image (delete old + upload new) with progress
 * @param {String} oldUrl - Old image URL
 * @param {File} newFile - New file to upload
 * @param {Function} onProgress - Callback(progress: number) for upload progress
 * @param {String} folder - Folder name in Firebase Storage
 * @returns {Promise<String>} - New download URL
 */
export const updateImage = async (oldUrl, newFile, onProgress = null, folder = "packages") => {
  if (oldUrl) await deleteImage(oldUrl);
  const newUrl = await uploadImage(newFile, folder, onProgress);
  return newUrl;
};
