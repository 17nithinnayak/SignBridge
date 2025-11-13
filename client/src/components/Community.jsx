import React, { useState, useEffect, useRef } from "react";
import Slider from "react-input-slider";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import xbot from "../Models/xbot/xbot.glb";
import ybot from "../Models/ybot/ybot.glb";
import xbotPic from "../Models/xbot/xbot.png";
import ybotPic from "../Models/ybot/ybot.png";

import * as words from "../Animations/words";
import * as alphabets from "../Animations/alphabets";
import { defaultPose } from "../Animations/defaultPose";

function LearnSign() {
  const [bot, setBot] = useState(ybot);
  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  useEffect(() => {
    ref.flag = false;
    ref.pending = false;
    ref.animations = [];
    ref.characters = [];

    // Scene setup
    ref.scene = new THREE.Scene();
    ref.scene.background = new THREE.Color(0xeeeeee); // softer background

    // ✅ FIXED LIGHTING (this solves your black model issue)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // overall brightness
    ref.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(2, 4, 5);
    directionalLight.castShadow = true;
    ref.scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-2, 2, -2);
    ref.scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
    backLight.position.set(0, -1, -3);
    ref.scene.add(backLight);

    // Camera setup
    ref.camera = new THREE.PerspectiveCamera(
      30,
      (window.innerWidth * 0.57) / (window.innerHeight - 70),
      0.1,
      1000
    );
    ref.camera.position.set(0, 1.4, 1.6);

    // Renderer setup
    ref.renderer = new THREE.WebGLRenderer({ antialias: true });
    ref.renderer.outputEncoding = THREE.sRGBEncoding;
    ref.renderer.setSize(window.innerWidth * 0.57, window.innerHeight - 70);

    const canvasDiv = document.getElementById("canvas");
    canvasDiv.innerHTML = "";
    canvasDiv.appendChild(ref.renderer.domElement);

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      bot,
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
      (xhr) => console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}%`),
      (error) => console.error("Error loading model:", error)
    );
  }, [bot]);

  // Animation logic
  ref.animate = () => {
    if (ref.animations.length === 0) {
      ref.pending = false;
      return;
    }
    requestAnimationFrame(ref.animate);

    if (ref.animations[0].length) {
      if (!ref.flag) {
        for (let i = 0; i < ref.animations[0].length; ) {
          let [boneName, action, axis, limit, sign] = ref.animations[0][i];
          const bone = ref.avatar.getObjectByName(boneName)[action];
          if (sign === "+" && bone[axis] < limit) {
            bone[axis] += speed;
            bone[axis] = Math.min(bone[axis], limit);
            i++;
          } else if (sign === "-" && bone[axis] > limit) {
            bone[axis] -= speed;
            bone[axis] = Math.max(bone[axis], limit);
            i++;
          } else {
            ref.animations[0].splice(i, 1);
          }
        }
      }
    } else {
      ref.flag = true;
      setTimeout(() => (ref.flag = false), pause);
      ref.animations.shift();
    }
    ref.renderer.render(ref.scene, ref.camera);
  };

  // Alphabet buttons
  const alphaButtons = Array.from({ length: 26 }, (_, i) => (
    <button
      key={i}
      className="w-16 h-16 m-2 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 transition"
      onClick={() => {
        if (ref.animations.length === 0)
          alphabets[String.fromCharCode(i + 65)](ref);
      }}
    >
      {String.fromCharCode(i + 65)}
    </button>
  ));

  // Word buttons
  const wordButtons = words.wordList.map((word, i) => (
    <button
      key={i}
      className="px-3 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition m-1"
      onClick={() => {
        if (ref.animations.length === 0) words[word](ref);
      }}
    >
      {word}
    </button>
  ));

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Left - Controls */}
      <div className="w-full lg:w-1/4 p-4 overflow-y-auto bg-white shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Alphabets
        </h2>
        <div className="flex flex-wrap justify-center">{alphaButtons}</div>

        <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-4 text-center">
          Words
        </h2>
        <div className="flex flex-wrap justify-center">{wordButtons}</div>
      </div>

      {/* Center - 3D Canvas */}
      <div className="flex-1 flex items-center justify-center bg-gray-200">
        <div id="canvas" className="w-full h-full flex items-center justify-center" />
      </div>

      {/* Right - Settings */}
      <div className="w-full lg:w-1/5 p-6 bg-white shadow-lg flex flex-col items-center justify-start space-y-6">
        <h2 className="text-xl font-bold text-gray-800">Select Avatar</h2>
        <div className="flex flex-col items-center space-y-4">
          <img
            src={xbotPic}
            alt="Avatar XBOT"
            className="w-24 h-24 rounded-full border-4 border-transparent hover:border-teal-500 cursor-pointer bg-white shadow"
            onClick={() => setBot(xbot)}
          />
          <img
            src={ybotPic}
            alt="Avatar YBOT"
            className="w-24 h-24 rounded-full border-4 border-transparent hover:border-indigo-500 cursor-pointer bg-white shadow-md object-cover"
            onClick={() => setBot(ybot)}
          />
        </div>

        <div className="w-full mt-6">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            Animation Speed:{" "}
            <span className="text-teal-600">
              {Math.round(speed * 100) / 100}
            </span>
          </p>
          <Slider
            axis="x"
            x={speed}
            xmin={0.05}
            xmax={0.5}
            step={0.01}
            onChange={({ x }) => setSpeed(x)}
            styles={{
              track: { backgroundColor: "#ccc", height: 6 },
              active: { backgroundColor: "#14b8a6" },
              thumb: { width: 16, height: 16 },
            }}
          />
        </div>

        <div className="w-full">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            Pause Time: <span className="text-indigo-600">{pause} ms</span>
          </p>
          <Slider
            axis="x"
            x={pause}
            xmin={0}
            xmax={2000}
            step={100}
            onChange={({ x }) => setPause(x)}
            styles={{
              track: { backgroundColor: "#ccc", height: 6 },
              active: { backgroundColor: "#6366f1" },
              thumb: { width: 16, height: 16 },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default LearnSign;
