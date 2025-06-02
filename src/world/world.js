/**
 * World generation module for Pixel Realm
 * 
 * Handles the creation and loading of the game world.
 * Generates a grid of tiles with different materials based on type.
 * Supports loading saved map data from localStorage.
 */

import * as THREE from "three";
import { materials } from "../core/assets.js";
import { storage } from "../core/storage.js";
import { TILE_NAMES } from "../player/player.js";

/**
 * Generates the game world map
 * @param {THREE.Scene} scene - The Three.js scene
 * @param {number} size - Size of the map (default: 32x32)
 * @returns {Object} - Object containing mapData and tiles arrays
 */
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
        
      // Get the tile type name from the numeric value
      const tileType = TILE_NAMES[type] || "grass";
      
      // Use the appropriate material for this tile type
      const mat = materials[tileType];
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