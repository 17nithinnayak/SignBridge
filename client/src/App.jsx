import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import LearningHub from "./components/LearningHub.jsx";
import VideoTranslator from "./components/VideoTranslator.jsx";
import ISLRecognition from "./components/ISLRecognition.jsx";
import PracticeHub from "./components/PracticeHub.jsx";
import AuthPage from "./components/AuthPage.jsx";
import Community from "./components/Community.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/login" element={<AuthPage/>} />
          <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/learning-hub" element={<LearningHub />} />
          <Route path="/video-translator" element={<VideoTranslator />} />
          <Route path="/isl-recognition" element={<ISLRecognition />} />
          <Route path="/practice" element={<PracticeHub />} />
          <Route path='/community' element={<Community/>}  />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
