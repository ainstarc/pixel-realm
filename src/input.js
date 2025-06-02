import { gameState } from "./gameState.js";

export const keys = {};
export const keyPressed = {}; // Track if key was just pressed this frame

export function setupInput() {
  window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    // Only mark as pressed if it wasn't already down
    if (!keys[key]) {
      keyPressed[key] = true;
      
      // Handle tile selection with number keys
      if (key === "1") {
        gameState.selectedTileType = "grass";
      } else if (key === "2") {
        gameState.selectedTileType = "dirt";
      } else if (key === "3") {
        gameState.selectedTileType = "sand";
      } else if (key === "4") {
        gameState.selectedTileType = "water";
      }
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