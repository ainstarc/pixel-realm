import { gameState } from "../core/gameState.js";

export const keys = {};
export const keyPressed = {}; // Track if key was just pressed this frame
export let isPointerLocked = false;
export let mouseMovement = { x: 0, y: 0 }; // Track mouse movement
export let mouseClicked = false; // Track mouse click
let wasPointerLockedBeforeAlt = false; // Track if pointer was locked before Alt key
let isHoveringUI = false; // Track if mouse is over UI elements

export function setupInput() {
  // Keyboard input
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
    
    // Handle Alt key for temporary cursor access
    if (e.key === "Alt" && document.pointerLockElement && !isHoveringUI) {
      wasPointerLockedBeforeAlt = true;
      document.exitPointerLock();
    }
  });

  window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
    
    // Re-lock pointer when Alt is released, but only if not hovering UI
    if (e.key === "Alt" && wasPointerLockedBeforeAlt && !isHoveringUI) {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        canvas.requestPointerLock();
      } else {
        document.body.requestPointerLock();
      }
      wasPointerLockedBeforeAlt = false;
    }
  });

  // Detect when hovering over UI elements
  document.addEventListener("mouseover", (e) => {
    const target = e.target;
    isHoveringUI = target.closest(".ui") !== null;
  });

  // Block pointer re-lock on click when over UI
  document.addEventListener("click", (e) => {
    const isClickingUI = e.target.closest(".ui");
    if (isClickingUI) {
      e.stopPropagation();
      isHoveringUI = true;
    }
  });

  // Mouse movement for camera control
  document.addEventListener("mousemove", (e) => {
    if (!isPointerLocked) return;
    
    // Use movementX/Y for better pointer lock support
    mouseMovement.x = e.movementX || 0;
    mouseMovement.y = e.movementY || 0;
  });

  // Click to lock pointer or place tile
  document.addEventListener("mousedown", (e) => {
    if (e.button === 0) { // Left click
      if (!isPointerLocked && !isHoveringUI) {
        document.body.requestPointerLock();
      } else if (isPointerLocked) {
        // Simulate 'E' key press for tile placement
        keyPressed["e"] = true;
        mouseClicked = true;
      }
    }
  });

  // Track pointer lock state
  document.addEventListener("pointerlockchange", () => {
    isPointerLocked = document.pointerLockElement === document.body;
    
    // Reset Alt tracking if pointer lock is manually exited (e.g., with Escape)
    if (!isPointerLocked && wasPointerLockedBeforeAlt) {
      wasPointerLockedBeforeAlt = false;
    }
  });

  // Handle pointer lock errors
  document.addEventListener("pointerlockerror", () => {
    console.error("Pointer lock failed");
    wasPointerLockedBeforeAlt = false;
  });
}

// Call this at the end of each frame to reset one-time presses
export function resetPressedKeys() {
  Object.keys(keyPressed).forEach((key) => {
    keyPressed[key] = false;
  });
  
  // Reset mouse click
  mouseClicked = false;
  
  // Reset mouse movement after it's been processed
  mouseMovement.x = 0;
  mouseMovement.y = 0;
}