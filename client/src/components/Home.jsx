import React from "react";

const Home = () => {
  return (
    <div className="font-sans">
      {/* HERO SECTION */}
      <section className="text-center py-20 bg-linear-to-b from-white to-teal-50">
        <p className="text-teal-600 font-semibold mb-3">
          🔆 AI-Powered Sign Language Platform
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Bridge the Gap with{" "}
          <span className="text-teal-500">SignBridge</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Real-time translation platform that converts spoken education into
          Indian Sign Language
        </p>

        <div className="flex justify-center space-x-4">
          <button className="bg-teal-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-600 transition">
            Start Learning
          </button>
          <button className="border border-teal-500 text-teal-600 px-6 py-3 rounded-full font-semibold hover:bg-teal-500 hover:text-white transition">
            Sign Up Free
          </button>
        </div>

        {/* <div className="mt-12 bg-linear-to-r from-teal-500 to-cyan-500 rounded-xl shadow-md text-white flex items-center justify-around py-6 mx-auto max-w-3xl">
          <div className="flex flex-col items-center">
            <img src="/teacher-icon.png" alt="" className="w-10 mb-2" />
            <p>Teacher Speaks</p>
          </div>
          <span className="text-3xl">→</span>
          <div className="flex flex-col items-center">
            <img src="/avatar-icon.png" alt="" className="w-10 mb-2" />
            <p>Avatar Signs</p>
          </div>
          <span className="text-3xl">→</span>
          <div className="flex flex-col items-center">
            <img src="/student-icon.png" alt="" className="w-10 mb-2" />
            <p>Student Understands</p>
          </div>
        </div> */}
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            {
              title: "Instant Translation",
              desc: "Real-time speech to sign conversion",
            },
            {
              title: "Accessible Design",
              desc: "Built specifically for deaf users",
            },
            {
              title: "Always Available",
              desc: "Learn and communicate 24/7",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-6 bg-teal-50 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-teal-600 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LEARN & CONNECT SECTION */}
      <section className="py-20 bg-teal-50 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Everything You Need to{" "}
          <span className="text-teal-500">Learn & Connect</span>
        </h2>
        <p className="text-gray-600 mb-10">
          Comprehensive tools for sign language education
        </p>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            {
              title: "Real-Time Translation",
              desc: "Convert speech to ISL with 3D avatars",
            },
            {
              title: "Interactive Learning",
              desc: "Master ISL through lessons and practice",
            },
            {
              title: "ISL Recognition",
              desc: "Convert your signs to text with AI recognition",
            },
            {
              title: "Virtual Classroom",
              desc: "Join live classes with ISL interpretation",
            },
            {
              title: "Speech Practice",
              desc: "Practice with quizzes and feedback",
            },
            {
              title: "Community",
              desc: "Connect and share resources",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-teal-600 mb-2">
                {t.title}
              </h3>
              <p className="text-gray-600 mb-4">{t.desc}</p>
              <button className="text-teal-500 font-semibold hover:underline">
                Explore →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-linear-to-r from-teal-500 to-cyan-500 text-white text-center rounded-t-3xl">
        <h2 className="text-3xl font-bold mb-3">Ready to Get Started?</h2>
        <p className="mb-8 text-teal-100">
          Join thousands of learners bridging the communication gap
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-teal-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Create Free Account
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-teal-600 transition">
            Join Live Class
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
