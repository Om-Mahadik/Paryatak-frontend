import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  getPackageById, 
  createPackage, 
  updatePackage, 
  deletePackage 
} from "../../services/packageService";
import "./PackageSetup.css";
import RemoveIcon from "../../imgs/icons/remove.svg"; // Make sure you have this svg
import DeleteIcon from "../../imgs/icons/delete.svg";

const PackageSetup = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [packageData, setPackageData] = useState({
    title: "",
    slug: "",
    country: "",
    duration: "",
    days: 0,
    nights: 0,
    price: 0,
    discountPrice: 0,
    mainImage: "",
    galleryImages: [],
    overview: "",
    highlights: [],
    inclusions: [],
    exclusions: [],
    itinerary: [],
    reviews: [],
    groupDates: [],
    brochure: "",
    rating: { stars: 0, reviews: 0 },
    isInternational: false,
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success", duration = 3000) => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
      setTimeout(() => setToast(null), 300);
    }, duration);
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      getPackageById(id)
        .then((data) => setPackageData(data))
        .catch(() => showToast("Error fetching package", "error"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPackageData({ 
      ...packageData, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  const handleArrayChange = (name, index, value) => {
    const newArray = [...packageData[name]];
    newArray[index] = value;
    setPackageData({ ...packageData, [name]: newArray });
  };

  const addArrayItem = (name) => setPackageData({ 
    ...packageData, 
    [name]: [...packageData[name], ""] 
  });

  const removeArrayItem = (name, index) => {
    const newArray = packageData[name].filter((_, i) => i !== index);
    setPackageData({ ...packageData, [name]: newArray });
  };

  const handleGalleryChange = (index, value) => {
    const newGallery = [...packageData.galleryImages];
    newGallery[index] = value;
    setPackageData({ ...packageData, galleryImages: newGallery });
  };
  const addGalleryImage = () => setPackageData({ 
    ...packageData, 
    galleryImages: [...packageData.galleryImages, ""] 
  });
  const removeGalleryImage = (index) => {
    const newGallery = packageData.galleryImages.filter((_, i) => i !== index);
    setPackageData({ ...packageData, galleryImages: newGallery });
  };

  const handleItineraryChange = (index, field, value) => {
    const newItinerary = [...packageData.itinerary];
    newItinerary[index][field] = value;
    setPackageData({ ...packageData, itinerary: newItinerary });
  };
  const addItinerary = () => setPackageData({
    ...packageData,
    itinerary: [
      ...packageData.itinerary,
      { day: packageData.itinerary.length + 1, title: "", description: "", photo: "" }
    ],
  });
  const removeItinerary = (index) => {
    const newItinerary = packageData.itinerary.filter((_, i) => i !== index);
    setPackageData({ ...packageData, itinerary: newItinerary });
  };

  const handleGroupDateChange = (index, field, value) => {
    const newGroupDates = [...packageData.groupDates];
    newGroupDates[index][field] = value;
    setPackageData({ ...packageData, groupDates: newGroupDates });
  };
  const addGroupDate = () => setPackageData({
    ...packageData,
    groupDates: [...packageData.groupDates, { group: "", startDate: "", endDate: "" }]
  });
  const removeGroupDate = (index) => {
    const newGroupDates = packageData.groupDates.filter((_, i) => i !== index);
    setPackageData({ ...packageData, groupDates: newGroupDates });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updatePackage(id, packageData);
        showToast("Package updated successfully!", "success");
      } else {
        await createPackage(packageData);
        showToast("Package created successfully!", "success");
      }
      setTimeout(() => navigate("/admin/packages"), 1500);
    } catch {
      showToast("Error saving package", "error");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await deletePackage(id);
        showToast("Package deleted successfully!", "success");
        setTimeout(() => navigate("/admin/packages"), 1500);
      } catch {
        showToast("Error deleting package", "error");
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="package-setup-page">
      <h2>{id ? "Edit Package" : "Create New Package"}</h2>
      <form onSubmit={handleSubmit}>

        {/* Basic Info */}
        <div className="form-section">
          <label>Title:</label>
          <input type="text" name="title" value={packageData.title} onChange={handleChange} required />
          <label>Slug:</label>
          <input type="text" name="slug" value={packageData.slug} onChange={handleChange} required />
          <label>Country:</label>
          <input type="text" name="country" value={packageData.country} onChange={handleChange} />
          <label>Duration:</label>
          <input type="text" name="duration" value={packageData.duration} onChange={handleChange} />
          <label>Days:</label>
          <input type="number" name="days" value={packageData.days} onChange={handleChange} />
          <label>Nights:</label>
          <input type="number" name="nights" value={packageData.nights} onChange={handleChange} />
          <label>Price:</label>
          <input type="number" name="price" value={packageData.price} onChange={handleChange} />
          <label>Discount Price:</label>
          <input type="number" name="discountPrice" value={packageData.discountPrice} onChange={handleChange} />
          <label>Main Image URL:</label>
          <input type="text" name="mainImage" value={packageData.mainImage} onChange={handleChange} />
          <label>Brochure URL:</label>
          <input type="text" name="brochure" value={packageData.brochure} onChange={handleChange} />

          {/* Category Section */}
          <div className="form-section category-section">
            <label>Category:</label>
            <div className="category-options">
              <input 
                type="radio" 
                id="national" 
                name="isInternational" 
                value="false"
                checked={!packageData.isInternational}
                onChange={() => setPackageData({...packageData, isInternational: false})}
              />
              <label className="option-pill" htmlFor="national">National</label>
            
              <input 
                type="radio" 
                id="international" 
                name="isInternational" 
                value="true"
                checked={packageData.isInternational}
                onChange={() => setPackageData({...packageData, isInternational: true})}
              />
              <label className="option-pill" htmlFor="international">International</label>
            </div>
          </div>


          {/* Featured Section */}
          <div className="form-section category-section">
            <label>Featured to Home:</label>
            <div className="category-options">
              <input
                type="radio"
                id="featured-no"
                name="featured"
                value="false"
                checked={!packageData.featured}
                onChange={() => setPackageData({ ...packageData, featured: false })}
              />
              <label className="option-pill" htmlFor="featured-no">No</label>

              <input
                type="radio"
                id="featured-yes"
                name="featured"
                value="true"
                checked={packageData.featured}
                onChange={() => setPackageData({ ...packageData, featured: true })}
              />
              <label className="option-pill" htmlFor="featured-yes">Yes</label>
            </div>
          </div>

            

        </div>

        {/* Overview */}
        <div className="form-section">
          <label>Overview:</label>
          <textarea name="overview" value={packageData.overview} onChange={handleChange}></textarea>
        </div>

        {/* Highlights, Inclusions, Exclusions */}
        {["highlights","inclusions","exclusions"].map(field => (
          <div className="form-section" key={field}>
            <h4>{field.charAt(0).toUpperCase() + field.slice(1)}</h4>
            {packageData[field].map((item, idx) => (
              <div key={idx} className="array-item">
                <input type="text" value={item} onChange={(e) => handleArrayChange(field, idx, e.target.value)} />
                <img src={RemoveIcon} alt="remove" className="remove-btn" onClick={() => removeArrayItem(field, idx)} />
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem(field)}>Add {field.slice(0,-1)}</button>
          </div>
        ))}

        {/* Gallery */}
        <div className="form-section">
          <h4>Gallery Images</h4>
          {packageData.galleryImages.map((img, idx) => (
            <div key={idx} className="array-item">
              <input type="text" value={img} onChange={(e) => handleGalleryChange(idx, e.target.value)} />
              <img src={RemoveIcon} alt="remove" className="remove-btn" onClick={() => removeGalleryImage(idx)} />
            </div>
          ))}
          <button type="button" onClick={addGalleryImage}>Add Gallery Image</button>
        </div>

        {/* Itinerary */}
        <div className="form-section">
          <h4>Itinerary</h4>
          {packageData.itinerary.map((item, idx) => (
            <div key={idx} className="itinerary-item">
              <label>Day {item.day}</label>
              <input 
                type="text" 
                placeholder="Title" 
                value={item.title} 
                onChange={(e) => handleItineraryChange(idx, "title", e.target.value)} 
              />
              <textarea 
                placeholder="Description" 
                value={item.description} 
                onChange={(e) => handleItineraryChange(idx, "description", e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Photo URL" 
                value={item.photo} 
                onChange={(e) => handleItineraryChange(idx, "photo", e.target.value)} 
              />
              <img src={RemoveIcon} alt="remove" className="remove-btn" onClick={() => removeItinerary(idx)} />
            </div>
          ))}
          <button type="button" onClick={addItinerary}>Add Itinerary Day</button>
        </div>

        {/* Group Dates */}
        <div className="form-section">
          <h4>Group Dates</h4>
          {packageData.groupDates.map((item, idx) => (
            <div key={idx} className="group-date-item">
              <input 
                type="text" 
                placeholder="Group Name" 
                value={item.group} 
                onChange={(e) => handleGroupDateChange(idx, "group", e.target.value)} 
              />
              <div className="date-pair">
                <input 
                  type="date" 
                  value={item.startDate?.slice(0,10) || ""} 
                  onChange={(e) => handleGroupDateChange(idx, "startDate", e.target.value)} 
                />
                <input 
                  type="date" 
                  value={item.endDate?.slice(0,10) || ""} 
                  onChange={(e) => handleGroupDateChange(idx, "endDate", e.target.value)} 
                />
              </div>
              <img src={RemoveIcon} alt="remove" className="remove-btn" onClick={() => removeGroupDate(idx)} />
            </div>
          ))}
          <button type="button" onClick={addGroupDate}>Add Group Date</button>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {id ? "Update Package" : "Create Package"}
          </button>

          {id && (
            <button type="button" className="delete-btnn" onClick={handleDelete}>
              Delete Package
              <img src={DeleteIcon} alt="delete" />
            </button>
          )}
        </div>
        
      </form>

      {toast && <div className={`toast ${toast.type} ${toast.visible ? "show" : "hide"}`}>{toast.message}</div>}

    </div>
  );
};

export default PackageSetup;
