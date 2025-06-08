export const settingsStorage = {
  save(settings) {
    try {
      localStorage.setItem("pixel-realm-settings", JSON.stringify(settings));
    } catch (e) {
      console.error("Failed to save settings:", e);
    }
  },
  load() {
    try {
      const savedSettings = localStorage.getItem("pixel-realm-settings");
      return savedSettings ? JSON.parse(savedSettings) : null;
    } catch (e) {
      console.error("Failed to load settings:", e);
      return null;
    }
  },
};
