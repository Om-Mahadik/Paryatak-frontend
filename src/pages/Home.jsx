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
import FeaturesSection from "../components/user/Sections/FeaturesSection";
import CardDisplay from "../components/user/new sections/CardDisplay";
import HeroVideoSection from "../components/user/new sections/HeroVideoSection";
import LogoMarquee from "../components/user/new sections/LogoMarquee";
import AvatarGroup from "../components/user/new sections/AvatarGroup";
import ProcessSteps from "../components/user/new sections/ProcessSteps";
import AnimatedStepsList from "../components/user/new sections/AnimatedStepsList";
import BentoGrid from "../components/user/new sections/BentoGrid";
import ProgressBar from "../components/user/new sections/ProgressBar";
import StatsSection from "../components/user/new sections/StatsSection";
import WinterOfferSection from "../components/user/new sections/WinterOfferSection";


const Home = () => {
  return (
    <>
      <HeroVideoSection />
      <LogoMarquee />
      <AvatarGroup />
      <PackagesSection />
      <StatsSection />
      <ParagraphSection />
      <CardDisplay />
      <FeaturesSection />

      
      <EarthSection />
      <OurProcessSection />
      <ReviewsSection />
      <HeroSection />
      <WhyChooseUsSection />
      <FAQSection />
      
      



    </>
  );
};

export default Home;
