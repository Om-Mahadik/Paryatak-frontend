import React from "react";
import HeroSection from "../components/user/Sections/HeroSection";
import ParagraphSection from "../components/user/Sections/ParagraphSection";
import PackagesSection from "../components/user/Sections/PackagesSection";
import WhyChooseUsSection from "../components/user/Sections/WhyChooseUsSection";
import ReviewsSection from "../components/user/Sections/ReviewsSection";
import OurProcessSection from "../components/user/Sections/OurProcessSection";
import FAQSection from "../components/user/contact/FAQSection";
import RotatingEarth from "../components/user/Sections/RotatingEarth";
import EarthSection from "../components/user/Sections/EarthSection";


const Home = () => {
  return (
    <>
      <HeroSection />
      <ParagraphSection />
      <EarthSection />
      <PackagesSection />
      <WhyChooseUsSection />
      <OurProcessSection />
      <ReviewsSection />
      <FAQSection />

    </>
  );
};

export default Home;
