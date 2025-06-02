export const keys = {};
export const keyPressed = {}; // Track if key was just pressed this frame

export function setupInput() {
  window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    // Only mark as pressed if it wasn't already down
    if (!keys[key]) {
      keyPressed[key] = true;
    }
    keys[key] = true;
  });
  
  window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
  });
}

// Call this at the end of each frame to reset one-time presses
export function resetPressedKeys() {
  Object.keys(keyPressed).forEach(key => {
    keyPressed[key] = false;
  });
}