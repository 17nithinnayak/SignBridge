export const One = (ref) => {
  let animations = [];

  // Pose for 1
  animations.push(
    ["mixamorigRightHandIndex1", "rotation", "y", -Math.PI/9, "-"],
    ["mixamorigRightHandMiddle1", "rotation", "y", 0, "+"],
    ["mixamorigRightHandRing1", "rotation", "y", 0, "+"],
    ["mixamorigRightHandPinky1", "rotation", "y", 0, "+"],
    ["mixamorigRightHand", "rotation", "x", -Math.PI/2.5, "-"],
    ["mixamorigRightForeArm", "rotation", "x", -Math.PI/12, "-"]
  );

  // Reset Pose
  animations.push(
    ["mixamorigRightHandIndex1", "rotation", "y", 0, "+"],
    ["mixamorigRightHandMiddle1", "rotation", "y", 0, "-"],
    ["mixamorigRightHandRing1", "rotation", "y", 0, "-"],
    ["mixamorigRightHandPinky1", "rotation", "y", 0, "-"],
    ["mixamorigRightHand", "rotation", "x", 0, "+"],
    ["mixamorigRightForeArm", "rotation", "x", 0, "+"]
  );

  ref.animations.push(animations);
  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  }
};
