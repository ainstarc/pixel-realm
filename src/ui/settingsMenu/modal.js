import { storageManager } from "../../manager/storageManager.js";
import { createMenuButton } from "./menuButton.js";

export function createHelpButtons() {
  return [
    createMenuButton("Controls", showControlsModal),
    createMenuButton("Report Issue", () => {
      window.open("https://github.com/ainstarc/pixel-realm/issues/", "_blank");
    })
  ];
}

export function showControlsModal() {
  const modal = document.createElement("div");
  modal.className = "ui";
  Object.assign(modal.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "2000"
  });

  const content = document.createElement("div");
  Object.assign(content.style, {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "400px",
    width: "80%",
    color: "white",
    position: "relative"
  });

  const closeButton = document.createElement("div");
  closeButton.textContent = "×";
  Object.assign(closeButton.style, {
    position: "absolute",
    top: "10px",
    right: "15px",
    fontSize: "24px",
    cursor: "pointer",
    color: "white"
  });
  closeButton.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  const title = document.createElement("h2");
  title.textContent = "Game Controls";
  Object.assign(title.style, {
    marginTop: "0",
    marginBottom: "15px",
    textAlign: "center"
  });

  const controlsList = document.createElement("div");
  const settings = storageManager.loadSettings() || {};
  const useJoystick = settings.useJoystick || false;

  if ('ontouchstart' in window) {
    controlsList.innerHTML = useJoystick ?
      `<p><strong>Joystick</strong> - Move and rotate</p>
       <p><strong>Jump Button</strong> - Jump</p>
       <p><strong>Place Button</strong> - Place selected tile</p>
       <p><strong>Tile Buttons</strong> - Select tile type</p>`
    : `<p><strong>Arrow Buttons</strong> - Move and rotate</p>
       <p><strong>Jump Button</strong> - Jump</p>
       <p><strong>Place Button</strong> - Place selected tile</p>
       <p><strong>Tile Buttons</strong> - Select tile type</p>`;
  } else {
    controlsList.innerHTML = `
      <p><strong>Mouse</strong> - Look around (click to enable pointer lock)</p>
      <p><strong>Left-click</strong> - Place selected tile</p>
      <p><strong>WASD</strong> - Move</p>
      <p><strong>Space</strong> - Jump</p>
      <p><strong>E</strong> - Place tile</p>
      <p><strong>1-4</strong> - Select tile type</p>
      <p><strong>Alt</strong> - Show cursor</p>
      <p><strong>Escape</strong> - Exit pointer lock</p>
      <p><strong>Arrow Keys</strong> - Alternative movement</p>`;
  }
  controlsList.style.lineHeight = "1.5";

  content.appendChild(closeButton);
  content.appendChild(title);
  content.appendChild(controlsList);
  modal.appendChild(content);
  document.body.appendChild(modal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) document.body.removeChild(modal);
  });
}