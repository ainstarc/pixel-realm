/**
 * Game state persistence using localStorage
 * 
 * This module handles saving and loading game state data including:
 * - Map data (tile types and positions)
 * - Player position (x, y, z coordinates)
 * - Game settings
 * 
 * Data is automatically saved during gameplay:
 * - Map data is saved when tiles are modified
 * - Player position is saved periodically during movement
 * - Settings are saved when changed
 */

export const storage = {
  /**
   * Save map data to localStorage
   * @param {Array} mapData - 2D array of tile type values
   */
  saveMapData(mapData) {
    try {
      localStorage.setItem('pixel-realm-map', JSON.stringify(mapData));
    } catch (e) {
      console.error('Failed to save map data:', e);
    }
  },

  /**
   * Load map data from localStorage
   * @returns {Array|null} - 2D array of tile type values or null if not found
   */
  loadMapData() {
    try {
      const savedData = localStorage.getItem('pixel-realm-map');
      return savedData ? JSON.parse(savedData) : null;
    } catch (e) {
      console.error('Failed to load map data:', e);
      return null;
    }
  },

  /**
   * Save player position to localStorage
   * @param {Object} position - THREE.Vector3 or object with x, y, z properties
   */
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

  /**
   * Load player position from localStorage
   * @returns {Object|null} - Object with x, y, z properties or null if not found
   */
  loadPlayerPosition() {
    try {
      const savedPos = localStorage.getItem('pixel-realm-player');
      return savedPos ? JSON.parse(savedPos) : null;
    } catch (e) {
      console.error('Failed to load player position:', e);
      return null;
    }
  },

  /**
   * Save game settings to localStorage
   * @param {Object} settings - Game settings object
   */
  saveSettings(settings) {
    try {
      localStorage.setItem('pixel-realm-settings', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  },

  /**
   * Load game settings from localStorage
   * @returns {Object|null} - Game settings object or null if not found
   */
  loadSettings() {
    try {
      const savedSettings = localStorage.getItem('pixel-realm-settings');
      return savedSettings ? JSON.parse(savedSettings) : null;
    } catch (e) {
      console.error('Failed to load settings:', e);
      return null;
    }
  },

  /**
   * Clear all saved game data from localStorage
   */
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