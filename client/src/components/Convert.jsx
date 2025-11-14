import React, { useState, useEffect, useRef } from "react";
import xbot from '../Models/xbot/xbot.glb';
import ybot from '../Models/ybot/ybot.glb';
import xbotPic from '../Models/xbot/xbot.png';
import ybotPic from '../Models/ybot/ybot.png';
import * as words from '../Animations/words';
import * as alphabets from '../Animations/alphabets';
import { defaultPose } from '../Animations/defaultPose';

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Convert() {
  const [text, setText] = useState("");
  const [bot, setBot] = useState(ybot);
  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  const textFromAudio = useRef();
  const textFromInput = useRef();

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    ref.flag = false;
    ref.pending = false;
    ref.animations = [];
    ref.characters = [];

    ref.scene = new THREE.Scene();
    ref.scene.background = new THREE.Color(0xffffff);

    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(5, 10, 7.5);
    ref.scene.add(light);

    ref.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    ref.renderer.setSize(window.innerWidth * 0.57, window.innerHeight - 70);

    const canvasContainer = document.getElementById("canvas");
    canvasContainer.innerHTML = "";
    canvasContainer.appendChild(ref.renderer.domElement);

    ref.camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth * 0.57 / (window.innerHeight - 70),
      0.1,
      1000
    );
    ref.camera.position.set(0, 1.5, 2);

    const loader = new GLTFLoader();
    loader.load(
      bot,
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child.type === 'SkinnedMesh') {
            child.frustumCulled = false;
            child.material.metalness = 0; // make it less dark
            child.material.roughness = 1;
          }
        });
        ref.avatar = gltf.scene;
        ref.scene.add(ref.avatar);
        defaultPose(ref);
      },
      undefined,
      (error) => console.error(error)
    );
  }, [bot, ref]);

  ref.animate = () => {
    if (!ref.animations || ref.animations.length === 0) return;

    requestAnimationFrame(ref.animate);

    if (ref.animations[0].length) {
      if (!ref.flag) {
        if (ref.animations[0][0] === 'add-text') {
          setText((prev) => prev + ref.animations[0][1]);
          ref.animations.shift();
        } else {
          for (let i = 0; i < ref.animations[0].length;) {
            const [boneName, action, axis, limit, sign] = ref.animations[0][i];
            const bone = ref.avatar.getObjectByName(boneName);
            if (!bone) { i++; continue; }

            if (sign === "+" && bone[action][axis] < limit) {
              bone[action][axis] += speed;
              bone[action][axis] = Math.min(bone[action][axis], limit);
              i++;
            } else if (sign === "-" && bone[action][axis] > limit) {
              bone[action][axis] -= speed;
              bone[action][axis] = Math.max(bone[action][axis], limit);
              i++;
            } else {
              ref.animations[0].splice(i, 1);
            }
          }
        }
      }
    } else {
      ref.flag = true;
      setTimeout(() => { ref.flag = false }, pause);
      ref.animations.shift();
    }

    ref.renderer.render(ref.scene, ref.camera);
  }

  const sign = (inputRef) => {
    const str = inputRef.current.value.toUpperCase();
    const strWords = str.split(' ');
    setText("");

    for (let word of strWords) {
      if (words[word]) {
        ref.animations.push(['add-text', word + ' ']);
        words[word](ref);
      } else {
        for (const [index, ch] of word.split('').entries()) {
          ref.animations.push(['add-text', index === word.length - 1 ? ch + ' ' : ch]);
          alphabets[ch](ref);
        }
      }
    }
    ref.animate();
  }

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  return (
    <div className="flex flex-col md:flex-row p-4 gap-4 bg-gray-100 min-h-screen">
      {/* Left Panel */}
      <div className="flex flex-col gap-4 md:w-1/4">
        <label className="font-semibold">Processed Text</label>
        <textarea
          rows={3}
          value={text}
          readOnly
          className="w-full p-2 border rounded-md bg-white"
        />

        <label className="font-semibold">Speech Recognition: {listening ? 'on' : 'off'}</label>
        <div className="flex gap-2">
          <button className="flex-1 p-2 bg-teal-600 text-white rounded" onClick={startListening}>
            Mic On
          </button>
          <button className="flex-1 p-2 bg-teal-600 text-white rounded" onClick={stopListening}>
            Mic Off
          </button>
          <button className="flex-1 p-2 bg-gray-400 text-white rounded" onClick={resetTranscript}>
            Clear
          </button>
        </div>

        <textarea
          ref={textFromAudio}
          rows={3}
          value={transcript}
          placeholder="Speech input..."
          readOnly
          className="w-full p-2 border rounded-md bg-white"
        />
        <button className="w-full p-2 bg-teal-600 text-white rounded" onClick={() => sign(textFromAudio)}>
          Start Animations
        </button>

        <label className="font-semibold">Text Input</label>
        <textarea
          ref={textFromInput}
          rows={3}
          placeholder="Text input..."
          className="w-full p-2 border rounded-md bg-white"
        />
        <button className="w-full p-2 bg-teal-600 text-white rounded" onClick={() => sign(textFromInput)}>
          Start Animations
        </button>
      </div>

      {/* Center Panel */}
      <div className="md:w-2/4 bg-white flex justify-center items-center rounded shadow" id="canvas" />

      {/* Right Panel */}
      <div className="flex flex-col gap-4 md:w-1/4">
        <p className="font-semibold">Select Avatar</p>
        <img
          src={xbotPic}
          className="w-full cursor-pointer rounded shadow"
          onClick={() => setBot(xbot)}
          alt="Avatar 1"
        />
        <img
          src={ybotPic}
          className="w-full cursor-pointer rounded shadow"
          onClick={() => setBot(ybot)}
          alt="Avatar 2"
        />

        <label className="font-semibold">Animation Speed: {speed.toFixed(2)}</label>
        <input
          type="range"
          min={0.05}
          max={0.5}
          step={0.01}
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full"
        />

        <label className="font-semibold">Pause Time: {pause} ms</label>
        <input
          type="range"
          min={0}
          max={2000}
          step={100}
          value={pause}
          onChange={(e) => setPause(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  )
}

export default Convert;
