/**
 * Settings Menu module for Pixel Realm
 *
 * Creates a settings icon and dropdown menu with various game options.
 */

import { storage } from "../core/storage.js";

export function setupSettingsMenu() {
  // Create settings icon
  const settingsIcon = document.createElement("div");
  settingsIcon.id = "settings-icon";
  settingsIcon.innerHTML = "⚙️";
  settingsIcon.style.position = "absolute";
  settingsIcon.style.top = "10px";
  settingsIcon.style.right = "10px";
  settingsIcon.style.fontSize = "24px";
  settingsIcon.style.color = "white";
  settingsIcon.style.textShadow = "1px 1px 2px black";
  settingsIcon.style.cursor = "pointer";
  settingsIcon.style.zIndex = "1000";
  settingsIcon.style.userSelect = "none";

  // Create settings menu (initially hidden)
  const settingsMenu = document.createElement("div");
  settingsMenu.id = "settings-menu";
  settingsMenu.style.position = "absolute";
  settingsMenu.style.top = "40px";
  settingsMenu.style.right = "10px";
  settingsMenu.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  settingsMenu.style.padding = "10px";
  settingsMenu.style.borderRadius = "5px";
  settingsMenu.style.display = "none";
  settingsMenu.style.flexDirection = "column";
  settingsMenu.style.gap = "8px";
  settingsMenu.style.zIndex = "999";

  // Create menu buttons
  const resetButton = createMenuButton("Reset World", () => {
    if (confirm("Reset the world? This will clear all your changes.")) {
      storage.clearSavedData();
      location.reload();
    }
  });

  const reportButton = createMenuButton("Report Issue", () => {
    window.open("https://github.com/ainstarc/pixel-realm/issues/", "_blank");
  });

  const placeholderButton = createMenuButton("Coming Soon", () => {
    alert("Feature coming soon!");
  });

  // Add buttons to menu
  settingsMenu.appendChild(resetButton);
  settingsMenu.appendChild(reportButton);
  settingsMenu.appendChild(placeholderButton);

  // Toggle menu on icon click
  settingsIcon.addEventListener("click", () => {
    if (settingsMenu.style.display === "none") {
      settingsMenu.style.display = "flex";
    } else {
      settingsMenu.style.display = "none";
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (e.target !== settingsIcon && !settingsMenu.contains(e.target)) {
      settingsMenu.style.display = "none";
    }
  });

  // Add to DOM
  document.body.appendChild(settingsIcon);
  document.body.appendChild(settingsMenu);

  return { settingsIcon, settingsMenu };
}

// Helper function to create menu buttons
function createMenuButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.style.padding = "8px 12px";
  button.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "4px";
  button.style.cursor = "pointer";
  button.style.width = "120px";
  button.style.textAlign = "center";

  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
  });

  button.addEventListener("click", onClick);

  return button;
}