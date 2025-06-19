import { createButtonControls } from "../ui/mobileControls/buttons.js";
import {
  createJoystickControls,
  resetJoystickKeys,
} from "../ui/mobileControls/joystick.js";
import { createActionButtons } from "../ui/mobileControls/actions.js";
import { controlsState } from "../ui/mobileControls/state.js";
import {
  setupLookDragArea,
  removeLookDragArea,
} from "../ui/mobileControls/lookDrag.js";
import { storageManager } from "./storageManager.js";

// Remove any existing mobile controls and look drag area
function cleanupMobileControls() {
  if (controlsState.controlsDiv && controlsState.controlsDiv.parentNode) {
    controlsState.controlsDiv.parentNode.removeChild(controlsState.controlsDiv);
    controlsState.controlsDiv = null;
  }
  removeLookDragArea && removeLookDragArea();
}

export function setupMobileControls() {
  if (!("ontouchstart" in window)) return;

  cleanupMobileControls(); // Clean up before creating new controls

  const settings = storageManager.loadSettings() || {};
  controlsState.useJoystick = settings.useJoystick || false;

  const controlsDiv = document.createElement("div");
  controlsDiv.id = "mobile-controls";
  Object.assign(controlsDiv.style, {
    position: "absolute",
    bottom: "20px",
    left: "0",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "0 20px",
    boxSizing: "border-box",
    zIndex: 1000,
  });

  controlsState.controlsDiv = controlsDiv;
  controlsState.buttonsDiv = createButtonControls();
  controlsState.joystickDiv = createJoystickControls();
  setupLookDragArea();
  const actionDiv = createActionButtons();

  controlsDiv.appendChild(
    controlsState.useJoystick
      ? controlsState.joystickDiv
      : controlsState.buttonsDiv
  );
  controlsDiv.appendChild(actionDiv);
  document.body.appendChild(controlsDiv);

  controlsDiv.addEventListener("touchmove", (e) => e.preventDefault(), {
    passive: false,
  });
  document.body.classList.add("mobile");
}

export function toggleControlType(useJoystickControls) {
  const { controlsDiv, joystickDiv, buttonsDiv } = controlsState;
  if (!controlsDiv) return;

  controlsState.useJoystick = useJoystickControls;

  const settings = storageManager.loadSettings() || {};
  settings.useJoystick = useJoystickControls;
  storageManager.saveSettings(settings);

  // Remove the current control (joystick or buttons)
  const currentControl = controlsDiv.firstChild;
  if (currentControl) controlsDiv.removeChild(currentControl);
  controlsDiv.insertBefore(
    useJoystickControls ? joystickDiv : buttonsDiv,
    controlsDiv.firstChild
  );

  resetJoystickKeys();
}
