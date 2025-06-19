// Re-exports storage functions for map, player, and settings data
import { saveMapData, loadMapData } from "../core/storage/mapStorage.js";
import {
  savePlayerPosition,
  loadPlayerPosition,
} from "../core/storage/playerStorage.js";
import { saveSettings, loadSettings } from "../core/storage/settingsStorage.js";
import { clearSavedData } from "../core/storage/clearStorage.js";

// Centralized storage manager for saving/loading game data
export const storageManager = {
  saveMapData,
  loadMapData,
  savePlayerPosition,
  loadPlayerPosition,
  saveSettings,
  loadSettings,
  clearSavedData,
};
