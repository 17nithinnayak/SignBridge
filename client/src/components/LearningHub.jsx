import React from "react";
import { BookOpen, Award, Activity, Leaf, Sprout, TreePine } from "lucide-react";

const LearningHub = () => {
  return (
    <div className="px-6 md:px-16 lg:px-32 py-10 bg-[#f8fcfc] min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-1 rounded-full font-medium text-sm mb-3">
          <Activity size={16} />
          Interactive Learning Platform
        </div>
        <h1 className="text-4xl font-bold text-teal-700 mb-3">Learning Hub</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Master Indian Sign Language through interactive subjects and structured learning paths.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="flex items-center justify-between bg-white shadow-sm rounded-2xl px-6 py-4">
          <div className="flex items-center gap-3">
            <BookOpen className="text-teal-500" size={28} />
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">12</h3>
              <p className="text-gray-500 text-sm">Lessons Completed</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white shadow-sm rounded-2xl px-6 py-4">
          <div className="flex items-center gap-3">
            <Activity className="text-purple-500" size={28} />
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">45%</h3>
              <p className="text-gray-500 text-sm">Overall Progress</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-white shadow-sm rounded-2xl px-6 py-4">
          <div className="flex items-center gap-3">
            <Award className="text-amber-500" size={28} />
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">8</h3>
              <p className="text-gray-500 text-sm">Certificates Earned</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Your Subject</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        {[
          {
            title: "Mathematics",
            desc: "Learn math concepts through ISL",
            lessons: 24,
            color: "from-blue-500 to-blue-400",
          },
          {
            title: "Science",
            desc: "Explore scientific principles in ISL",
            lessons: 32,
            color: "from-green-500 to-emerald-400",
          },
          {
            title: "Social Studies",
            desc: "Understand society and culture",
            lessons: 28,
            color: "from-pink-500 to-purple-400",
          },
        ].map((subject) => (
          <div
            key={subject.title}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div
              className={`w-12 h-12 rounded-xl bg-linear-to-r ${subject.color} flex items-center justify-center text-white text-xl font-bold mb-4`}
            >
              {subject.title.charAt(0)}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {subject.title}
            </h3>
            <p className="text-gray-500 text-sm mb-3">{subject.desc}</p>
            <p className="text-gray-400 text-xs mb-4">
              {subject.lessons} Lessons Available
            </p>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Progress 0%</p>
              <button className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-teal-600 transition">
                Start Learning
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Learning Path Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">ISL Learning Path</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Beginner",
            desc: "Basic ISL fundamentals",
            icon: <Sprout className="text-green-500" size={32} />,
          },
          {
            title: "Intermediate",
            desc: "Build your skills",
            icon: <Leaf className="text-emerald-600" size={32} />,
          },
          {
            title: "Advanced",
            desc: "Master complex signs",
            icon: <TreePine className="text-teal-600" size={32} />,
          },
        ].map((level) => (
          <div
            key={level.title}
            className="bg-white rounded-2xl p-6 shadow-sm text-center hover:shadow-md transition"
          >
            <div className="flex justify-center mb-3">{level.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {level.title}
            </h3>
            <p className="text-gray-500 text-sm mb-4">{level.desc}</p>
            <button className="bg-teal-50 text-teal-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-teal-100 transition">
              Start Level
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningHub;
