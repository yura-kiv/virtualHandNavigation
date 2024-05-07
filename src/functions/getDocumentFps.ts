let fps: number = 0;

export const getDocumentFps = (
  fpsCounterRef: React.RefObject<HTMLDivElement>
) => {
  let requestId: any = null;
  let fpsInterval = 1000;
  let startTime = Date.now();
  let then = startTime;
  const updateFpsCounter = () => {
    const now = Date.now();
    const elapsed = now - then;
    fps++;
    if (elapsed > fpsInterval) {
      const newFps = Math.round((fps * fpsInterval) / elapsed);
      if (fpsCounterRef.current)
        fpsCounterRef.current.innerHTML = `FPS: ${newFps}`;
      fps = 0;
      then = now;
    }
    requestId = requestAnimationFrame(updateFpsCounter);
  };
  updateFpsCounter();
  return () => {
    cancelAnimationFrame(requestId);
  };
};
