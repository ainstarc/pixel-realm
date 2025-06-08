import {
  setupSettingsIcon,
  setupSettingsMenuContainer,
} from "../ui/settingsMenu/domElements.js";
import { createResetButton } from "../ui/settingsMenu/gameOptions.js";
import { createControlToggle } from "../ui/settingsMenu/controlToggle.js";
import { createHelpButtons } from "../ui/settingsMenu/modal.js";
import { appendVersionInfo } from "../ui/settingsMenu/versionInfo.js";

export function setupSettingsMenu() {
  const settingsIcon = setupSettingsIcon();
  const settingsMenu = setupSettingsMenuContainer();

  // Game Options
  settingsMenu.appendChild(createResetButton());

  // Mobile Toggle
  if ("ontouchstart" in window) {
    settingsMenu.appendChild(createControlToggle());
  }

  // Help Buttons
  const helpButtons = createHelpButtons();
  helpButtons.forEach((btn) => settingsMenu.appendChild(btn));

  // Version Info
  appendVersionInfo(settingsMenu);

  // Toggle menu visibility
  settingsIcon.addEventListener("click", () => {
    settingsMenu.style.display =
      settingsMenu.style.display === "none" ? "flex" : "none";
  });

  document.addEventListener("click", (e) => {
    if (e.target !== settingsIcon && !settingsMenu.contains(e.target)) {
      settingsMenu.style.display = "none";
    }
  });

  document.body.appendChild(settingsIcon);
  document.body.appendChild(settingsMenu);

  return { settingsIcon, settingsMenu };
}
