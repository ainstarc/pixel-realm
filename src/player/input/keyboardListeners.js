import { gameState } from "../../core/gameState.js";
import {
  keys,
  keyPressed,
  isHoveringUI,
  wasPointerLockedBeforeAlt,
  setWasPointerLockedBeforeAlt,
} from "./inputState.js";

export function setupKeyboardListeners() {
  window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    if (!keys[key]) {
      keyPressed[key] = true;

      // Tile selection
      const tileMap = {
        1: "grass",
        2: "dirt",
        3: "sand",
        4: "water",
      };

      if (tileMap[key]) {
        gameState.selectedTileType = tileMap[key];
      }
    }

    keys[key] = true;

    if (e.key === "Alt" && document.pointerLockElement && !isHoveringUI) {
      setWasPointerLockedBeforeAlt(true);
      document.exitPointerLock();
    }
  });

  window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;

    if (e.key === "Alt" && wasPointerLockedBeforeAlt && !isHoveringUI) {
      const canvas = document.querySelector("canvas");
      (canvas || document.body).requestPointerLock();
      setWasPointerLockedBeforeAlt(false);
    }
  });
}
