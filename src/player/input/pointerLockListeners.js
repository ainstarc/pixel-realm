import {
  isPointerLocked,
  setIsPointerLocked,
  wasPointerLockedBeforeAlt,
  setWasPointerLockedBeforeAlt,
} from "./inputState.js";

export function setupPointerLockListeners() {
  document.addEventListener("pointerlockchange", () => {
    setIsPointerLocked(document.pointerLockElement === document.body);

    if (!isPointerLocked && wasPointerLockedBeforeAlt) {
      setWasPointerLockedBeforeAlt(false);
    }
  });

  document.addEventListener("pointerlockerror", () => {
    console.error("Pointer lock failed");
    setWasPointerLockedBeforeAlt(false);
  });
}
