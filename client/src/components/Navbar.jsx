import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpenText,
  Video,
  GraduationCap,
  UsersRound,
  Home,
  LogIn,
  Brain,
  Camera,
} from "lucide-react";
import logo from "../assets/icon2.jpeg";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-8 bg-white shadow-sm sticky top-0 z-50">
      {/* Logo + Title */}
      <Link to="/" className="flex items-center space-x-2">
<img
  src={logo}
  alt="SignBridge Logo"
  className="w-10 h-10 rounded-full object-cover"
/>
        <h1 className="text-xl font-bold text-teal-600">SignBridge</h1>
      </Link>

      {/* Menu */}
      <ul className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
        <li>
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-teal-600 transition"
          >
            <Home size={18} /> Home
          </Link>
        </li>
        <li>
          <Link
            to="/learning-hub"
            className="flex items-center gap-2 hover:text-teal-600 transition"
          >
            <BookOpenText size={18} /> Learning Hub
          </Link>
        </li>
        <li>
          <Link
            to="/video-translator"
            className="flex items-center gap-2 hover:text-teal-600 transition"
          >
            <Video size={18} /> Video Translator
          </Link>
        </li>
        <li>
          <Link
            to="/isl-recognition"
            className="flex items-center gap-2 hover:text-teal-600 transition"
          >
            <Camera size={18} /> ISL Recognition
          </Link>
        </li>
        <li>
          <Link
            to="/practice"
            className="flex items-center gap-2 hover:text-teal-600 transition"
          >
            <Brain size={18} /> Practice
          </Link>
        </li>
        <li>
          <Link
            to="/community"
            className="flex items-center gap-2 hover:text-teal-600 transition"
          >
            <UsersRound size={18} /> Community
          </Link>
        </li>
      </ul>

      {/* Sign In Button */}
      <Link
        to="/login"
        className="flex items-center gap-2 bg-teal-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-teal-600 transition"
      >
        <LogIn size={18} /> Sign In
      </Link>
    </nav>
  );
};

export default Navbar;
