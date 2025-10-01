// services/firebase/headImage.js
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./config"; // your firebase config

/** Upload head image */
export const uploadHeadImage = (file, progressCallback) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject("No file provided");

    const storageRef = ref(storage, `blogs/head/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progressCallback) progressCallback(progress);
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(url);
      }
    );
  });
};


/** Delete head image by URL */
export const deleteHeadImage = async (url) => {
  console.log("Deleting head image URL:", url); // <-- debug
  if (!url || typeof url !== "string") return;
  try {
    const startIndex = url.indexOf("/o/");
    const endIndex = url.indexOf("?alt=media");
    if (startIndex === -1 || endIndex === -1) return;

    const path = decodeURIComponent(url.substring(startIndex + 3, endIndex));
    console.log("Firebase path extracted:", path); // <-- debug

    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    console.log("Deleted head image from Firebase:", path);
  } catch (err) {
    console.error("Error deleting head image:", err);
  }
};



/** Update head image */
export const updateHeadImage = async (oldUrl, newFile, progressCallback) => {
  console.log("Old URL to delete:", oldUrl);  // <-- debug
  if (oldUrl) await deleteHeadImage(oldUrl); // delete previous image
  const newUrl = await uploadHeadImage(newFile, progressCallback);
  console.log("New URL uploaded:", newUrl);  // <-- debug
  return newUrl;
};


