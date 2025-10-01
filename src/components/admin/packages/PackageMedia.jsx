import React, { useRef } from "react";
import "./PackageMedia.css";

const PackageMedia = ({
  thumbnailFile,
  setThumbnailFile,
  existingThumbnail,
  setExistingThumbnail,
  imageFiles,
  setImageFiles,
  previewImages,
  setPreviewImages,
  existingImages,
  setExistingImages,
  deletedImages,
  setDeletedImages,
  loading,
  uploadProgress,
}) => {
  const thumbRef = useRef(null);
  const galleryRef = useRef(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImageFiles((prev) => [...prev, ...files]);
      setPreviewImages((prev) => [...prev, ...files.map(f => URL.createObjectURL(f))]);
    }
  };

  const removeGalleryImage = (index, isExisting) => {
    if (isExisting) {
      const imgUrl = existingImages[index];
      setDeletedImages((prev) => [...prev, imgUrl]);
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
      setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setImageFiles((prev) => prev.filter((_, i) => i !== index));
      setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="package-media">
      <div
        className="thumbnail-upload"
        onClick={() => thumbRef.current.click()}
      >
        <input
          type="file"
          ref={thumbRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleThumbnailChange}
        />
      
        {thumbnailFile ? (
          <img src={URL.createObjectURL(thumbnailFile)} alt="thumbnail" />
        ) : existingThumbnail ? (
          <img src={existingThumbnail} alt="existing-thumbnail" />
        ) : (
          <p>Click or Drag & Drop to upload thumbnail</p>
        )}
      
        {uploadProgress.thumbnail !== undefined && (
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${uploadProgress.thumbnail}%` }}
            >
              {uploadProgress.thumbnail}%
            </div>
          </div>
        )}
      </div>
      

      <div
        className="gallery-upload"
        onClick={() => galleryRef.current.click()}
      >
        <input
          type="file"
          ref={galleryRef}
          style={{ display: "none" }}
          accept="image/*"
          multiple
          onChange={handleGalleryChange}
        />
        <p>Click or Drag & Drop to upload images</p>
      </div>

      <div className="gallery-grid">
        {existingImages.map((url, i) => (
          <div key={`existing-${i}`} className="gallery-card">
            <img src={url} alt="existing" />
            <button
              className="remove-btn"
              onClick={() => removeGalleryImage(i, true)}
            >
              &times;
            </button>
            {uploadProgress[`image_${i}`] !== undefined && (
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${uploadProgress[`image_${i}`]}%` }}
                >
                  {uploadProgress[`image_${i}`]}%
                </div>
              </div>
            )}
          </div>
        ))}

        {previewImages.slice(existingImages.length).map((url, i) => (
          <div key={`new-${i}`} className="gallery-card">
            <img src={url} alt="new" />
            <button
              className="remove-btn"
              onClick={() => removeGalleryImage(i, false)}
            >
              &times;
            </button>
            {uploadProgress[`image_${i + existingImages.length}`] !== undefined && (
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${uploadProgress[`image_${i + existingImages.length}`]}%` }}
                >
                  {uploadProgress[`image_${i + existingImages.length}`]}%
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageMedia;
