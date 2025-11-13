import React, { useState } from "react";
import { Camera, Zap, TrendingUp, Lightbulb } from "lucide-react";

const ISLRecognition = () => {
  const [cameraEnabled, setCameraEnabled] = useState(false);

  const handleCameraToggle = () => {
    setCameraEnabled(!cameraEnabled);
  };

  const signs = [
    { label: "Hello", confidence: 95 },
    { label: "Thank you", confidence: 88 },
    { label: "Please", confidence: 92 },
    { label: "Help", confidence: 85 },
  ];

  return (
    <div className="px-6 md:px-16 lg:px-32 py-10 bg-[#f8fcfc] min-h-screen">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-1 rounded-full font-medium text-sm mb-3">
          <Zap size={16} />
          AI-Powered Recognition
        </div>
        <h1 className="text-4xl font-bold text-teal-700 mb-3">
          ISL Recognition
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Convert your sign language gestures to text in real-time with AI
          recognition
        </p>
      </div>

      {/* Camera and Recognition Boxes */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Camera Feed */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center text-center">
          {cameraEnabled ? (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-xl">
              <Camera size={48} className="text-gray-500" />
              <span className="ml-2 text-gray-600">Camera Feed Active</span>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 w-full">
              <Camera size={48} className="text-teal-500 mb-3 mx-auto" />
              <p className="text-gray-600 mb-4">Camera is currently disabled</p>
              <button
                onClick={handleCameraToggle}
                className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition"
              >
                Enable Camera
              </button>
            </div>
          )}
        </div>

        {/* Recognized Text */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 text-center flex flex-col justify-center">
          <p className="text-gray-500 text-lg">
            {cameraEnabled
              ? "Recognition active... (Your gestures will appear as text)"
              : "Start recognition to see results"}
          </p>
        </div>
      </div>

      {/* Common Signs Detected */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-left">
          Common Signs Detected
        </h2>
        <div className="flex flex-wrap gap-4">
          {signs.map((sign, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-xl text-sm font-medium"
            >
              <TrendingUp size={16} className="text-teal-600" />
              {sign.label} — <span className="text-gray-600">{sign.confidence}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3 text-teal-700 font-semibold">
          <Lightbulb size={18} />
          Tips for Better Recognition
        </div>
        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 text-left">
          <li>Ensure good lighting conditions for accurate detection</li>
          <li>Keep your hands visible within the camera frame</li>
          <li>Make clear, deliberate signs for better accuracy</li>
          <li>Use a plain background for improved recognition</li>
        </ul>
      </div>
    </div>
  );
};

export default ISLRecognition;
