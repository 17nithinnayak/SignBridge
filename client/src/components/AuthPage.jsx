import React, { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icon2.jpeg";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder — handle actual login/signup logic here
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-white to-teal-50 px-4">
      <div className="bg-white shadow-lg rounded-3xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img src={logo} alt="SignBridge" className="w-12 h-12 mr-2 rounded-full" />
          <h1 className="text-2xl font-bold text-teal-600">SignBridge</h1>
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">
          {isLogin ? "Welcome Back 👋" : "Create an Account"}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {isLogin
            ? "Login to continue your ISL learning journey"
            : "Join SignBridge to start learning and connecting"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-lg transition"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-gray-600 text-sm mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-teal-600 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
