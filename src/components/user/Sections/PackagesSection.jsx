import React, { useState, useEffect } from "react";
import PackageSectionItem from "./PackageSectionItem";
import "./PackagesSection.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// ✅ Import your service
import { fetchFeaturedPackages } from "../../../services/packageService";

const PackagesSection = () => {
  const [packagesData, setPackagesData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch featured packages
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

  if (loading) return <p className="loading">Loading packages...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section className="packages-section" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h2 className="packages-heading">Top Destinations</h2>
      <p className="packages-subheadline">
        Discover the world’s most breathtaking places carefully curated for you.
      </p>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={isMobile ? 1.1 : 3}
        centeredSlides={true}
        loop={packagesData.length > (isMobile ? 1 : 3)}
        loopFillGroupWithBlank={false} // prevents blank slide at end
        autoplay={{ delay: 2500, disableOnInteraction: false }}
      >
        {packagesData.map((pkg) => (
          <SwiperSlide key={pkg._id} style={{ display: "flex", justifyContent: "center" }}>
            <PackageSectionItem {...pkg} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PackagesSection;
