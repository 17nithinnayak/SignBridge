import React, { useEffect } from "react";
import '@google/model-viewer/dist/model-viewer.min.js';


// Hero Section
const Hero = () => {
  useEffect(() => {
    const revealOnScroll = () => {
      document.querySelectorAll(".scroll-reveal").forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add("revealed");
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  const scrollToSection = (selector) => {
    const section = document.querySelector(selector);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
  <section className="text-center py-20 relative bg-gradient-to-br from-teal-100 via-teal-50 to-white overflow-hidden">
    {/* Floating particles */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-[particleFloat_8s_ease-in-out_infinite]"
          style={{ left: `${(i + 1) * 10}%`, animationDelay: `${i}s` }}
        ></div>
      ))}
    </div>

    {/* Header Text */}
    <p className="text-teal-600 font-semibold mb-4 text-lg floating-element relative z-10">
      🔆 AI-Powered Sign Language Platform
    </p>

    {/* 3D Robot in Circle */}
    <div className="flex justify-center mb-8 relative z-10">
      <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-lg bg-transparent border-4 border-teal-400 robot-circle">
        <iframe
  title="Smiling Robot Waving"
  frameBorder="0"
  allowFullScreen
  mozallowfullscreen="true"
  webkitallowfullscreen="true"
  allow="autoplay; fullscreen; xr-spatial-tracking"
  src="https://sketchfab.com/models/0af7e769873d46a68713c34247930ec1/embed?autostart=1&preload=1&ui_hint=0&ui_infos=0&ui_stop=0&ui_watermark=0&ui_controls=0&transparent=1&camera=0&animation=run&spin=1"
  className="absolute top-0 left-0 w-full h-full scale-110"
  style={{ transformOrigin: "center" }}
></iframe>

      </div>
    </div>

    {/* Main Title */}
    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 floating-element relative z-10">
      Bridge the Gap with <span className="text-teal-600">SignBridge</span>
    </h1>

    <p className="text-gray-600 text-xl max-w-3xl mx-auto mb-10 px-4 floating-element relative z-10">
      Real-time translation platform that converts spoken education into Indian Sign Language
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row justify-center gap-6 px-4 mb-16 z-10 relative">
      <button
        className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
        onClick={() => scrollToSection("#features")}
      >
        Start Learning
      </button>
      <button
        className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
        onClick={() => scrollToSection("#cta")}
      >
        Sign Up Free
      </button>
    </div>

    {/* Process Flow */}
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl mx-auto relative z-10 border border-gray-200">
      <div className="flex flex-col lg:flex-row items-center justify-around gap-8">
        <ProcessStep icon="🎤" title="Teacher Speaks" subtitle="Natural speech input" bg="bg-blue-100" />
        <Arrow />
        <ProcessStep icon="🤖" title="AI Processes" subtitle="Real-time conversion" bg="bg-teal-600" textWhite />
        <Arrow />
        <ProcessStep icon="👨‍🎓" title="Student Learns" subtitle="Perfect understanding" bg="bg-green-100" />
      </div>
    </div>
  </section>
);

};

// Process Step Component
const ProcessStep = ({ icon, title, subtitle, bg, textWhite }) => (
  <div className="flex flex-col items-center process-step">
    <div className={`w-16 h-16 ${bg} rounded-full flex items-center justify-center mb-4`}>
      <span className={`text-3xl ${textWhite ? "text-white" : ""}`}>{icon}</span>
    </div>
    <p className="font-bold text-gray-900 text-lg">{title}</p>
    <p className="text-gray-600 text-sm">{subtitle}</p>
  </div>
);

const Arrow = () => (
  <>
    <div className="text-4xl text-teal-600 hidden lg:block">→</div>
    <div className="text-4xl text-teal-600 lg:hidden">↓</div>
  </>
);

// Features Section
const Features = () => (
  <section id="features" className="py-20 bg-gray-50">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-16 scroll-reveal">
        Powerful Features for <span className="text-teal-600">Everyone</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard icon="⚡" title="Instant Translation" subtitle="Real-time speech to sign conversion with advanced AI technology" color="bg-teal-100" />
        <FeatureCard icon="♿" title="Accessible Design" subtitle="Built specifically for deaf users with clean, intuitive interface" color="bg-cyan-100" />
        <FeatureCard icon="🕒" title="Always Available" subtitle="Learn and communicate 24/7 with our platform" color="bg-blue-100" />
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon, title, subtitle, color }) => (
  <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 scroll-reveal">
    <div className={`w-16 h-16 ${color} rounded-xl flex items-center justify-center mb-6 mx-auto`}>
      <span className="text-3xl">{icon}</span>
    </div>
    <h3 className="text-xl font-bold mb-4 text-center text-gray-900">{title}</h3>
    <p className="text-center text-gray-600">{subtitle}</p>
  </div>
);

