import { saveMapData, loadMapData } from "./storage/mapStorage.js";
import {
  savePlayerPosition,
  loadPlayerPosition,
} from "./storage/playerStorage.js";
import { saveSettings, loadSettings } from "./storage/settingsStorage.js";
import { clearSavedData } from "./storage/clearStorage.js";

export const storage = {
  saveMapData,
  loadMapData,
  savePlayerPosition,
  loadPlayerPosition,
  saveSettings,
  loadSettings,
  clearSavedData,
};
