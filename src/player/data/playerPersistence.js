import { storageManager } from "../../manager/storageManager.js";
import { stateManager } from "../../manager/stateManager.js";

let saveTimer = 0;
let positionSaveTimer = 0;

export function saveMapData() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    storageManager.saveMapData(stateManager.mapData);
    console.log("Map data saved");
  }, 500);
}

export function savePlayerPosition(position) {
  clearTimeout(positionSaveTimer);
  positionSaveTimer = setTimeout(() => {
    storageManager.savePlayerPosition(position);
    console.log("Player position saved:", {
      x: position.x,
      y: position.y,
      z: position.z,
    });
  }, 1000);
}
