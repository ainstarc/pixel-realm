export function setupSettingsIcon() {
  const settingsIcon = document.createElement("div");
  settingsIcon.id = "settings-icon";
  settingsIcon.className = "ui";
  settingsIcon.innerHTML = "⚙️";
  Object.assign(settingsIcon.style, {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "24px",
    color: "white",
    textShadow: "1px 1px 2px black",
    cursor: "pointer",
    zIndex: "1000",
    userSelect: "none",
  });
  return settingsIcon;
}

export function setupSettingsMenuContainer() {
  const settingsMenu = document.createElement("div");
  settingsMenu.id = "settings-menu";
  settingsMenu.className = "ui";
  Object.assign(settingsMenu.style, {
    position: "absolute",
    top: "40px",
    right: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: "10px",
    borderRadius: "5px",
    display: "none",
    flexDirection: "column",
    gap: "8px",
    zIndex: "999",
    minWidth: "200px",
  });
  settingsMenu.appendChild(createSectionHeader("Game Options"));
  return settingsMenu;
}

export function createSectionHeader(text) {
  const header = document.createElement("div");
  header.textContent = text;
  Object.assign(header.style, {
    color: "white",
    fontWeight: "bold",
    borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
    marginTop: "8px",
    marginBottom: "8px",
    paddingBottom: "4px",
  });
  return header;
}

export function createInfoText(text) {
  const info = document.createElement("div");
  info.textContent = text;
  Object.assign(info.style, {
    color: "white",
    fontSize: "12px",
    marginBottom: "6px",
  });
  return info;
}
