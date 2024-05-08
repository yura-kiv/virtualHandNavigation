import s from "./MainLayout.module.scss";
import { createContext, useCallback, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Hands, Results } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { detectHands } from "../../functions/detectHands";
import { detectHoverEffects } from "../../functions/detectHoverEffects";
import { ModalFrameContext, useModalFrame } from "../../hooks/useModalFrame";
import ModalFrame from "../modals/ModalFrame/ModalFrame";
import { detectGesture } from "../../functions/detectGesture";
import { detectClickEvent } from "../../functions/detectClickEvent";
import { getScrollEvent } from "../../functions/getScrollEvent";
import { getBrowserEvent } from "../../functions/getBrowserEvent";

export type HoverElement = {
  id: string;
  node: HTMLButtonElement | HTMLDivElement | null;
  className: string;
};

export type ElementsRefs = {
  hoverElementsRefs: { [key: string]: HoverElement };
};

export const ElementsContext = createContext<{
  addHoverElementRef: (element: HoverElement) => void;
  removeHoverElementsRefs: () => void;
}>(null!);

const MainLayout = () => {
  const navigate = useNavigate();
  const modalFrame = useModalFrame();
  const cameraRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elementsRefs = useRef<ElementsRefs>({ hoverElementsRefs: {} });

  const addHoverElementRef = useCallback((element: HoverElement) => {
    elementsRefs.current.hoverElementsRefs[element.id] = element;
  }, []);

  const removeHoverElementsRefs = useCallback(() => {}, []);

  const onResults = useCallback((results: Results) => {
    if (canvasRef.current) {
      const canvasContext = canvasRef.current.getContext("2d")!;
      const landmarks = detectHands(canvasContext, results);
      if (landmarks) {
        const gesture = detectGesture(landmarks.worldLandmarks);
        if (gesture === "CURSOR") {
          detectHoverEffects(
            landmarks.displayLandmarks,
            elementsRefs.current.hoverElementsRefs
          );
          detectClickEvent(
            landmarks.displayLandmarks,
            landmarks.worldLandmarks
          );
        }
        if (gesture === "VICTORY")
          getBrowserEvent(landmarks.displayLandmarks, navigate);
        if (gesture === "OPEN_PALM") getScrollEvent("up");
        if (gesture === "CLOSED_PALM") getScrollEvent("down");
      }
    }
  }, []);

  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) => {
        // `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        return `/presets/hands/${file}`;
      },
    });
    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
      selfieMode: true,
    });
    hands.onResults(onResults);
    if (cameraRef.current && cameraRef.current.video) {
      const camera = new Camera(cameraRef.current.video, {
        width: 256,
        height: 144,
        onFrame: async () =>
          await hands.send({ image: cameraRef.current!.video! }),
      });
      camera.start();
    }
    return () => {
      hands.close();
    };
  }, [onResults]);

  return (
    <div className={s.wrapper}>
      <ElementsContext.Provider
        value={{ addHoverElementRef, removeHoverElementsRefs }}
      >
        <ModalFrameContext.Provider value={modalFrame}>
          <Outlet />
          <ModalFrame />
        </ModalFrameContext.Provider>
      </ElementsContext.Provider>
      <Webcam
        audio={false}
        ref={cameraRef}
        className={s.camera}
        mirrored
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: "user",
        }}
      />
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className={s.canvas}
      />
    </div>
  );
};

export default MainLayout;
