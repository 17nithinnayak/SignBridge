

/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs"; // Use local tfjs
import * as tmPose from "@teachablemachine/pose"; // Local tmPose if installed via npm

const LOCAL_MODEL_PATH = "/my-pose-model/"; // folder in public folder

export default function ISLPoseModel() {
  const canvasRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [modelReady, setModelReady] = useState(false);

  const [topPrediction, setTopPrediction] = useState(null);
  const [error, setError] = useState(null);

  const confidenceThreshold = 55;

  useEffect(() => {
    initModel();

    // Cleanup
    return () => {
      if (window.webcam) {
        window.webcam.stop();
      }
    };
  }, []);

  const initModel = async () => {
    try {
      // Load the model and metadata from local folder
      const modelURL = LOCAL_MODEL_PATH + "model.json";
      const metadataURL = LOCAL_MODEL_PATH + "metadata.json";

      const model = await tmPose.load(modelURL, metadataURL);
      window.model = model;

      // Setup webcam
      const size = 224; // 224x224 input for your model
      const flip = true;

      const webcam = new tmPose.Webcam(size, size, flip);
      await webcam.setup();
      await webcam.play();
      window.webcam = webcam;

      const canvas = canvasRef.current;
      canvas.width = size;
      canvas.height = size;
      window.ctx = canvas.getContext("2d");

      setLoading(false);
      setModelReady(true);

      // Start prediction loop
      window.requestAnimationFrame(loop);
    } catch (e) {
      console.error("Error loading model or webcam:", e);
      setError(
        "Failed to load model or webcam. Check console and ensure correct file paths."
      );
      setLoading(false);
    }
  };

  async function loop() {
    if (window.webcam && window.webcam.canvas) {
      window.webcam.update();
      await predict();
    }

    if (window.model) {
      window.requestAnimationFrame(loop);
    }
  }

  async function predict() {
    if (!window.model || !window.webcam) return;

    const { pose, posenetOutput } = await window.model.estimatePose(
      window.webcam.canvas
    );
    const prediction = await window.model.predict(posenetOutput);

    const topPred = prediction.reduce((prev, current) => {
      return prev.probability > current.probability ? prev : current;
    });

    setTopPrediction(topPred);
    drawPose(pose);
  }

  function drawPose(pose) {
    if (!window.ctx || !window.webcam) return;

    window.ctx.drawImage(window.webcam.canvas, 0, 0);

    if (pose) {
      const minConfidence = 0.5;
      tmPose.drawKeypoints(pose.keypoints, minConfidence, window.ctx);
      tmPose.drawSkeleton(pose.keypoints, minConfidence, window.ctx);
    }
  }

  const recognizedName = topPrediction?.className;
  const recognizedAccuracy = topPrediction
    ? (topPrediction.probability * 100).toFixed(1)
    : 0;

  return (
    <div className="px-6 py-10 flex flex-col items-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-extrabold text-teal-700 mb-6 border-teal-200 pb-2">
        Real-Time ISL Recognition
      </h1>

      {loading && (
        <p className="text-lg text-orange-600 font-medium">
          Loading AI Model, please wait...
        </p>
      )}

      {error && (
        <p className="text-xl text-red-600 font-bold mb-4 bg-red-100 p-3 rounded-lg">
          {error}
        </p>
      )}

      <canvas
        ref={canvasRef}
        className="shadow-2xl border-4 border-teal-500/50"
        style={{
          width: 300,
          height: 300,
          borderRadius: "10px",
          display: loading || error ? "none" : "block",
        }}
      ></canvas>

      <div className="mt-8 w-full max-w-lg bg-white shadow-xl border border-gray-100 p-6 rounded-2xl text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Recognized Sign
        </h2>

        {modelReady && topPrediction ? (
          recognizedAccuracy >= confidenceThreshold ? (
            <div className="text-5xl font-extrabold text-teal-600 animate-pulse">
              {recognizedName}
            </div>
          ) : (
            <div className="text-xl text-gray-400 font-medium p-4">
              Awaiting clear sign input...
            </div>
          )
        ) : (
          <div className="text-xl text-gray-400 font-medium p-4">
            {loading ? "Initializing..." : "Please enable your camera."}
          </div>
        )}
      </div>
    </div>
  );
}
