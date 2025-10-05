import React, { useState, useEffect } from "react";
import PackageSectionItem from "./PackageSectionItem";
import "./PackagesSection.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const PackagesSection = () => {
  // All packages (international + national)
  const packagesData = [
    // International
    {
      _id: "dubai-1",
      title: "Dubai",
      country: "UAE",
      description:
        "Explore the luxurious city of Dubai with iconic skyscrapers and desert adventures.",
      thumbnail:
        "https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg",
      rating: 5,
      link: "/packages/dubai",
    },
    {
      _id: "bali-1",
      title: "Bali",
      country: "Indonesia",
      description:
        "Relax on pristine beaches, explore temples, and enjoy tropical vibes.",
      thumbnail: "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg",
      rating: 5,
      link: "/packages/bali",
    },
    {
      _id: "vietnam-1",
      title: "Vietnam",
      country: "Vietnam",
      description:
        "Experience cultural richness, beautiful landscapes, and delicious cuisine.",
      thumbnail:
        "https://images.pexels.com/photos/4652275/pexels-photo-4652275.jpeg",
      rating: 4,
      link: "/packages/vietnam",
    },
    {
      _id: "sri-lanka-1",
      title: "Sri Lanka",
      country: "Sri Lanka",
      description:
        "Discover cultural heritage, scenic landscapes, and serene beaches in Sri Lanka.",
      thumbnail:
        "https://images.pexels.com/photos/1738611/pexels-photo-1738611.jpeg",
      rating: 5,
      link: "/packages/sri-lanka",
    },
    // National
    {
      _id: "golden-triangle-1",
      title: "Golden Triangle",
      country: "India",
      description:
        "Explore Delhi, Agra, Jaipur with rich cultural heritage and history.",
      thumbnail:
        "https://images.pexels.com/photos/602607/pexels-photo-602607.png",
      rating: 5,
      link: "/packages/golden-triangle",
    },
    {
      _id: "hampi-1",
      title: "Hampi",
      country: "India",
      description:
        "Discover ancient ruins, stunning landscapes, and vibrant culture in Hampi.",
      thumbnail:
        "https://images.pexels.com/photos/106359/pexels-photo-106359.jpeg",
      rating: 5,
      link: "/packages/hampi",
    },
    {
      _id: "bangalore-1",
      title: "Bangalore & Mysore",
      country: "India",
      description:
        "Enjoy modern city vibes in Bangalore and royal heritage in Mysore.",
      thumbnail:
        "https://images.pexels.com/photos/1619657/pexels-photo-1619657.jpeg",
      rating: 4,
      link: "/packages/bangalore-mysore",
    },
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          <SwiperSlide
            key={pkg._id}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <PackageSectionItem {...pkg} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PackagesSection;
