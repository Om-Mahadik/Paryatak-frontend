import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// -------------------- User Pages --------------------
import Home from "./pages/Home";
import UserLayout from "./components/user/layout/UserLayout";
import ContactUs from "./pages/Contact";
import Gallery from "./pages/Gallery";
import UserPackages from "./pages/Packages"; // Renamed for user
import DubaiPackage from "./pages/Packages/DubaiPackage";
import BaliPackage from "./pages/Packages/BaliPackage";
import VietnamPackage from "./pages/Packages/VietnamPackage";
import SriLankaPackage from "./pages/Packages/SriLankaPackage";
import GoldenTrianglePackage from "./pages/Packages/GoldenTrianglePackage";
import HampiPackage from "./pages/Packages/HampiPackage";
import BangaloreMysoreOotyPackage from "./pages/Packages/BangaloreMysoreOotyPackage";
import Blogs from "./pages/Blogs";
import BlogPage from "./pages/BlogPage";

import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";

// -------------------- Admin Pages --------------------
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AdminPackages from "./pages/admin/Packages"; // Renamed for admin
import PackageSetup from "./pages/admin/PackageSetup";
import AdminBlogs from "./pages/admin/Blogs";
import BlogSetup from "./pages/admin/BlogSetup"; 
import Layout from "./components/admin/layout/Layout";
import PrivateRoute from "./components/admin/PrivateRoute";
import TermsConditions from "./pages/Legal/TermsConditions";
import RefundPolicy from "./pages/Legal/RefundPolicy";
import Disclaimer from "./pages/Legal/Disclaimer";


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

        <Route path="/packages/dubai" element={<UserLayout><DubaiPackage /></UserLayout>} />
        <Route path="/packages/bali" element={<UserLayout><BaliPackage /></UserLayout>} />
        <Route path="/packages/vietnam" element={<UserLayout><VietnamPackage /></UserLayout>} />
        <Route path="/packages/sri-lanka" element={<UserLayout><SriLankaPackage /></UserLayout>} />
        <Route path="/packages/golden-triangle" element={<UserLayout><GoldenTrianglePackage /></UserLayout>} />
        <Route path="/packages/hampi" element={<UserLayout><HampiPackage /></UserLayout>} />
        <Route path="/packages/bangalore-mysore-ooty" element={<UserLayout><BangaloreMysoreOotyPackage /></UserLayout>} />

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

        {/* -------------------- Admin Login -------------------- */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* -------------------- Protected Admin Routes -------------------- */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <Layout /> {/* Layout wraps all nested admin pages */}
            </PrivateRoute>
          }
        >
          {/* Nested admin pages */}
          <Route index element={<Navigate to="dashboard" />} /> {/* default page */}

          <Route path="dashboard" element={<Dashboard />} />

          {/* Admin Packages Routes */}
          <Route path="packages" element={<AdminPackages />} />
          <Route path="packages/:id" element={<PackageSetup />} />
          <Route path="packages/new" element={<PackageSetup />} />

          {/* Admin Blogs Routes */}
          <Route path="blogs" element={<adminBlogs />} />
          <Route path="blogs/new" element={<BlogSetup />} />
          <Route path="blogs/:id" element={<BlogSetup />} /> 

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
