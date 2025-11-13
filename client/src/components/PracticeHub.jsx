import React, { useState } from "react";
import { Mic, Zap, Trophy, Target, MessageSquare, Volume2 } from "lucide-react";

const PracticeHub = () => {
  const [isPracticing, setIsPracticing] = useState(false);
  const [score, setScore] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const questions = [
    {
      question: "What is the ISL sign for 'Hello'?",
      options: ["Wave hand", "Thumbs up", "Peace sign", "Clap hands"],
      correct: "Wave hand",
    },
    {
      question: "What is the ISL sign for 'Thank you'?",
      options: ["Touch chin then move hand outward", "Wave hand", "Nod head", "Fold hands"],
      correct: "Touch chin then move hand outward",
    },
    {
      question: "What is the ISL sign for 'Yes'?",
      options: ["Thumbs up", "Nod head", "Wave hand", "Peace sign"],
      correct: "Thumbs up",
    },
    {
      question: "What is the ISL sign for 'Please'?",
      options: ["Palm on chest circular motion", "Touch chin", "Clap hands", "Point up"],
      correct: "Palm on chest circular motion",
    },
  ];

  const currentQuestion = questions[questionIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === currentQuestion.correct) {
      setScore(score + 1);
      setAccuracy(((score + 1) / (questionIndex + 1)) * 100);
    } else {
      setAccuracy((score / (questionIndex + 1)) * 100);
    }
    setTimeout(() => {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setSelectedOption(null);
      }
    }, 800);
  };

  return (
    <div className="px-6 md:px-16 lg:px-32 py-10 bg-[#f8fcfc] min-h-screen">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-1 rounded-full font-medium text-sm mb-3">
          <Zap size={16} />
          Interactive Practice & Assessment
        </div>
        <h1 className="text-4xl font-bold text-teal-700 mb-3">Practice Hub</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Practice speech recognition and test your ISL knowledge with interactive quizzes
        </p>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-3 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100">
          <Trophy className="mx-auto mb-3 text-amber-400" size={28} />
          <p className="text-3xl font-bold text-gray-800">{score}</p>
          <p className="text-gray-500 text-sm">Current Score</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100">
          <Target className="mx-auto mb-3 text-teal-500" size={28} />
          <p className="text-3xl font-bold text-gray-800">{accuracy.toFixed(0)}%</p>
          <p className="text-gray-500 text-sm">Accuracy</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100">
          <MessageSquare className="mx-auto mb-3 text-purple-500" size={28} />
          <p className="text-3xl font-bold text-gray-800">
            {questionIndex + 1}/{questions.length}
          </p>
          <p className="text-gray-500 text-sm">Questions</p>
        </div>
      </div>

      {/* Practice Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Speech Recognition */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 text-center flex flex-col items-center justify-center">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 w-full">
            <Mic size={48} className="text-teal-500 mb-4 mx-auto" />
            <p className="text-gray-700 font-medium mb-2">Ready to Practice</p>
            <p className="text-gray-500 text-sm mb-4">
              Click the button below to start
            </p>
            <button
              onClick={() => setIsPracticing(!isPracticing)}
              className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600 transition"
            >
              {isPracticing ? "Stop Practice" : "Start Practice"}
            </button>
          </div>
        </div>

        {/* ISL Knowledge Quiz */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-gray-800 text-lg">ISL Knowledge Quiz</h2>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              Easy
            </span>
          </div>

          <div className="text-sm text-gray-500 mb-2">
            Progress: {questionIndex + 1} of {questions.length}
          </div>

          <div className="bg-teal-50 p-4 rounded-xl mb-4 flex items-center gap-2">
            <Volume2 size={18} className="text-teal-600" />
            <p className="font-medium text-gray-800">{currentQuestion.question}</p>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleOptionClick(option)}
                className={`w-full px-4 py-2 rounded-xl border text-sm transition 
                  ${
                    selectedOption === option
                      ? option === currentQuestion.correct
                        ? "bg-green-100 border-green-300 text-green-700"
                        : "bg-red-100 border-red-300 text-red-700"
                      : "bg-white hover:bg-teal-50 border-gray-200 text-gray-700"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeHub;
