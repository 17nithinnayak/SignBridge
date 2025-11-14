import React, { useState, useEffect } from "react";

function ProfilePage() {
  const [streak, setStreak] = useState(0);
  const [progress, setProgress] = useState({
    Greetings: 2,
    Numbers: 5,
    Colours: 1,
  });

  useEffect(() => {
    // load streak from localStorage
    const stored = localStorage.getItem("islStreak");
    if (stored) setStreak(Number(stored));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p className="mb-2">Current Streak: <span className="font-bold">{streak} days</span></p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Progress</h3>
      <div className="space-y-2">
        {Object.keys(progress).map((cat) => (
          <div key={cat} className="w-full bg-gray-200 rounded h-6">
            <div
              className="bg-teal-600 h-6 rounded"
              style={{ width: `${(progress[cat] / 5) * 100}%` }}
            ></div>
            <span className="absolute ml-2 text-white font-bold">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
