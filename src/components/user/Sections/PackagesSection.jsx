import React, { useState, useEffect } from "react";
import PackageSectionItem from "./PackageSectionItem";
import "./PackagesSection.css";
import axios from "axios";

const PackagesSection = () => {
  const [packagesData, setPackagesData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/packages`);
        setPackagesData(res.data);
        console.log("Data: ", res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="packages-section">
      <h2 className="packages-heading">Top Destinations</h2>
      <p className="packages-subheadline">
        Discover the world’s most breathtaking places carefully curated for you.
      </p>

      <div className={`packages-grid ${isMobile ? "mobile-carousel" : ""}`}>
        {!isMobile
          ? packagesData.map((pkg) => <PackageSectionItem key={pkg._id} {...pkg} />)
          : (
            <>
              {packagesData.length > 0 && <PackageSectionItem {...packagesData[currentIndex]} />}
              <div className="carousel-buttons">
                <button
                  className="carousel-btn"
                  onClick={() =>
                    setCurrentIndex(
                      (prev) => (prev - 1 + packagesData.length) % packagesData.length
                    )
                  }
                >
                  &#8592;
                </button>
                <button
                  className="carousel-btn"
                  onClick={() =>
                    setCurrentIndex((prev) => (prev + 1) % packagesData.length)
                  }
                >
                  &#8594;
                </button>
              </div>
            </>
          )}
      </div>
    </section>
  );
};

export default PackagesSection;
