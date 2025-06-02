// Game state persistence using localStorage

export const storage = {
  // Save map data to localStorage
  saveMapData(mapData) {
    try {
      localStorage.setItem('pixel-realm-map', JSON.stringify(mapData));
    } catch (e) {
      console.error('Failed to save map data:', e);
    }
  },

  // Load map data from localStorage
  loadMapData() {
    try {
      const savedData = localStorage.getItem('pixel-realm-map');
      return savedData ? JSON.parse(savedData) : null;
    } catch (e) {
      console.error('Failed to load map data:', e);
      return null;
    }
  },

  // Save player position
  savePlayerPosition(position) {
    try {
      localStorage.setItem('pixel-realm-player', JSON.stringify({
        x: position.x,
        y: position.y,
        z: position.z
      }));
    } catch (e) {
      console.error('Failed to save player position:', e);
    }
  },

  // Load player position
  loadPlayerPosition() {
    try {
      const savedPos = localStorage.getItem('pixel-realm-player');
      return savedPos ? JSON.parse(savedPos) : null;
    } catch (e) {
      console.error('Failed to load player position:', e);
      return null;
    }
  },

  // Save settings
  saveSettings(settings) {
    try {
      localStorage.setItem('pixel-realm-settings', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  },

  // Load settings
  loadSettings() {
    try {
      const savedSettings = localStorage.getItem('pixel-realm-settings');
      return savedSettings ? JSON.parse(savedSettings) : null;
    } catch (e) {
      console.error('Failed to load settings:', e);
      return null;
    }
  },

  // Clear saved data
  clearSavedData() {
    try {
      localStorage.removeItem('pixel-realm-map');
      localStorage.removeItem('pixel-realm-player');
      localStorage.removeItem('pixel-realm-settings');
    } catch (e) {
      console.error('Failed to clear saved data:', e);
    }
  }
};