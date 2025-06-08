import { setupKeyboardListeners } from "./keyboardListeners.js";
import { setupMouseListeners } from "./mouseListeners.js";
import { setupPointerLockListeners } from "./pointerLockListeners.js";
import { setupUIListeners } from "./uiListeners.js";

export function setupInput() {
  setupKeyboardListeners();
  setupMouseListeners();
  setupPointerLockListeners();
  setupUIListeners();
}


