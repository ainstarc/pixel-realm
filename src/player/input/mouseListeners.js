import {
  isPointerLocked,
  mouseMovement,
  keyPressed,
  setMouseClicked,
  isHoveringUI,
} from "./inputState.js";

export function setupMouseListeners() {
  document.addEventListener("mousemove", (e) => {
    if (!isPointerLocked) return;
    mouseMovement.x = e.movementX || 0;
    mouseMovement.y = e.movementY || 0;
  });

  document.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;

    if (!isPointerLocked && !isHoveringUI) {
      document.body.requestPointerLock();
    } else if (isPointerLocked) {
      keyPressed["e"] = true;
      setMouseClicked(true);
    }
  });
}
