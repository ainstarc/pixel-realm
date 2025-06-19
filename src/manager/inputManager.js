// Re-exports input state and setup functions for use elsewhere
export {
  keys, // Tracks which keys are pressed
  keyPressed, // Tracks which keys were just pressed
  isPointerLocked, // Pointer lock state
  mouseMovement, // Mouse movement delta
  mouseClicked, // Mouse click state
} from "../player/input/inputState.js";
export { setupInput } from "../player/input/setupInput.js";
export { resetPressedKeys } from "../player/input/inputReset.js";
