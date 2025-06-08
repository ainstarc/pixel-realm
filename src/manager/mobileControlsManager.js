import { createButtonControls } from "../ui/mobileControls/buttons.js";
import {
  createJoystickControls,
  resetJoystickKeys,
} from "../ui/mobileControls/joystick.js";
import { createActionButtons } from "../ui/mobileControls/actions.js";
import { controlsState } from "../ui/mobileControls/state.js";
import {setupLookDragArea } from "../ui/mobileControls/lookDrag.js";
import { storageManager } from "./storageManager.js";

export function setupMobileControls() {
  if (!("ontouchstart" in window)) return;

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

  const currentControl = controlsDiv.firstChild;
  if (currentControl) controlsDiv.removeChild(currentControl);
  controlsDiv.insertBefore(
    useJoystickControls ? joystickDiv : buttonsDiv,
    controlsDiv.firstChild
  );

  resetJoystickKeys();
}
