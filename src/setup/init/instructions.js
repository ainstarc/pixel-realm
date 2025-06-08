import { storageManager } from "../../manager/storageManager.js";

export function setupInstructions() {
  const instructions = document.createElement("div");
  instructions.className = "ui";
  instructions.style.position = "absolute";
  instructions.style.top = "50%";
  instructions.style.left = "50%";
  instructions.style.transform = "translate(-50%, -50%)";
  instructions.style.color = "white";
  instructions.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  instructions.style.padding = "20px";
  instructions.style.borderRadius = "5px";
  instructions.style.textAlign = "center";
  instructions.style.fontFamily = "Arial, sans-serif";
  instructions.style.zIndex = "1000";
  instructions.id = "instructions-overlay";

  const isTouchDevice = "ontouchstart" in window;
  const settings = storageManager.loadSettings() || {};
  const instructionsDismissed = settings.instructionsDismissed;

  if (isTouchDevice) {
    instructions.innerHTML =
      "Tap and drag to move<br>Use buttons to jump and place blocks<br>Tap to dismiss";
    if (instructionsDismissed) {
      instructions.style.display = "none";
    } else {
      setTimeout(() => dismissInstructions(), 3000);
      instructions.addEventListener("click", dismissInstructions);
      document.addEventListener("touchstart", dismissInstructions, {
        once: true,
      });
    }
  } else {
    instructions.innerHTML =
      "Click to enable mouse look<br>WASD to move<br>Space to jump<br>Left-click or E to place blocks<br>1-4 to select block type<br>Alt to temporarily show cursor";
  }

  document.body.appendChild(instructions);

  document.addEventListener("pointerlockchange", () => {
    if (document.pointerLockElement) {
      instructions.style.display = "none";
    } else if (!isTouchDevice && !instructionsDismissed) {
      instructions.style.display = "block";
    }
  });

  function dismissInstructions() {
    instructions.style.display = "none";
    const settings = storageManager.loadSettings() || {};
    settings.instructionsDismissed = true;
    storageManager.saveSettings(settings);
  }
}