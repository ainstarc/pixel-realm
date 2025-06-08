import { createButtonControls } from "./mobileControls/buttons.js";
import {
  createJoystickControls,
  resetJoystickKeys,
} from "./mobileControls/joystick.js";
import { createActionButtons } from "./mobileControls/actions.js";
import { controlsState } from ".//mobileControls/state.js";
import { storage } from "../core/storage.js";

export function setupMobileControls() {
  if (!("ontouchstart" in window)) return;

  const settings = storage.loadSettings() || {};
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

  const settings = storage.loadSettings() || {};
  settings.useJoystick = useJoystickControls;
  storage.saveSettings(settings);

  const currentControl = controlsDiv.firstChild;
  if (currentControl) controlsDiv.removeChild(currentControl);
  controlsDiv.insertBefore(
    useJoystickControls ? joystickDiv : buttonsDiv,
    controlsDiv.firstChild
  );

  resetJoystickKeys();
}
