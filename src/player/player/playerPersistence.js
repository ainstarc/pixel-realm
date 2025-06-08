import { storage } from "../../core/storage.js";
import { gameState } from "../../core/gameState.js";

let saveTimer = 0;
let positionSaveTimer = 0;

export function saveMapData() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    storage.saveMapData(gameState.mapData);
    console.log("Map data saved");
  }, 500);
}

export function savePlayerPosition(position) {
  clearTimeout(positionSaveTimer);
  positionSaveTimer = setTimeout(() => {
    storage.savePlayerPosition(position);
    console.log("Player position saved:", {
      x: position.x,
      y: position.y,
      z: position.z,
    });
  }, 1000);
}
