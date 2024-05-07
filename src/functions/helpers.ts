import { NormalizedLandmark, NormalizedLandmarkList } from "@mediapipe/hands";

export const getIsClick = (
  landmark1: NormalizedLandmarkList[0],
  landmark2: NormalizedLandmarkList[0]
) => {
  const threshold = 0.01;
  const distance = Math.sqrt(
    Math.pow(landmark1.x - landmark2.x, 2) +
      Math.pow(landmark1.y - landmark2.y, 2)
  );
  return distance < threshold;
};

export const distanceBetweenPoints = (
  point1: NormalizedLandmark,
  point2: NormalizedLandmark
) => {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  );
};

export const getMidpoint = (
  point1: NormalizedLandmark,
  point2: NormalizedLandmark
): NormalizedLandmark => {
  const x = (point1.x + point2.x) / 2;
  const y = (point1.y + point2.y) / 2;
  return { x, y, z: (point1.z + point2.z) / 2 };
};
