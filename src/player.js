/**
 * Player module for Pixel Realm
 * 
 * Handles player creation, movement, and interaction with the world.
 * Includes tile highlighting, preview system, and tile placement.
 * Also manages persistence of player position and map data.
 */

import * as THREE from "three";
import { gameState } from "./gameState.js";
import { keyPressed } from "./input.js";
import { storage } from "./storage.js";

// Track the currently highlighted tile
let highlightedTile = null;
let highlightBorder = null;
let previewTile = null;
let saveTimer = 0;
let positionSaveTimer = 0;

/**
 * Map tile types to numeric values for storage
 * This allows efficient storage in localStorage
 */
const TILE_TYPES = {
  grass: 0,
  dirt: 1,
  sand: 2,
  water: 3
};

/**
 * Map numeric values back to tile type names
 * Used when loading saved map data
 */
const TILE_NAMES = {
  0: "grass",
  1: "dirt",
  2: "sand",
  3: "water"
};

/**
 * Creates the player and associated visual elements
 * @param {THREE.Scene} scene - The Three.js scene
 * @returns {THREE.Mesh} - The player mesh
 */
export function createPlayer(scene) {
  const size = 0.5;
  const geo = new THREE.BoxGeometry(size, size, size);
  const mat = new THREE.MeshStandardMaterial({ color: 0xff4444 });

  const player = new THREE.Mesh(geo, mat);
  
  // Try to load saved position
  const savedPosition = storage.loadPlayerPosition();
  if (savedPosition) {
    player.position.set(savedPosition.x, savedPosition.y, savedPosition.z);
  } else {
    player.position.set(0, 0.3, 0);
  }
  
  scene.add(player);

  // Create highlight border
  const borderGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.05, 0.15, 1.05));
  const borderMat = new THREE.LineBasicMaterial({ color: 0xffff00, linewidth: 2 });
  highlightBorder = new THREE.LineSegments(borderGeo, borderMat);
  highlightBorder.visible = false;
  scene.add(highlightBorder);
  
  // Create preview tile
  const tileGeo = new THREE.BoxGeometry(1, 0.1, 1);
  const previewMat = new THREE.MeshStandardMaterial({
    transparent: true,
    opacity: 0.5,
    color: 0xffffff
  });
  previewTile = new THREE.Mesh(tileGeo, previewMat);
  previewTile.visible = false;
  scene.add(previewTile);

  return player;
}

/**
 * Gets the tile index at the player's position
 * @param {THREE.Vector3} playerPos - Player position
 * @param {number} mapSize - Size of the map
 * @returns {Object} - Object with x and z indices
 */
function getPlayerTileIndex(playerPos, mapSize) {
  const half = mapSize / 2;
  const x = Math.floor(playerPos.x + half);
  const z = Math.floor(playerPos.z + half);
  // Clamp indexes in range
  return {
    x: Math.max(0, Math.min(mapSize - 1, x)),
    z: Math.max(0, Math.min(mapSize - 1, z)),
  };
}

/**
 * Updates the preview tile material based on selected tile type
 */
function updatePreviewMaterial() {
  if (!gameState.materials || !gameState.selectedTileType) return;
  
  // Clone the selected material and make it transparent
  const selectedMaterial = gameState.materials[gameState.selectedTileType];
  if (!selectedMaterial) return;
  
  // Create a new material based on the selected one
  const previewMaterial = selectedMaterial.clone();
  previewMaterial.transparent = true;
  previewMaterial.opacity = 0.5;
  previewMaterial.depthWrite = false; // Prevents z-fighting
  
  // Apply the new material
  previewTile.material = previewMaterial;
}

/**
 * Updates player movement and handles interactions
 * @param {THREE.Mesh} player - The player mesh
 * @param {Object} keys - Object tracking key states
 */
export function updatePlayerMovement(player, keys) {
  const speed = 0.05;

  const nextPos = player.position.clone();

  if (keys["w"]) nextPos.z -= speed;
  if (keys["s"]) nextPos.z += speed;
  if (keys["a"]) nextPos.x -= speed;
  if (keys["d"]) nextPos.x += speed;

  // Highlight the current tile
  if (gameState.mapData && gameState.tiles && gameState.materials) {
    const { x, z } = getPlayerTileIndex(player.position, 32);
    
    // Make sure indices are valid
    if (gameState.mapData[z] && gameState.mapData[z][x] !== undefined && 
        gameState.tiles[z] && gameState.tiles[z][x]) {
      
      // Update highlight border position
      const currentTile = gameState.tiles[z][x];
      highlightBorder.position.copy(currentTile.position);
      highlightBorder.visible = true;
      
      // Update preview tile
      previewTile.position.copy(currentTile.position);
      previewTile.position.y += 0.01; // Slightly above the actual tile to prevent z-fighting
      previewTile.visible = true;
      
      // Update preview material when tile selection changes
      if (previewTile.userData.lastType !== gameState.selectedTileType) {
        updatePreviewMaterial();
        previewTile.userData.lastType = gameState.selectedTileType;
      }
      
      // Store current tile info
      highlightedTile = { x, z };
      
      // Toggle tile type ONLY on initial 'e' key press
      if (keyPressed["e"]) {
        // Place the currently selected tile type
        const newType = TILE_TYPES[gameState.selectedTileType];
        gameState.mapData[z][x] = newType;
        
        // Update tile material based on selected type
        currentTile.material = gameState.materials[gameState.selectedTileType];
        
        // Save map data when changes are made
        saveMapData();
      }
    }
  }

  if (keys[" "]) nextPos.y += speed; // Jump
  if (keys["ShiftLeft"]) nextPos.y -= speed; // Crouch
  if (keys["ControlLeft"]) nextPos.y -= speed; // Crouch
  if (keys["ArrowUp"]) nextPos.z -= speed; // Arrow up
  if (keys["ArrowDown"]) nextPos.z += speed; // Arrow down
  if (keys["ArrowLeft"]) nextPos.x -= speed; // Arrow left
  if (keys["ArrowRight"]) nextPos.x += speed; // Arrow right
  // Gravity
  nextPos.y -= 0.01;
  if (nextPos.y < 0.5) nextPos.y = 0.5; // Prevent going below ground
  if (nextPos.y > 2) nextPos.y = 1; // Prevent going above a certain height

  // Clamp to map boundary (-16 to 15 for a 32x32 map)
  const min = -16;
  const max = 15;

  nextPos.x = Math.max(min, Math.min(max, nextPos.x));
  nextPos.z = Math.max(min, Math.min(max, nextPos.z));

  player.position.copy(nextPos);
  
  // Save player position periodically
  savePlayerPosition(player.position);
}

/**
 * Debounced save to avoid saving map data on every frame
 * Saves the current state of the map to localStorage
 */
function saveMapData() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    storage.saveMapData(gameState.mapData);
    console.log("Map data saved");
  }, 500);
}

/**
 * Save player position with debounce
 * Called periodically during movement to track player location
 * @param {THREE.Vector3} position - Player position
 */
function savePlayerPosition(position) {
  clearTimeout(positionSaveTimer);
  positionSaveTimer = setTimeout(() => {
    storage.savePlayerPosition(position);
  }, 1000); // Less frequent saves for position
}

// Export for use in other modules
export { TILE_TYPES, TILE_NAMES };