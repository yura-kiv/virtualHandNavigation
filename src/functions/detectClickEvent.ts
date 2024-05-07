import { NormalizedLandmarkList } from "@mediapipe/hands";
import { getIsClick, getMidpoint } from "./helpers";

let isPressed = false;
let isPressedOut = false;
let isPressedBlocked = false;

export const detectClickEvent = (
  displayLandmarks: NormalizedLandmarkList,
  worldLandmarks: NormalizedLandmarkList
) => {
  const isClick = getIsClick(worldLandmarks[8], worldLandmarks[4]);
  if (isClick) isPressed = true;
  if (!isClick && isPressed) {
    isPressed = false;
    isPressedOut = true;
  }
  if (isPressedOut && !isPressedBlocked) {
    getClickElementEvent(displayLandmarks);
    isPressedBlocked = true;
    isPressedOut = false;
    setTimeout(() => {
      isPressedBlocked = false;
    }, 300);
  }
  isPressedOut = false;
};

const getClickElementEvent = (landmarks: NormalizedLandmarkList) => {
  const index = landmarks[8];
  const thumb = landmarks[4];
  const { x, y } = getMidpoint(index, thumb);
  const element = document.elementFromPoint(
    x * window.innerWidth,
    y * window.innerHeight
  ) as HTMLElement;
  if (element && element.click) element.click();
};
