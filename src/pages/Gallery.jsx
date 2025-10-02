import React, { useState, useEffect } from "react";
import "./Gallery.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// Import your packages
import { baliGroupPackage } from "../data/packages/baliGroupPackage";
import { bangaloreMysoreOotyPackage } from "../data/packages/bangaloreMysoreOotyPackage";
import { dubaiPackage } from "../data/packages/dubaiPackage";
import { goldenTrianglePackage } from "../data/packages/goldenTrianglePackage";
import { hampiBadamiPackage } from "../data/packages/hampiBadamiPackage";
import { sriLankaGroupPackage } from "../data/packages/sriLankaGroupPackage";
import { vietnamExpressPackage } from "../data/packages/vietnamExpressPackage";

const Gallery = () => {
  const allPackages = [
    baliGroupPackage,
    bangaloreMysoreOotyPackage,
    dubaiPackage,
    goldenTrianglePackage,
    hampiBadamiPackage,
    sriLankaGroupPackage,
    vietnamExpressPackage,
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="gallery-section">
      <h2 className="gallery-heading">Our Tour Packages</h2>
      <p className="gallery-subheadline">Explore each destination through our curated gallery</p>

      {allPackages.map((pkg, index) => (
        <div key={pkg.id || pkg.title} className="package-slider-wrapper">
          <div className="package-header">
            <h3 className="package-title">{pkg.title}</h3>
            <span className="package-duration-pill">{pkg.days}D / {pkg.nights}N</span>
          </div>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={15}
            slidesPerView={isMobile ? 1.2 : 2}
            loop={pkg.gallery.length > (isMobile ? 1 : 2)}
            freeMode={true}
            freeModeMomentum={false}
            speed={12000} // slow smooth scroll
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: index % 2 === 1 ? true : false, // ✅ fixed
            }}
            centeredSlides={true}
            grabCursor={true}
          >
            {[...pkg.gallery, ...pkg.gallery].map((imgUrl, idx) => (
              <SwiperSlide key={idx} style={{ display: "flex", justifyContent: "center" }}>
                <div className="gallery-item">
                  <img src={imgUrl} alt={`Slide ${idx}`} className="gallery-img" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </section>
  );
};

export default Gallery;
