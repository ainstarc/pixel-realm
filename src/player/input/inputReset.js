import { keyPressed, mouseMovement, setMouseClicked } from "./inputState.js";

export function resetPressedKeys() {
  // Reset all keys that were marked as "just pressed"
  Object.keys(keyPressed).forEach((key) => {
    keyPressed[key] = false;
  });

  // Reset mouse click state
  setMouseClicked(false);

  // Reset mouse movement
  mouseMovement.x = 0;
  mouseMovement.y = 0;
}
