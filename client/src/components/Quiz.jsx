import React, { useState, useEffect } from "react";

const QuizPlayer = ({ lessonId, onBack, onCompleteLesson }) => {
  const API_URL = "https://signbridgebackend-g6zh.onrender.com/api/generate-quiz";
  const MAX_QUESTIONS = 10;

  const [questions, setQuestions] = useState([]); // array of fetched questions
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch 10 questions for this lesson
  const fetchQuestions = async () => {
    try {
      const fetchedQuestions = [];
      for (let i = 0; i < MAX_QUESTIONS; i++) {
        const res = await fetch(API_URL);
        const data = await res.json();
        fetchedQuestions.push(data);
      }
      setQuestions(fetchedQuestions);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch quiz questions:", error);
      setFeedback("Error loading quiz. Please try again.");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleGuess = (guessedWord) => {
    const currentQuestion = questions[currentIndex];
    if (!currentQuestion) return;

    if (guessedWord === currentQuestion.correct_answer) {
      setScore((prev) => prev + 1);
      setFeedback("Correct! ✅");
    } else {
      setFeedback(`Wrong! ❌ Answer: "${currentQuestion.correct_answer}"`);
    }

    // Move to next question after short delay
    setTimeout(() => {
      if (currentIndex + 1 < MAX_QUESTIONS) {
        setCurrentIndex((prev) => prev + 1);
        setFeedback("");
      } else {
        // Lesson complete
        onCompleteLesson(lessonId, score + (guessedWord === currentQuestion.correct_answer ? 1 : 0));
      }
    }, 800);
  };

  if (loading) return <p className="text-center mt-10 text-gray-700">Loading quiz...</p>;
  if (!questions[currentIndex]) return null;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="quiz-container max-w-md mx-auto p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-2 text-center">Lesson {lessonId} Quiz</h2>
      <p className="text-center mb-4 font-medium text-gray-600">
        Question {currentIndex + 1} of {MAX_QUESTIONS}
      </p>

      <video
        src={currentQuestion.video_url}
        controls
        autoPlay
        className="w-full h-64 rounded-md mb-4"
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleGuess(option)}
            className="flex-1 p-2 bg-teal-50 text-teal-700 rounded-full font-medium hover:bg-teal-100 transition"
          >
            {option}
          </button>
        ))}
      </div>

      {feedback && <p className="text-center font-semibold mb-2">{feedback}</p>}
      <p className="text-center text-teal-700 font-semibold">Current Score: {score}</p>

      <button
        onClick={onBack}
        className="mt-4 w-full p-2 bg-gray-300 hover:bg-gray-400 rounded-full font-medium transition"
      >
        Back to Lessons
      </button>
    </div>
  );
};

export default QuizPlayer;
