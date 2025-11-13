import React, { useState } from "react";
import { Upload, FileVideo, FileAudio, CheckCircle } from "lucide-react";

const VideoTranslator = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      alert("File uploaded successfully! (demo only)");
    }, 1500);
  };

  return (
    <div className="px-6 md:px-16 lg:px-32 py-10 bg-[#f8fcfc] min-h-screen text-center">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-1 rounded-full font-medium text-sm mb-3">
          <FileVideo size={16} />
          AI-Powered Translation
        </div>
        <h1 className="text-4xl font-bold text-teal-700 mb-3">
          Video Translator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload videos or audio files for instant ISL translation with animated
          avatars.
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-3xl mx-auto">
        <h2 className="text-left text-xl font-semibold text-gray-800 mb-4">
          Upload Your File
        </h2>

        <label
          htmlFor="fileUpload"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl py-16 cursor-pointer hover:border-teal-400 transition"
        >
          {file ? (
            <div className="flex flex-col items-center space-y-3">
              <CheckCircle className="text-green-500" size={48} />
              <p className="text-lg font-medium text-gray-700">
                {file.name}
              </p>
              <p className="text-sm text-gray-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <>
              <Upload className="text-teal-500 mb-4" size={48} />
              <p className="text-gray-600 font-medium mb-1">
                Drag & drop your file here
              </p>
              <p className="text-sm text-gray-400 mb-4">or click to browse</p>
              <div className="bg-teal-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-teal-600 transition">
                Choose File
              </div>
            </>
          )}
          <input
            id="fileUpload"
            type="file"
            accept=".mp4,.avi,.mp3,.wav"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <p className="text-sm text-gray-400 mt-4">
          Supports: MP4, AVI, MP3, WAV (Max 100MB)
        </p>

        {file && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`px-6 py-2 rounded-full font-semibold text-white transition ${
                uploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600"
              }`}
            >
              {uploading ? "Uploading..." : "Upload File"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoTranslator;
