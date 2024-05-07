import { NormalizedLandmarkList } from "@mediapipe/hands";
import { NavigateFunction } from "react-router-dom";

interface FingerPosition {
  x: number;
  y: number;
  timestamp: number; // Добавляем метку времени
}

let fingerHistory: FingerPosition[] = [];

export const getBrowserEvent = (
  landmarks: NormalizedLandmarkList,
  navigate: NavigateFunction
) => {
  const indexFinger = landmarks[8];
  const fingerPosition: FingerPosition = {
    x: indexFinger.x,
    y: indexFinger.y,
    timestamp: Date.now(),
  };

  fingerHistory.push(fingerPosition);

  if (fingerHistory.length > 4) fingerHistory = fingerHistory.slice(-4);

  if (checkReloadCondition(fingerHistory)) window.location.reload();

  if (checkNavigateHistoryCondition(fingerHistory, -1)) {
    fingerHistory = [];
    navigate(-1);
  }

  if (checkNavigateHistoryCondition(fingerHistory, 1)) {
    fingerHistory = [];
    navigate(1);
  }
};

const checkReloadCondition = (fingerHistory: FingerPosition[]): boolean => {
  if (fingerHistory.length < 4) return false;

  const verticalMovement = fingerHistory[3].y - fingerHistory[0].y;
  const isVerticalSwipe = verticalMovement > 0.5;

  const timeElapsed = fingerHistory[0].timestamp - fingerHistory[3].timestamp;
  const isFastSwipe = timeElapsed < 1000;

  return isVerticalSwipe && isFastSwipe;
};

const checkNavigateHistoryCondition = (
  fingerHistory: FingerPosition[],
  index: 1 | -1
): boolean => {
  if (fingerHistory.length < 4) return false;

  const horizontalMovement = fingerHistory[0].x - fingerHistory[3].x;
  const isHorizontalSwipe = index * horizontalMovement > 0.45;

  const timeElapsed = fingerHistory[0].timestamp - fingerHistory[3].timestamp;
  const isFastSwipe = timeElapsed < 1000;

  return isHorizontalSwipe && isFastSwipe;
};
