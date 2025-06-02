import * as THREE from "three";
import { materials } from "./assets.js";
import { storage } from "./storage.js";

export function generateMap(scene, size = 32) {
  // Try to load saved map data
  const savedMapData = storage.loadMapData();
  
  const mapData = [];
  const tiles = [];
  const tileGeo = new THREE.BoxGeometry(1, 0.1, 1);

  for (let z = 0; z < size; z++) {
    const rowData = [];
    const rowTiles = [];
    for (let x = 0; x < size; x++) {
      // Use saved data if available, otherwise generate random
      const type = savedMapData && savedMapData[z] && savedMapData[z][x] !== undefined
        ? savedMapData[z][x]
        : Math.random() < 0.8 ? 0 : 1;
        
      const mat = type === 0 ? materials.grass : materials.dirt;
      const tile = new THREE.Mesh(tileGeo, mat);
      tile.position.set(x - size / 2, 0, z - size / 2);
      scene.add(tile);
      rowData.push(type);
      rowTiles.push(tile);
    }
    mapData.push(rowData);
    tiles.push(rowTiles);
  }
  
  // Save initial map data if none was loaded
  if (!savedMapData) {
    storage.saveMapData(mapData);
  }
  
  return { mapData, tiles };
}