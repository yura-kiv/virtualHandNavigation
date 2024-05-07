import { NormalizedLandmarkList } from "@mediapipe/hands";
import { distanceBetweenPoints } from "./helpers";

export type Gesture =
  | "NONE"
  | "OPEN_PALM"
  | "CLOSED_PALM"
  | "CURSOR"
  | "VICTORY";

export const detectGesture = (landmarks: NormalizedLandmarkList): Gesture => {
  const isThumbRised = distanceBetweenPoints(landmarks[4], landmarks[9]) > 0.04;
  const isIndexRised = distanceBetweenPoints(landmarks[8], landmarks[0]) > 0.1;
  const isMiddleRised =
    distanceBetweenPoints(landmarks[12], landmarks[9]) > 0.05;
  const isRingRised =
    distanceBetweenPoints(landmarks[16], landmarks[13]) > 0.05;
  const isPinkyRised =
    distanceBetweenPoints(landmarks[20], landmarks[17]) > 0.05;

  if (isIndexRised && !isMiddleRised && !isRingRised && !isPinkyRised)
    return "CURSOR";
  if (isIndexRised && isMiddleRised && !isRingRised && !isPinkyRised)
    return "VICTORY";
  if (
    isThumbRised &&
    isIndexRised &&
    isMiddleRised &&
    isRingRised &&
    isPinkyRised
  )
    return "OPEN_PALM";
  if (
    !isThumbRised &&
    !isIndexRised &&
    !isMiddleRised &&
    !isRingRised &&
    !isPinkyRised
  )
    return "CLOSED_PALM";
  return "NONE";
};

// if (!previousLandmarks) previousLandmarks = landmarks;

//   const indexFingerCurrent = landmarks[8];
//   const indexFingerPrevious = previousLandmarks[8];
//   const deltaX = indexFingerCurrent.x - indexFingerPrevious.x;
//   const deltaY = indexFingerCurrent.y - indexFingerPrevious.y;

//   if (deltaX > 0.1) {
//     console.log("Жест: Движение вправо");
//   } else if (deltaX < -0.1) {
//     console.log("Жест: Движение влево");
//   }

//   previousLandmarks = landmarks;
