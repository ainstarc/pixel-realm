export function clearSavedData() {
  try {
    localStorage.removeItem("pixel-realm-map");
    localStorage.removeItem("pixel-realm-player");
    localStorage.removeItem("pixel-realm-settings");
  } catch (e) {
    console.error("Failed to clear saved data:", e);
  }
}
