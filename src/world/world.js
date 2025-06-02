/**
 * World generation module for Pixel Realm
 * 
 * Handles the creation and loading of the game world.
 * Generates a 3D grid of voxels with different materials based on type.
 * Supports loading saved map data from localStorage.
 */

import * as THREE from "three";
import { materials } from "../core/assets.js";
import { storage } from "../core/storage.js";
import { TILE_NAMES } from "../player/player.js";

// Constants for world dimensions
const MAP_HEIGHT = 4; // Vertical layers

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
  const tileGeo = new THREE.BoxGeometry(1, 0.5, 1);

  // Initialize 3D arrays
  for (let x = 0; x < size; x++) {
    mapData[x] = [];
    tiles[x] = [];
    
    for (let y = 0; y < MAP_HEIGHT; y++) {
      mapData[x][y] = [];
      tiles[x][y] = [];
      
      for (let z = 0; z < size; z++) {
        // Use saved data if available, otherwise generate new terrain
        let type;
        
        if (savedMapData && savedMapData[x] && savedMapData[x][y] && savedMapData[x][y][z] !== undefined) {
          type = savedMapData[x][y][z];
        } else {
          // Simple terrain generation logic
          if (y === 0) {
            // Surface layer - mostly grass with some dirt and sand
            type = Math.random() < 0.8 ? 0 : (Math.random() < 0.5 ? 1 : 2);
          } else {
            // Underground layers - mostly dirt
            type = 1;
          }
        }
        
        mapData[x][y][z] = type;
        
        // Only render the top-most block for now
        if (y === 0) {
          // Get the tile type name from the numeric value
          const tileType = TILE_NAMES[type] || "grass";
          
          // Use the appropriate material for this tile type
          const mat = materials[tileType];
          const tile = new THREE.Mesh(tileGeo, mat);
          tile.position.set(x - size / 2, 0, z - size / 2);
          scene.add(tile);
          tiles[x][y][z] = tile;
        } else {
          // Store null for non-rendered blocks
          tiles[x][y][z] = null;
        }
      }
    }
  }
  
  // Save initial map data if none was loaded
  if (!savedMapData) {
    storage.saveMapData(mapData);
  }
  
  return { mapData, tiles };
}