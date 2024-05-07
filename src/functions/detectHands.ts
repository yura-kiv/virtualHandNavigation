import { drawConnectors, drawLandmarks, lerp } from "@mediapipe/drawing_utils";
import {
  HAND_CONNECTIONS,
  NormalizedLandmarkList,
  Results,
} from "@mediapipe/hands";
import { getIsClick } from "./helpers";

let previousDisplayLandmarks: NormalizedLandmarkList = [];
let previousWorldLandmarks: NormalizedLandmarkList = [];

export const detectHands = (
  context: CanvasRenderingContext2D,
  results: Results
): {
  displayLandmarks: NormalizedLandmarkList;
  worldLandmarks: NormalizedLandmarkList;
} | null => {
  const width = context.canvas.width;
  const height = context.canvas.height;
  context.save();
  context.clearRect(0, 0, width, height);
  context.scale(1, 1);
  context.translate(0, 0);
  if (results.multiHandLandmarks[0]) {
    const smoothDisplayLandmarks = getSmoothLandmarks(
      results.multiHandLandmarks[0],
      previousDisplayLandmarks,
      0.4,
      0,
      1
    );
    previousDisplayLandmarks = smoothDisplayLandmarks;
    const smoothWorldLandmarks = getSmoothLandmarks(
      results.multiHandWorldLandmarks[0],
      previousWorldLandmarks,
      0.04,
      -0.1,
      0.1
    );
    previousWorldLandmarks = smoothWorldLandmarks;
    // Mark the ends of the index finger and thumb with a different color
    const isClick = getIsClick(
      smoothWorldLandmarks[8],
      smoothWorldLandmarks[4]
    );
    drawClickLandmark(context, smoothDisplayLandmarks[8], isClick);
    drawClickLandmark(context, smoothDisplayLandmarks[4], isClick);
    // Draw the rest of the hand in the default color
    drawConnectors(context, smoothDisplayLandmarks, HAND_CONNECTIONS, {
      color: "blue",
      lineWidth: 2,
    });
    drawLandmarks(context, smoothDisplayLandmarks, {
      color: "yellow",
      lineWidth: 1,
      radius: 2,
    });
    context.restore();
    return {
      displayLandmarks: smoothDisplayLandmarks,
      worldLandmarks: smoothWorldLandmarks,
    };
  }
  return null;
};

const getSmoothLandmarks = (
  landmarks: NormalizedLandmarkList,
  prev: NormalizedLandmarkList,
  alpha: number,
  min: number,
  max: number
): NormalizedLandmarkList => {
  if (prev.length === 0) prev = landmarks;
  const smoothLandmarks = landmarks.map((landmark, i) => {
    const previousLandmark = prev[i];
    return {
      x: lerp(alpha, min, max, previousLandmark.x, landmark.x),
      y: lerp(alpha, min, max, previousLandmark.y, landmark.y),
      z: landmark.z,
    };
  });
  return smoothLandmarks;
};

const drawClickLandmark = (
  context: CanvasRenderingContext2D,
  landmark: NormalizedLandmarkList[0],
  isClick: boolean
) => {
  const { x, y } = landmark;
  const color = isClick ? "green" : "red";
  context.beginPath();
  context.arc(
    x * context.canvas.width,
    y * context.canvas.height,
    5,
    0,
    2 * Math.PI
  );
  context.fillStyle = color;
  context.fill();
};
