import React from "react";

const Footer = () => {
  return (
    <footer className="py-6 bg-white text-center text-gray-500 text-sm mt-auto border-t">
      © {new Date().getFullYear()} SignBridge. All rights reserved.
    </footer>
  );
};

export default Footer;
