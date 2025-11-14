import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import LearningHub from "./components/LearningHub.jsx";
import ISLRecognition from "./components/ISLRecognition.jsx";
import PracticeHub from "./components/PracticeHub.jsx";
import AuthPage from "./components/AuthPage.jsx";
import LearningCatagory from "./components/LearningCatagory.jsx";
import LearningModule from "./components/LearningModule.jsx"; 
import LearningProfile from "./components/LearningProfile.jsx"; 
import Community from "./components/Community.jsx";
import Convert from "./components/Convert.jsx";
import SignLanguageDictionary from "./components/signLearner.jsx";
import BasicLevel from "./components/learningBasic.jsx";
import IntermediateLevel from "./components/learningIntermediate.jsx"

const App = () => {
  return (
    <Router>
      <Routes>
  <Route path="/login" element={<AuthPage />} />
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/learning-hub" element={<LearningHub />} />
   <Route path="/category/:category" element={<LearningCatagory />} />
<Route path="/category/:category/:subConcept" element={<LearningModule />} />
    <Route path="/learning/profile" element={<LearningProfile />} />
    <Route path="/isl-recognition" element={<ISLRecognition />} />
    <Route path="/practice" element={<PracticeHub />} />
    <Route path="/community" element={<Community />} />
        <Route path="/convert" element={<Convert />} />
                <Route path="/learner" element={<SignLanguageDictionary/>} />
                <Route path="/learner/basic" element={<BasicLevel />} />
      <Route path="/learner/intermediate" element={<IntermediateLevel />} />


    
  </Route>
</Routes>

    </Router>
  );
};

export default App;
