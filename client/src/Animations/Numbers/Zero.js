export const Zero = (ref) => {
  let animations = [];

  // Pose for 0
  animations.push(
    ["mixamorigLeftHandIndex1", "rotation", "y", Math.PI / 9, "+"],
    ["mixamorigLeftHandMiddle1", "rotation", "y", Math.PI / 18, "+"],
    ["mixamorigLeftHandRing1", "rotation", "y", -Math.PI / 18, "-"],
    ["mixamorigLeftHandPinky1", "rotation", "y", -Math.PI / 9, "-"],
    ["mixamorigLeftHand", "rotation", "x", Math.PI / 1.5, "+"],
    ["mixamorigLeftHand", "rotation", "z", Math.PI / 6, "+"],
    ["mixamorigLeftForeArm", "rotation", "x", Math.PI / 9, "+"],
    ["mixamorigLeftArm", "rotation", "y", -Math.PI / 12, "-"]
  );

  // Reset Pose
  animations.push(
    ["mixamorigLeftHandIndex1", "rotation", "y", 0, "-"],
    ["mixamorigLeftHandMiddle1", "rotation", "y", 0, "-"],
    ["mixamorigLeftHandRing1", "rotation", "y", 0, "+"],
    ["mixamorigLeftHandPinky1", "rotation", "y", 0, "+"],
    ["mixamorigLeftHand", "rotation", "x", 0, "-"],
    ["mixamorigLeftHand", "rotation", "z", 0, "-"],
    ["mixamorigLeftForeArm", "rotation", "x", 0, "-"],
    ["mixamorigLeftArm", "rotation", "y", 0, "+"]
  );

  ref.animations.push(animations);

  if (ref.pending === false) {
    ref.pending = true;
    ref.animate();
  }
};
