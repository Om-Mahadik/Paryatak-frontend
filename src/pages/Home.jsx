import React from "react";
import HeroSection from "../components/user/Sections/HeroSection";
import ParagraphSection from "../components/user/Sections/ParagraphSection";
import PackagesSection from "../components/user/Sections/PackagesSection";
import WhyChooseUsSection from "../components/user/Sections/WhyChooseUsSection";
import ReviewsSection from "../components/user/Sections/ReviewsSection";
import OurProcessSection from "../components/user/Sections/OurProcessSection";
import FAQSection from "../components/user/contact/FAQSection";


const Home = () => {
  return (
    <>
      <HeroSection />
      <ParagraphSection />
      <PackagesSection />
      <WhyChooseUsSection />
      <OurProcessSection />
      <FAQSection />
      <ReviewsSection />
    </>
  );
};

export default Home;
