import { saveMapData, loadMapData } from "../core/storage/mapStorage.js";
import {
  savePlayerPosition,
  loadPlayerPosition,
} from "../core/storage/playerStorage.js";
import { saveSettings, loadSettings } from "../core/storage/settingsStorage.js";
import { clearSavedData } from "../core/storage/clearStorage.js";

export const storageManager = {
  saveMapData,
  loadMapData,
  savePlayerPosition,
  loadPlayerPosition,
  saveSettings,
  loadSettings,
  clearSavedData,
};