// CTA Section
const CTA = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section id="cta" className="py-20 bg-teal-600 text-center text-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-6 scroll-reveal">Ready to Start Your Journey?</h2>
        <p className="text-xl mb-10 opacity-90 scroll-reveal">Join thousands of learners already using SignBridge to break communication barriers</p>
        <button
          className="bg-white text-teal-600 px-10 py-4 rounded-lg font-bold text-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 scroll-reveal"
          onClick={scrollToTop}
        >
          Get Started Today
        </button>
      </div>
    </section>

    
  );
};

// Learn & Connect Section
const LearnConnect = () => (
  <section className="py-20 bg-white">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4 scroll-reveal">
        Everything You Need to <span className="text-teal-600">Learn & Connect</span>
      </h2>
      <p className="text-gray-600 text-xl px-4 scroll-reveal">
        Comprehensive tools for sign language education
      </p>
    </div>

    <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
      <LearnCard icon="🔄" title="Real-Time Translation" subtitle="Convert speech to ISL with 3D avatars" color="bg-teal-100 text-teal-600" />
      <LearnCard icon="📚" title="Interactive Learning" subtitle="Master ISL through lessons and practice" color="bg-cyan-100 text-cyan-600" />
      <LearnCard icon="👁️" title="ISL Recognition" subtitle="Convert your signs to text with AI recognition" color="bg-blue-100 text-blue-600" />
      <LearnCard icon="🏫" title="Virtual Classroom" subtitle="Join live classes with ISL interpretation" color="bg-emerald-100 text-emerald-600" />
      <LearnCard icon="🗣️" title="Speech Practice" subtitle="Practice with quizzes and feedback" color="bg-sky-100 text-sky-600" />
      <LearnCard icon="👥" title="Community" subtitle="Connect and share resources" color="bg-indigo-100 text-indigo-600" />
    </div>
  </section>
);

// Learn Card Component
const LearnCard = ({ icon, title, subtitle, bgColor, textColor }) => (
  <div
    className={`
      bg-white p-6 rounded-xl border-2 border-gray-200 
      hover:border-teal-500 hover:shadow-lg 
      transition-all duration-300 hover:-translate-y-1 scroll-reveal
    `}
  >
    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${bgColor} ${textColor}`}>
      <span className="text-2xl">{icon}</span>
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{subtitle}</p>
  </div>
);



// Main App
const App = () => {
  return (
    <main className="font-sans overflow-x-hidden">
      
    
{/* 3D Robot Only (Transparent Background) */}
{/* 3D Robot Centered Inside a Circle */}
{/* <section className="flex items-center justify-center py-12 bg-transparent">
  <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-lg bg-transparent border-4 border-teal-400">
    <iframe
      title="Smiling Robot Waving"
      frameBorder="0"
      allowFullScreen
      mozallowfullscreen="true"
      webkitallowfullscreen="true"
      allow="autoplay; fullscreen; xr-spatial-tracking"
      src="https://sketchfab.com/models/0af7e769873d46a68713c34247930ec1/embed?autostart=1&preload=1&ui_hint=0&ui_infos=0&ui_stop=0&ui_watermark=0&ui_controls=0&transparent=1"
      className="absolute top-0 left-0 w-full h-full scale-110"
      style={{
        transformOrigin: "center",
      }}
    ></iframe>
  </div>
</section> */}

      <Hero />
      <Features />
      <LearnConnect />
      <CTA />
    </main>
  );
};

export default App;




