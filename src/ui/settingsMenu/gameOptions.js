import { storageManager } from "../../manager/storageManager.js";
import { createMenuButton } from "./menuButton.js";

export function createResetButton() {
  return createMenuButton("Reset World", () => {
    if (confirm("Reset the world? This will clear all your changes.")) {
      storageManager.clearSavedData();
      location.reload();
    }
  });
}