export const Two = (ref) => {
  let animations = [];

  animations.push(
    ["mixamorigRightHandIndex1","rotation","y",-Math.PI/6,"-"],
    ["mixamorigRightHandMiddle1","rotation","y",-Math.PI/9,"-"],
    ["mixamorigRightHand","rotation","x",-Math.PI/2.5,"-"],
    ["mixamorigRightForeArm","rotation","x",-Math.PI/12,"-"]
  );

  animations.push(
    ["mixamorigRightHandIndex1","rotation","y",0,"+"],
    ["mixamorigRightHandMiddle1","rotation","y",0,"+"],
    ["mixamorigRightHand","rotation","x",0,"+"],
    ["mixamorigRightForeArm","rotation","x",0,"+"]
  );

  ref.animations.push(animations);
  if (!ref.pending) { ref.pending = true; ref.animate(); }
};
