// Saves and loads game settings to/from localStorage
export function saveSettings(settings) {
  try {
    localStorage.setItem("pixel-realm-settings", JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save settings:", e);
  }
}

export function loadSettings() {
  try {
    const savedSettings = localStorage.getItem("pixel-realm-settings");
    return savedSettings ? JSON.parse(savedSettings) : null;
  } catch (e) {
    console.error("Failed to load settings:", e);
    return null;
  }
}
