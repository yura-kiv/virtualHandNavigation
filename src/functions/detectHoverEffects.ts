import { NormalizedLandmarkList } from "@mediapipe/hands";
import { ElementsRefs } from "../components/MainLayout/MainLayout";

export const detectHoverEffects = (
  landmarks: NormalizedLandmarkList,
  elements: React.MutableRefObject<ElementsRefs>["current"]["hoverElementsRefs"]
) => {
  const fingerTip = landmarks[8];
  const fingerX = fingerTip.x * window.innerWidth;
  const fingerY = fingerTip.y * window.innerHeight;
  let currentHoveredElements = document.elementsFromPoint(
    fingerX,
    fingerY
  ) as HTMLElement[];
  const overlayIndex = currentHoveredElements.findIndex(
    (el) => el.id === "overlay"
  );
  if (overlayIndex !== -1)
    currentHoveredElements = currentHoveredElements.slice(0, overlayIndex + 1);
  Object.values(elements).forEach((el) => {
    if (el.node)
      if (currentHoveredElements.includes(el.node))
        el.node.classList.add(el.className);
      else el.node.classList.remove(el.className);
  });
};
