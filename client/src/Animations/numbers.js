// ISL Number Animations for Mixamo-style rig (Right-hand dominant)

const trigger = (ref, anims) => {
  ref.animations.push(anims);
  if (!ref.pending) {
    ref.pending = true;
    ref.animate();
  }
};

// small helpers
const fold = (fingers, amount = Math.PI / 2) =>
  fingers.flatMap((f) => [
    [`mixamorigRightHand${f}1`, "rotation", "z", amount],
    [`mixamorigRightHand${f}2`, "rotation", "z", amount * 0.9],
    [`mixamorigRightHand${f}3`, "rotation", "z", amount * 0.8],
  ]);

const open = (fingers) =>
  fingers.flatMap((f) => [
    [`mixamorigRightHand${f}1`, "rotation", "z", 0],
    [`mixamorigRightHand${f}2`, "rotation", "z", 0],
    [`mixamorigRightHand${f}3`, "rotation", "z", 0],
  ]);

const wristPose = [
  ["mixamorigRightForeArm", "rotation", "x", 0.2],
  ["mixamorigRightForeArm", "rotation", "z", 0.05],
  ["mixamorigRightShoulder", "rotation", "x", -0.15],
  ["mixamorigSpine2", "rotation", "y", 0.1],
];

/* ---------- DIGITS ---------- */

// 0️⃣ – thumb + index make circle, rest folded
export const zero = (ref) => {
  let a = [];
  a.push(...fold(["Middle", "Ring", "Pinky"]));
  a.push(["mixamorigRightHandThumb2", "rotation", "y", 0.5]); // curved in
  a.push(["mixamorigRightHandIndex1", "rotation", "z", 0.7]);
  a.push(["mixamorigRightHandIndex2", "rotation", "z", 0.7]);
  a.push(["mixamorigRightHandIndex3", "rotation", "z", 0.5]);
  a.push(["mixamorigRightForeArm", "rotation", "z", -0.2]);
  a.push(...wristPose);
  trigger(ref, a);
};

// 1️⃣ – index up, rest folded
export const one = (ref) => {
  let a = [];
  a.push(...open(["Index"]));
  a.push(...fold(["Middle", "Ring", "Pinky"]));
  a.push(["mixamorigRightHandThumb2", "rotation", "y", -0.8]);
  a.push(...wristPose);
  trigger(ref, a);
};

// 2️⃣ – index + middle up, V sign
export const two = (ref) => {
  let a = [];
  a.push(...open(["Index", "Middle"]));
  a.push(...fold(["Ring", "Pinky"]));
  a.push(["mixamorigRightHandThumb2", "rotation", "y", -0.6]);
  a.push(["mixamorigRightForeArm", "rotation", "z", 0.15]);
  trigger(ref, a);
};

// 3️⃣ – index + middle + thumb up, ring/pinky folded
export const three = (ref) => {
  let a = [];
  a.push(...open(["Index", "Middle"]));
  a.push(["mixamorigRightHandThumb2", "rotation", "y", 0]);
  a.push(...fold(["Ring", "Pinky"]));
  a.push(["mixamorigRightForeArm", "rotation", "z", 0.2]);
  trigger(ref, a);
};

// 4️⃣ – all four fingers up, thumb folded in
export const four = (ref) => {
  let a = [];
  a.push(...open(["Index", "Middle", "Ring", "Pinky"]));
  a.push(["mixamorigRightHandThumb2", "rotation", "y", -1.2]);
  a.push(["mixamorigRightForeArm", "rotation", "z", 0.1]);
  trigger(ref, a);
};

// 5️⃣ – all fingers open (both hands)
export const five = (ref) => {
  let a = [];
  a.push(...open(["Index", "Middle", "Ring", "Pinky"]));
  a.push(["mixamorigRightHandThumb2", "rotation", "y", 0]);

  // left hand mirror
  ["Index", "Middle", "Ring", "Pinky"].forEach((f) =>
    a.push([`mixamorigLeftHand${f}1`, "rotation", "z", 0])
  );
  a.push(["mixamorigLeftHandThumb2", "rotation", "y", 0]);

  a.push(["mixamorigSpine2", "rotation", "x", 0.1]);
  trigger(ref, a);
};

// 6️⃣ – thumb + little finger open, others folded
export const six = (ref) => {
  let a = [];
  a.push(...fold(["Index", "Middle", "Ring"]));
  a.push(...open(["Pinky"]));
  a.push(["mixamorigRightHandThumb2", "rotation", "y", 0]);
  a.push(["mixamorigRightForeArm", "rotation", "z", -0.25]);
  trigger(ref, a);
};

// 7️⃣ – thumb touching index (gun-like)
export const seven = (ref) => {
  let a = [];
  a.push(...open(["Index"]));
  a.push(...fold(["Middle", "Ring", "Pinky"]));
  a.push(["mixamorigRightHandThumb2", "rotation", "y", 0.3]); // touch index
  a.push(["mixamorigRightForeArm", "rotation", "z", 0.15]);
  trigger(ref, a);
};

// 8️⃣ – thumb + middle together
export const eight = (ref) => {
  let a = [];
  a.push(...open(["Middle"]));
  a.push(...fold(["Index", "Ring", "Pinky"]));
  a.push(["mixamorigRightHandThumb2", "rotation", "y", 0.3]);
  a.push(["mixamorigRightForeArm", "rotation", "z", 0.2]);
  trigger(ref, a);
};

// 9️⃣ – thumb + ring together
export const nine = (ref) => {
  let a = [];
  a.push(...open(["Ring"]));
  a.push(...fold(["Index", "Middle", "Pinky"]));
  a.push(["mixamorigRightHandThumb2", "rotation", "y", 0.4]);
  a.push(["mixamorigRightForeArm", "rotation", "z", 0.1]);
  trigger(ref, a);
};
