// RotatingRobot.jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

const RobotModel = ({ speed = 1.5, amplitude = 0.3 }) => {
  const ref = useRef();
  const { scene } = useGLTF("/models/model.glb");

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    //  Gentle waving side-to-side motion
    ref.current.rotation.y = Math.sin(t * speed) * amplitude; // side sway
    ref.current.position.x = Math.sin(t * speed) * 0.1; // subtle side shift
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1.5}
      position={[0, -0.3, 0]} // centered nicely
    />
  );
};

const RotatingRobot = () => {
  return (
    <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-teal-400 shadow-lg bg-transparent mx-auto">
      <Canvas
        camera={{ position: [0, 0, 3] }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 3, 3]} intensity={2} />

        {/*  Smooth waving motion */}
        <RobotModel speed={1.5} amplitude={0.4} />

        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default RotatingRobot;
