/**
 * Settings Menu module for Pixel Realm
 *
 * Creates a settings icon and dropdown menu with various game options.
 */

import { storage } from "../core/storage.js";
import packageJson from "../../package.json";
import { toggleControlType } from "./mobileControls.js";

export function setupSettingsMenu() {
  // Create settings icon
  const settingsIcon = document.createElement("div");
  settingsIcon.id = "settings-icon";
  settingsIcon.className = "ui";
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
  settingsMenu.className = "ui";
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
  settingsMenu.style.minWidth = "200px";

  // Create section headers
  const createSectionHeader = (text) => {
    const header = document.createElement("div");
    header.textContent = text;
    header.style.color = "white";
    header.style.fontWeight = "bold";
    header.style.borderBottom = "1px solid rgba(255, 255, 255, 0.3)";
    header.style.marginTop = "8px";
    header.style.marginBottom = "8px";
    header.style.paddingBottom = "4px";
    return header;
  };

  // Create info text
  const createInfoText = (text) => {
    const info = document.createElement("div");
    info.textContent = text;
    info.style.color = "white";
    info.style.fontSize = "12px";
    info.style.marginBottom = "6px";
    return info;
  };

  // Add Game Options section
  settingsMenu.appendChild(createSectionHeader("Game Options"));

  // Create menu buttons
  const resetButton = createMenuButton("Reset World", () => {
    if (confirm("Reset the world? This will clear all your changes.")) {
      storage.clearSavedData();
      location.reload();
    }
  });

  // Add buttons to menu
  settingsMenu.appendChild(resetButton);

  // Add mobile controls toggle (only on touch devices)
  if ('ontouchstart' in window) {
    // Load current setting
    const settings = storage.loadSettings() || {};
    const useJoystick = settings.useJoystick || false;
    
    // Create toggle container
    const toggleContainer = document.createElement("div");
    toggleContainer.className = "ui";
    toggleContainer.style.display = "flex";
    toggleContainer.style.alignItems = "center";
    toggleContainer.style.marginTop = "8px";
    toggleContainer.style.marginBottom = "8px";
    toggleContainer.style.color = "white";
    
    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "toggleControls";
    checkbox.className = "ui";
    checkbox.checked = useJoystick;
    checkbox.style.marginRight = "8px";
    
    // Create label
    const label = document.createElement("label");
    label.htmlFor = "toggleControls";
    label.className = "ui";
    label.textContent = "Use Joystick (instead of WASD buttons)";
    label.style.fontSize = "14px";
    
    // Add event listener
    checkbox.addEventListener("change", (e) => {
      toggleControlType(e.target.checked);
    });
    
    // Assemble toggle
    toggleContainer.appendChild(checkbox);
    toggleContainer.appendChild(label);
    
    // Add to menu
    settingsMenu.appendChild(toggleContainer);
  }

  // Add Help section
  settingsMenu.appendChild(createSectionHeader("Help"));

  const manualButton = createMenuButton("Controls", () => {
    showControlsModal();
  });

  const reportButton = createMenuButton("Report Issue", () => {
    window.open("https://github.com/ainstarc/pixel-realm/issues/", "_blank");
  });

  settingsMenu.appendChild(manualButton);
  settingsMenu.appendChild(reportButton);

  // Add About section
  settingsMenu.appendChild(createSectionHeader("About"));

  // Version info
  const version = packageJson.version || "0.12.5";
  settingsMenu.appendChild(createInfoText(`Version: ${version}`));
  settingsMenu.appendChild(createInfoText("© 2025 Pixel Realm"));

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
  button.className = "ui";
  button.style.padding = "8px 12px";
  button.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "4px";
  button.style.cursor = "pointer";
  button.style.width = "100%";
  button.style.textAlign = "center";
  button.style.marginBottom = "4px";

  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
  });

  button.addEventListener("click", onClick);

  return button;
}

// Function to show controls modal
function showControlsModal() {
  // Create modal container
  const modal = document.createElement("div");
  modal.className = "ui";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "2000";

  // Create modal content
  const content = document.createElement("div");
  content.className = "ui";
  content.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  content.style.padding = "20px";
  content.style.borderRadius = "8px";
  content.style.maxWidth = "400px";
  content.style.width = "80%";
  content.style.color = "white";
  content.style.position = "relative";

  // Create close button
  const closeButton = document.createElement("div");
  closeButton.className = "ui";
  closeButton.textContent = "×";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "15px";
  closeButton.style.fontSize = "24px";
  closeButton.style.cursor = "pointer";
  closeButton.style.color = "white";
  closeButton.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  // Create title
  const title = document.createElement("h2");
  title.className = "ui";
  title.textContent = "Game Controls";
  title.style.marginTop = "0";
  title.style.marginBottom = "15px";
  title.style.textAlign = "center";

  // Create controls list
  const controlsList = document.createElement("div");
  controlsList.className = "ui";
  
  // Check if we're on mobile
  if ('ontouchstart' in window) {
    // Load current setting
    const settings = storage.loadSettings() || {};
    const useJoystick = settings.useJoystick || false;
    
    if (useJoystick) {
      controlsList.innerHTML = `
        <p><strong>Joystick</strong> - Move and rotate</p>
        <p><strong>Jump Button</strong> - Jump</p>
        <p><strong>Place Button</strong> - Place selected tile</p>
        <p><strong>Tile Buttons</strong> - Select tile type (grass, dirt, sand, water)</p>
      `;
    } else {
      controlsList.innerHTML = `
        <p><strong>Arrow Buttons</strong> - Move and rotate</p>
        <p><strong>Jump Button</strong> - Jump</p>
        <p><strong>Place Button</strong> - Place selected tile</p>
        <p><strong>Tile Buttons</strong> - Select tile type (grass, dirt, sand, water)</p>
      `;
    }
  } else {
    controlsList.innerHTML = `
      <p><strong>Mouse</strong> - Look around (click to enable pointer lock)</p>
      <p><strong>Left-click</strong> - Place selected tile (same as E key)</p>
      <p><strong>WASD</strong> - Move (forward, left, backward, right)</p>
      <p><strong>Space</strong> - Jump</p>
      <p><strong>E</strong> - Place selected tile</p>
      <p><strong>1-4</strong> - Select tile type (grass, dirt, sand, water)</p>
      <p><strong>Alt</strong> - Hold to temporarily show cursor</p>
      <p><strong>Escape</strong> - Exit pointer lock mode</p>
      <p><strong>Arrow Keys</strong> - Alternative movement</p>
    `;
  }
  
  controlsList.style.lineHeight = "1.5";

  // Assemble modal
  content.appendChild(closeButton);
  content.appendChild(title);
  content.appendChild(controlsList);
  modal.appendChild(content);

  // Add modal to DOM
  document.body.appendChild(modal);

  // Close modal when clicking outside content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
}