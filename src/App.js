import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './index.css'; // or './App.css' if that's your main CSS


// -------------------- User Pages --------------------
import Home from "./pages/Home";
import UserLayout from "./components/user/layout/UserLayout";
import ContactUs from "./pages/Contact";
import Gallery from "./pages/Gallery";
import UserPackages from "./pages/Packages"; // Renamed for user
import PackageDetailPage from "./pages/Packages/PackageDetailPage";
import Blogs from "./pages/Blogs";
import BlogPage from "./pages/BlogPage";
import ReviewWrite from "./pages/ReviewWrite";
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";

// -------------------- Admin Pages --------------------
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AdminPackages from "./pages/admin/Packages"; // Renamed for admin
import PackageSetup from "./pages/admin/PackageSetup";
import AdminBlogs from "./pages/admin/Blogs";
import BlogSetup from "./pages/admin/BlogSetup"; 
import Popups from "./pages/admin/Popups";
import Contacts from "./pages/admin/Contacts";
import Reviews from "./pages/admin/Reviews";
import Forms from "./pages/admin/Forms";
import Layout from "./components/admin/layout/Layout";
import PrivateRoute from "./components/admin/PrivateRoute";
import TermsConditions from "./pages/Legal/TermsConditions";
import RefundPolicy from "./pages/Legal/RefundPolicy";
import Disclaimer from "./pages/Legal/Disclaimer";
import HeroSectionAdmin from "./pages/admin/HeroSectionAdmin";
import HeroSectionSetup from "./pages/admin/HeroSectionSetup";


function App() {
  return (
    <Router>
      <Routes>

        {/* -------------------- Public User Pages -------------------- */}
        <Route
          path="/"
          element={
            <UserLayout>
              <Home />
            </UserLayout>
          }
        />

        <Route
          path="/packages"
          element={
            <UserLayout>
              <UserPackages />
            </UserLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <UserLayout>
              <ContactUs />
            </UserLayout>
          }
        />

        <Route
          path="/blogs"
          element={
            <UserLayout>
              <Blogs />
            </UserLayout>
          }
        />

        <Route
          path="/gallery"
          element={
            <UserLayout>
              <Gallery />
            </UserLayout>
          }
        />

        <Route path="/blogs/:id" element={<UserLayout><BlogPage /></UserLayout>} />

        <Route
          path="/packages/:slug"
          element={
            <UserLayout>
              <PackageDetailPage /> {/* New single package page */}
            </UserLayout>
          }
        />

        <Route path="/reviews/:name?" element={<UserLayout><ReviewWrite /></UserLayout>} />



        <Route
          path="/legal/privacy-policy"
          element={
            <UserLayout>
              <PrivacyPolicy />
            </UserLayout>
          }
        />

        <Route
          path="/legal/terms-conditions"
          element={
            <UserLayout>
              <TermsConditions />
            </UserLayout>
          }
        />

        <Route
          path="/legal/refund-policy"
          element={
            <UserLayout>
              <RefundPolicy />
            </UserLayout>
          }
        />
        <Route
          path="/legal/Disclaimer"
          element={
            <UserLayout>
              <Disclaimer />
            </UserLayout>
          }
        />

        {/* Admin Login - public */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          {/* Default redirect to dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Packages */}
          <Route path="packages" element={<AdminPackages />} />

          {/* Package Setup */}
          <Route path="package-setup" element={<PackageSetup />} />
          <Route path="package-setup/:id" element={<PackageSetup />} />
          
          {/* Blogs */}
          <Route path='blogs' element={<AdminBlogs />} />

          {/* Blog Setup */}
          <Route path="blog-setup" element={<BlogSetup />} />
          <Route path="blog-setup/:id" element={<BlogSetup />} />

          {/* Popups */}
          <Route path="popups" element={<Popups />} />

          {/* Contacts */}
          <Route path="contacts" element={<Contacts />} />

          {/* Reviews */}
          <Route path="reviews" element={<Reviews />} />

          {/* Forms */}
          <Route path="forms" element={<Forms />} />

          {/* Hero Section */}
          <Route path="hero-section" element={<HeroSectionAdmin />} />

          {/* Hero Section Setup */}
          <Route path="hero-section-setup" element={<HeroSectionSetup />} />
          <Route path="hero-section-setup/:id" element={<HeroSectionSetup />} />

        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
