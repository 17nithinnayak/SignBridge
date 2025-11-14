import React, { useState } from "react";
import QuizPlayer from "./Quiz.jsx";

const LessonPath = () => {
  const totalSteps = 8;

  const [currentProgress, setCurrentProgress] = useState({
    completed: [],
    current: 1,
    total: totalSteps,
  });

  // Track active lesson
  const [activeLesson, setActiveLesson] = useState(null);

  // Store scores per lesson
  const [scores, setScores] = useState({}); // { lessonId: score }

  const completeStep = (stepId, score = 0) => {
    if (!currentProgress.completed.includes(stepId)) {
      const newCompleted = [...currentProgress.completed, stepId];
      const next = stepId + 1 <= totalSteps ? stepId + 1 : stepId;
      setCurrentProgress({ completed: newCompleted, current: next, total: totalSteps });
    }

    if (score >= 0) {
      setScores((prev) => ({ ...prev, [stepId]: score }));
    }
  };

  const resetProgress = () => {
    setCurrentProgress({ completed: [], current: 1, total: totalSteps });
    setScores({});
    setActiveLesson(null);
  };

  const lessonSteps = Array.from({ length: totalSteps }, (_, idx) => ({
    id: idx + 1,
    title: `Lesson ${idx + 1}`,
    emoji: ["👋", "😊", "🌍", "💡", "📚", "🔥", "🎯", "🏆"][idx],
  }));

  const getStepStatus = (id) => {
    if (currentProgress.completed.includes(id)) return "completed";
    if (id === currentProgress.current) return "current";
    return "locked";
  };

  const stepPositions = lessonSteps.map((_, idx) => ({
    left: idx % 2 === 0 ? "60px" : "280px",
    top: `${idx * 120}px`,
  }));

  if (activeLesson) {
    return (
      <QuizPlayer
        lessonId={activeLesson}
        onBack={() => setActiveLesson(null)}
        onCompleteLesson={(id, score) => {
          completeStep(id, score);
          setActiveLesson(null);
        }}
      />
    );
  }

  // Calculate total score
  const totalScore = Object.values(scores).reduce((acc, val) => acc + val, 0);

  return (
    <div className="min-h-screen font-sans bg-linear-to-b from-teal-50 to-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-teal-700 mb-4">Greetings Learning Path</h1>

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-6">
        <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-4 bg-teal-500 rounded-full transition-all duration-500"
            style={{
              width: `${(currentProgress.completed.length / totalSteps) * 100}%`,
            }}
          />
        </div>
        <p className="mt-2 text-gray-700 text-center font-medium">
          {currentProgress.completed.length} of {totalSteps} lessons completed
        </p>
        <p className="mt-1 text-center text-teal-700 font-semibold">
          Total Score: {totalScore}
        </p>
      </div>

      {/* Zig-Zag Road */}
      <div className="relative w-full max-w-md h-[1000px]">
        <svg className="absolute inset-0 w-full h-full">
          {stepPositions.map((pos, idx) => {
            if (idx === stepPositions.length - 1) return null;
            const next = stepPositions[idx + 1];
            return (
              <line
                key={idx}
                x1={parseInt(pos.left) + 40}
                y1={parseInt(pos.top) + 40}
                x2={parseInt(next.left) + 40}
                y2={parseInt(next.top) + 40}
                stroke="#0d9488"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="8 4"
              />
            );
          })}
        </svg>

        {lessonSteps.map((step, idx) => {
          const status = getStepStatus(step.id);
          const pos = stepPositions[idx];
          return (
            <div
              key={step.id}
              className="absolute w-20 h-20 rounded-full flex flex-col items-center justify-center text-2xl font-bold border-4 shadow-lg transition-all duration-300 transform z-10"
              style={{
                left: pos.left,
                top: pos.top,
                backgroundColor: "#ffffff",
                borderColor: "#0d9488",
                color: "#0d9488",
                cursor: status === "locked" ? "not-allowed" : "pointer",
              }}
              onClick={() => status !== "locked" && setActiveLesson(step.id)}
              title={step.title}
            >
              {/* Show tick if completed */}
              {currentProgress.completed.includes(step.id) ? "✓" : step.emoji}
              {/* Show score if completed */}
              {currentProgress.completed.includes(step.id) && (
                <span className="text-sm text-teal-700 mt-1">{scores[step.id]} pts</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-6">
        <button
          onClick={() => completeStep(currentProgress.current, 0)}
          className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-110"
        >
          Complete Current Lesson
        </button>
        <button
          onClick={resetProgress}
          className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 px-8 py-3 rounded-full font-semibold transition-all duration-300"
        >
          Reset Progress
        </button>
      </div>
    </div>
  );
};

export default LessonPath;
