
// import React, { useState, useMemo } from 'react';
// import signLanguageData from '../Data/signLanguageData.js';

// // --- Updated Video Renderer ---
// const VideoRenderer = ({ item }) => {
//   const isMp4 = item.videoId.includes('.mp4');

//   // YouTube embed URL with minimal decorations
//   const youtubeEmbedUrl = `https://www.youtube.com/embed/${item.videoId}?controls=1&rel=0&modestbranding=1&showinfo=0`;

//   return (
//     <div className="w-full h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden bg-gray-100">
//       {isMp4 ? (
//         <video
//           src={item.videoId}
//           controls
//           className="w-full h-full object-cover"
//         />
//       ) : (
//         <iframe
//           title={item.title}
//           src={youtubeEmbedUrl}
//           frameBorder="0"
//           allow="autoplay; encrypted-media"
//           allowFullScreen
//           className="w-full h-full"
//         />
//       )}
//     </div>
//   );
// };

// // --- SignLanguageDictionary Component ---
// const SignLanguageDictionary = () => {
//   const allCategories = ['All', ...Object.keys(signLanguageData)];

//   const [activeCategory, setActiveCategory] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');

//   const flatData = useMemo(() => {
//     return Object.entries(signLanguageData).flatMap(([category, items]) =>
//       items.map(item => ({ ...item, category }))
//     );
//   }, []);

//   const filteredSigns = useMemo(() => {
//     let result = flatData;

//     if (activeCategory !== 'All') {
//       result = result.filter(item => item.category === activeCategory);
//     }

//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(item =>
//         item.title.toLowerCase().includes(query)
//       );
//     }

//     const groupedResult = {};
//     result.forEach(item => {
//       if (!groupedResult[item.category]) groupedResult[item.category] = [];
//       groupedResult[item.category].push(item);
//     });

//     return groupedResult;
//   }, [activeCategory, searchQuery, flatData]);

//   const displayCategories = Object.keys(filteredSigns);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto p-4 sm:p-6">
//         {/* Search Bar */}
//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder="🔍 Search signs (e.g., 'hello', 'work')"
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               setActiveCategory('All');
//             }}
//             className="w-full p-3 border border-teal-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 transition duration-150"
//           />
//         </div>

//         {/* Category Tabs */}
//         <div className="flex flex-wrap gap-2 mb-8 p-3 bg-white rounded-xl shadow-md sticky top-24 z-10 overflow-x-auto">
//           {allCategories.map(cat => (
//             <button
//               key={cat}
//               onClick={() => {
//                 setActiveCategory(cat);
//                 setSearchQuery('');
//               }}
//               className={`px-4 py-2 rounded-full font-medium text-sm transition-colors duration-200 whitespace-nowrap
//                 ${activeCategory === cat
//                   ? 'bg-teal-700 text-white shadow-md'
//                   : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
//                 }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* No Results */}
//         {searchQuery && displayCategories.length === 0 && (
//           <p className="text-center text-gray-500 text-lg mt-10">
//             No signs found matching "{searchQuery}". Try a different term.
//           </p>
//         )}

//         {/* Display Filtered Signs */}
//         {displayCategories.map(categoryName => (
//           <section key={categoryName} className="mb-10">
//             <h2 className="text-2xl font-semibold text-teal-700 border-b-2 border-teal-300 pb-2 mb-4 mt-6">
//               {categoryName}
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//               {filteredSigns[categoryName].map(item => (
//                 <div
//                   key={item.id}
//                   className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
//                 >
//                   {/* Item Title */}
//                   <span className="bg-teal-50 text-teal-700 px-4 py-2 rounded-full font-medium text-sm mb-4 text-center">
//                     {item.title}
//                   </span>

//                   {/* Video */}
//                   <VideoRenderer item={item} />
//                 </div>
//               ))}
//             </div>
//           </section>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SignLanguageDictionary;
import React from "react";
import { useNavigate } from "react-router-dom";

const levelsData = [
  {
    id: "basic",
    title: "Basic",
    emoji: "🌱",
    description: "Perfect for beginners starting their sign language journey.",
    hoverBg: "#d1fae5", // pale green
    route: "/learner/basic",
  },
  {
    id: "intermediate",
    title: "Intermediate",
    emoji: "🚀",
    description: "Build on your foundation with complex sentences and skills.",
    hoverBg: "#fef9c3", // pale yellow
    route: "/learner/intermediate",
  },
  {
    id: "advanced",
    title: "Advanced",
    emoji: "🏆",
    description: "Master professional communication and cultural nuances.",
    hoverBg: "#ffedd5", // pale orange
    route: "/learner/advanced",
  },
];

const LearningLevels = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans p-6 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-blue-400">
          Choose Your Learning Level
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Select a level to start your personalized learning journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {levelsData.map((level) => (
          <div
            key={level.id}
            className="level-card relative bg-white p-6 rounded-2xl border-2 border-teal-500 cursor-pointer flex flex-col items-center text-center transition-all duration-300"
            style={{ transition: "background-color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = level.hoverBg)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
            onClick={() => navigate(level.route)} // navigate to the correct route
          >
            <div className="text-5xl mb-4">{level.emoji}</div>
            <h2 className="text-2xl font-semibold mb-2">{level.title}</h2>
            <p className="text-gray-600">{level.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningLevels;