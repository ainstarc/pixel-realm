import { mouseMovement } from "../../player/input/inputState.js";

let lastTouch = null;
let lookArea = null;

// Set up the look drag area for mobile look controls
export function setupLookDragArea() {
  if (lookArea && lookArea.parentNode)
    lookArea.parentNode.removeChild(lookArea);
  lookArea = document.createElement("div");
  Object.assign(lookArea.style, {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: "50%", // right half of screen
    zIndex: 1001,
    touchAction: "none",
  });

  lookArea.addEventListener(
    "touchstart",
    (e) => {
      const touch = e.touches[0];
      lastTouch = { x: touch.clientX, y: touch.clientY };
    },
    {
      passive: false,
    }
  );

  lookArea.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (!lastTouch) return;

      const deltaX = touch.clientX - lastTouch.x;
      const deltaY = touch.clientY - lastTouch.y;

      mouseMovement.x += deltaX;
      mouseMovement.y += deltaY;

      lastTouch = { x: touch.clientX, y: touch.clientY };
    },
    {
      passive: false,
    }
  );

  lookArea.addEventListener("touchend", () => {
    lastTouch = null;
  });

  document.body.appendChild(lookArea);
}

// Remove the look drag area if it exists
export function removeLookDragArea() {
  if (lookArea && lookArea.parentNode) {
    lookArea.parentNode.removeChild(lookArea);
    lookArea = null;
  }
}
