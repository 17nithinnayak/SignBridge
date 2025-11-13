import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800 bg-gray-50">
      {/* Navbar stays fixed at the top */}
      <Navbar />

      {/* Main content area */}
      <main className="flex-1">
        <Outlet /> {/* Page-specific content will load here */}
      </main>

      {/* Footer stays common */}
      <Footer />
    </div>
  );
};

export default Layout;
