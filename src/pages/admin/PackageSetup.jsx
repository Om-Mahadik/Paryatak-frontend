import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPackageById,
  createPackageWithImages,
  updatePackageWithImages,
  deletePackageById,
} from "../../services/packageService";
import PackageForm from "../../components/admin/packages/PackageForm";
import PackageMedia from "../../components/admin/packages/PackageMedia";
import "./PackageSetup.css";

const PackageSetup = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    price: "",
    duration: "",
    category: "",
    thumbnail: "",
    images: [],
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [existingThumbnail, setExistingThumbnail] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({}); // { thumbnail: 0, image_0: 0, image_1: 0 }

  // Fetch package if editing
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await getPackageById(id);
        setFormData(data);
        setPreviewImages(data.images || []);
        setExistingImages(data.images || []);
        setExistingThumbnail(data.thumbnail || null);
      };
      fetchData();
    }
  }, [id]);

  useEffect(() => {
  if (existingThumbnail) {
    console.log("State existingThumbnail UPDATED:", existingThumbnail);
  }
}, [existingThumbnail]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save or Update
  const handleSave = async () => {
    setLoading(true);
  
    // Prepare initial uploadProgress object
    let progressObj = {};
  
    const updateProgress = (key, value) => {
      progressObj[key] = value;
      setUploadProgress({ ...progressObj });
    };
  
    try {
      if (id) {
        await updatePackageWithImages(
          id,
          { ...formData },
          thumbnailFile,
          imageFiles,
          deletedImages,
          updateProgress // pass callback
        );
        alert("Package updated successfully!");
      } else {
        await createPackageWithImages(
          formData,
          thumbnailFile,
          imageFiles,
          updateProgress
        );
        alert("Package created successfully!");
      }
      navigate("/admin/packages");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
      setUploadProgress({});
    }
  };
  

  const handleDelete = async () => {
    const confirmName = prompt(
      `Type "${formData.title}" to confirm deletion of this package.`
    );
    if (confirmName === formData.title) {
      await deletePackageById(id, formData);
      alert("Package deleted successfully!");
      navigate("/admin/packages");
    } else {
      alert("Package name did not match. Deletion cancelled.");
    }
  };

  return (
    <div className="package-setup">
      <div className="package-left">
        <PackageForm formData={formData} handleChange={handleChange} />

        <div className="actions">
          <button
            onClick={handleSave}
            disabled={loading}
            className="save-btn"
          >
            {id ? "Update Package" : "Create Package"}
          </button>

          {id && (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="delete-btn"
            >
              Delete Package
            </button>
          )}
        </div>
      </div>

      <div className="package-right">
        <PackageMedia
          formData={formData}
          setFormData={setFormData}
          thumbnailFile={thumbnailFile}
          existingThumbnail={existingThumbnail}
          setExistingThumbnail={setExistingThumbnail}
          setThumbnailFile={setThumbnailFile}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
          previewImages={previewImages}
          setPreviewImages={setPreviewImages}
          existingImages={existingImages}
          setExistingImages={setExistingImages}
          deletedImages={deletedImages}
          setDeletedImages={setDeletedImages}
          loading={loading}
          uploadProgress={uploadProgress}
        />
      </div>
    </div>
  );
};

export default PackageSetup;
