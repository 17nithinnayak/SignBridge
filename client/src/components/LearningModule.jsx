/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useParams } from "react-router-dom";

import { defaultPose } from "../Animations/defaultPose";
import * as alphabets from "../Animations/alphabets";

function LearningModule() {
  const { category, subConcept } = useParams();
  const canvasRef = useRef();
  const ref = useRef({
    animations: [],
    flag: false,
    pending: false,
  }).current;

  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);
  const [quizAnswered, setQuizAnswered] = useState(false);

  useEffect(() => {
    // Scene setup
    ref.scene = new THREE.Scene();
    ref.scene.background = new THREE.Color(0xeeeeee);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    ref.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(2, 4, 5);
    ref.scene.add(dirLight);

    ref.camera = new THREE.PerspectiveCamera(
      30,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    ref.camera.position.set(0, 1.4, 1.6);

    ref.renderer = new THREE.WebGLRenderer({ antialias: true });
    ref.renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    canvasRef.current.appendChild(ref.renderer.domElement);

    const loader = new GLTFLoader();
    loader.load(
      "/Models/ybot/ybot.glb", // default avatar
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
          if (child.type === "SkinnedMesh") {
            child.frustumCulled = false;
          }
        });
        ref.avatar = gltf.scene;
        ref.scene.add(ref.avatar);
        defaultPose(ref);
      },
      undefined,
      (error) => console.error(error)
    );

    const animate = () => {
      requestAnimationFrame(animate);
      ref.renderer.render(ref.scene, ref.camera);
    };
    animate();
  }, []);

  const startQuiz = () => {
    setQuizAnswered(false);
    alert(`Try to perform or guess the sign for "${subConcept}"`);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">{subConcept}</h2>
      <div
        ref={canvasRef}
        className="w-full h-96 bg-gray-200 rounded shadow-md mb-4"
      ></div>

      <button
        onClick={startQuiz}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Start Quiz
      </button>

      {quizAnswered && <p className="mt-4 text-green-600">Correct!</p>}
    </div>
  );
}

export default LearningModule;
