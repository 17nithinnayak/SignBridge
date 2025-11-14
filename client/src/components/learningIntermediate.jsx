
import React, { useState, useMemo } from "react";
import signLanguageData from "../Data/signLanguageData.js";

// --- Inline Video Renderer ---
const VideoRenderer = ({ item }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const isMp4 = item.videoId.includes(".mp4");

  // YouTube embed URL with minimal UI
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${item.videoId}?autoplay=1&controls=0&rel=0&modestbranding=1&showinfo=0&loop=1&playlist=${item.videoId}`;

  return (
    <div
      className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-lg shadow-lg flex items-center justify-center cursor-pointer overflow-hidden relative"
      onClick={() => setIsPlaying(true)}
      title={`Play: ${item.title}`}
    >
      {!isPlaying ? (
        // Thumbnail or icon before click
        <span className="text-xl font-bold text-teal-600">
          {item.icon || item.title}
        </span>
      ) : isMp4 ? (
        <video
          src={item.videoId}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <iframe
          title={item.title}
          src={youtubeEmbedUrl}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  );
};

// --- SignLanguageDictionary Component ---
const SignLanguageDictionary = () => {
  const allCategories = ["All", ...Object.keys(signLanguageData)];

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Flatten all categories into a single array
  const flatData = useMemo(() => {
    return Object.entries(signLanguageData).flatMap(([category, items]) =>
      items.map((item) => ({ ...item, category }))
    );
  }, []);

  // Filtered and grouped signs
  const filteredSigns = useMemo(() => {
    let result = flatData;

    if (activeCategory !== "All") {
      result = result.filter((item) => item.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) =>
        item.title.toLowerCase().includes(query)
      );
    }

    const groupedResult = {};
    result.forEach((item) => {
      if (!groupedResult[item.category]) groupedResult[item.category] = [];
      groupedResult[item.category].push(item);
    });

    return groupedResult;
  }, [activeCategory, searchQuery, flatData]);

  const displayCategories = Object.keys(filteredSigns);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search signs (e.g., 'hello', 'work')"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setActiveCategory("All");
            }}
            className="w-full p-3 border border-teal-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 transition duration-150"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-3 bg-white rounded-xl shadow-md  top-24 z-10 overflow-x-auto">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSearchQuery("");
              }}
              className={`
                px-4 py-2 rounded-full font-medium text-sm transition-colors duration-200 whitespace-nowrap
                ${
                  activeCategory === cat
                    ? "bg-teal-700 text-white shadow-md"
                    : "bg-teal-50 text-teal-700 hover:bg-teal-100"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* No Results */}
        {searchQuery && displayCategories.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-10">
            No signs found matching "{searchQuery}". Try a different term.
          </p>
        )}

        {/* Display Filtered Signs */}
        {displayCategories.map((categoryName) => (
          <section key={categoryName} className="mb-10">
            <h2 className="text-2xl font-semibold text-teal-700 border-b-2 border-teal-300 pb-2 mb-4 mt-6">
              {categoryName}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredSigns[categoryName].map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  

                  {/* Inline Video Renderer */}
                  <VideoRenderer item={item} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default SignLanguageDictionary;