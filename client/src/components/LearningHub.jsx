// Home.jsx
import React, { useEffect } from "react";
import "../index.css";

const categories = [
  { icon: "👋", title: "Greetings", subtitle: "Learn basic greetings", difficulty: 1 },
  { icon: "🔢", title: "Numbers", subtitle: "Master counting", difficulty: 1 },
  { icon: "🎨", title: "Colours", subtitle: "Express colors", difficulty: 1 },
  { icon: "👨‍👩‍👧‍👦", title: "Family", subtitle: "Talk about family", difficulty: 2 },
  { icon: "😊", title: "Feelings", subtitle: "Express emotions", difficulty: 2 },
  { icon: "🏠", title: "House", subtitle: "Describe home items", difficulty: 2 },
  { icon: "⏰", title: "Time", subtitle: "Tell time", difficulty: 3 },
  { icon: "🔄", title: "Patterns", subtitle: "Learn sign patterns", difficulty: 3 },
  { icon: "👥", title: "People", subtitle: "Describe people", difficulty: 2 },
  { icon: "❓", title: "Questions", subtitle: "Ask questions", difficulty: 3 },
];

const Home = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".category-card");
    cards.forEach((card, i) => {
      card.style.animationDelay = `${i * 0.1}s`;
      card.classList.add("cardEntrance");
      card.addEventListener("click", (e) => {
        const ripple = document.createElement("div");
        ripple.className = "ripple";
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        card.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }, []);

  return (
    <div className="relative font-sans min-h-screen bg-gradient-to-br from-teal-100 via-teal-50 to-white overflow-hidden">
      {/* Particles */}
      <div className="floating-particles">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      <main className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold header-title">Choose Your Learning Path</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Select a category to start your ISL journey and unlock the world of sign language
          </p>
        </header>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <CategoryCard key={idx} category={cat} />
          ))}
        </div>
      </main>
    </div>
  );
};

const CategoryCard = ({ category }) => (
  <div className="category-card relative overflow-hidden bg-white p-6 rounded-2xl shadow-lg cursor-pointer
             transform transition-transform duration-300 hover:scale-105 active:scale-95">
    <div className="category-icon text-4xl mb-4">{category.icon}</div>
    <h3 className="text-xl font-bold mb-2">{category.title}</h3>
    <p className="text-gray-600 text-sm mb-3">{category.subtitle}</p>
    <div className="difficulty-stars flex gap-1 justify-center">
      {Array(3)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            className={`star w-3 h-3 rounded-full ${
              idx < category.difficulty ? "filled" : ""
            }`}
          ></div>
        ))}
    </div>
  </div>
);

export default Home;
