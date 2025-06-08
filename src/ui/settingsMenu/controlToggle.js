import { storageManager } from "../../manager/storageManager.js";
import { toggleControlType } from "../../manager/mobileControlsManager.js";

export function createControlToggle() {
  const settings = storageManager.loadSettings() || {};
  const useJoystick = settings.useJoystick || false;

  const toggleContainer = document.createElement("div");
  toggleContainer.className = "ui";
  Object.assign(toggleContainer.style, {
    display: "flex",
    alignItems: "center",
    marginTop: "8px",
    marginBottom: "8px",
    color: "white"
  });

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "toggleControls";
  checkbox.className = "ui";
  checkbox.checked = useJoystick;
  checkbox.style.marginRight = "8px";

  const label = document.createElement("label");
  label.htmlFor = "toggleControls";
  label.className = "ui";
  label.textContent = "Use Joystick (instead of WASD buttons)";
  label.style.fontSize = "14px";

  checkbox.addEventListener("change", (e) => {
    toggleControlType(e.target.checked);
  });

  toggleContainer.appendChild(checkbox);
  toggleContainer.appendChild(label);
  return toggleContainer;
}