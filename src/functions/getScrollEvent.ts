let lastGestureTime = 0;
let scrollBlockedUntil = 0;

export const getScrollEvent = (direction: "up" | "down") => {
  const currentTime = Date.now();
  const timeSinceLastGesture = currentTime - lastGestureTime;

  if (currentTime < scrollBlockedUntil) return;

  if (timeSinceLastGesture < 25) return;

  const scrollDirection = direction === "up" ? -1 : 1;
  const currentScrollPosition = document.documentElement.scrollTop;

  const canScroll =
    (direction === "up" && currentScrollPosition > 0) ||
    (direction === "down" &&
      currentScrollPosition <
        document.documentElement.scrollHeight - window.innerHeight);

  if (canScroll) {
    window.scrollBy(0, scrollDirection * 10);
    lastGestureTime = currentTime;
    scrollBlockedUntil = currentTime + 25;
  }
};
