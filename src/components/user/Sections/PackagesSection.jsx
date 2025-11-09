import React, { useState, useEffect } from "react";
import PackageSectionItem from "./PackageSectionItem";
import "./PackagesSection.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { fetchFeaturedPackages } from "../../../services/packageService";

const PackagesSection = () => {
  const [packagesData, setPackagesData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const getFeaturedPackages = async () => {
      try {
        setLoading(true);
        const data = await fetchFeaturedPackages();
        setPackagesData(data);
      } catch (err) {
        setError("Failed to fetch featured packages");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getFeaturedPackages();
  }, []);

  if (error) return <p className="error">{error}</p>;

  return (
    <section className="packages-section">
      <div className="packages-header">
        <div>
          <h2 className="packages-heading">Featured Packages</h2>
          <p className="packages-subheadline">
            Discover the world’s most breathtaking places<br></br>curated just for you.
          </p>
        </div>
        <button className="view-all-btn">View All</button>
      </div>

      {loading ? (
        <div className="packages-skeleton">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="skeleton-card"></div>
          ))}
        </div>
      ) : (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={isMobile ? 1.1 : 3}
          centeredSlides={true}
          loop={packagesData.length > (isMobile ? 1 : 3)}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
        >
          {packagesData.map((pkg) => (
            <SwiperSlide key={pkg._id} style={{ display: "flex", justifyContent: "center" }}>
              <PackageSectionItem {...pkg} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default PackagesSection;
