/**
 * Player module for Pixel Realm
 *
 * Handles player creation, movement, and interaction with the world.
 * Includes tile highlighting, preview system, and tile placement.
 * Also manages persistence of player position and map data.
 */

import * as THREE from "three";
import { gameState } from "../core/gameState.js";
import { keyPressed, mouseMovement, isPointerLocked } from "./input.js";
import { storage } from "../core/storage.js";

// Track the currently highlighted tile
let highlightedTile = null;
let highlightBorder = null;
let previewTile = null;
let saveTimer = 0;
let positionSaveTimer = 0;
let isJumping = false;
let jumpVelocity = 0;
let playerRotation = 0; // Player facing direction in radians
// Track key press duration for strafe detection
let keyPressTime = { a: 0, d: 0 };
const STRAFE_THRESHOLD = 15; // Frames to hold before strafing

/**
 * Map tile types to numeric values for storage
 * This allows efficient storage in localStorage
 */
const TILE_TYPES = {
  grass: 0,
  dirt: 1,
  sand: 2,
  water: 3,
};

/**
 * Map numeric values back to tile type names
 * Used when loading saved map data
 */
const TILE_NAMES = {
  0: "grass",
  1: "dirt",
  2: "sand",
  3: "water",
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
    console.log("Loaded player position:", savedPosition);
    player.position.set(savedPosition.x, savedPosition.y, savedPosition.z);
  } else {
    console.log("No saved position found, using default");
    player.position.set(0, 0.5, 0);
  }

  scene.add(player);

  // Create highlight border
  const borderGeo = new THREE.EdgesGeometry(
    new THREE.BoxGeometry(1.05, 0.55, 1.05)
  );
  const borderMat = new THREE.LineBasicMaterial({
    color: 0xffff00,
    linewidth: 2,
  });
  highlightBorder = new THREE.LineSegments(borderGeo, borderMat);
  highlightBorder.visible = false;
  scene.add(highlightBorder);

  // Create preview tile
  const tileGeo = new THREE.BoxGeometry(1, 0.5, 1);
  const previewMat = new THREE.MeshStandardMaterial({
    transparent: true,
    opacity: 0.5,
    color: 0xffffff,
  });
  previewTile = new THREE.Mesh(tileGeo, previewMat);
  previewTile.visible = false;
  scene.add(previewTile);

  // Save initial position immediately to ensure it's stored
  storage.savePlayerPosition(player.position);

  return player;
}

/**
 * Gets the tile index at the player's position
 * @param {THREE.Vector3} playerPos - Player position
 * @param {number} mapSize - Size of the map
 * @returns {Object} - Object with x, y, and z indices
 */
function getPlayerTileIndex(playerPos, mapSize) {
  const half = mapSize / 2;
  const x = Math.floor(playerPos.x + half);
  const y = 0; // Currently only working with the top layer
  const z = Math.floor(playerPos.z + half);

  // Clamp indexes in range
  return {
    x: Math.max(0, Math.min(mapSize - 1, x)),
    y: y,
    z: Math.max(0, Math.min(mapSize - 1, z)),
  };
}

/**
 * Gets the tile index in front of the player
 * @param {THREE.Vector3} playerPos - Player position
 * @param {number} rotation - Player rotation in radians
 * @param {number} mapSize - Size of the map
 * @returns {Object} - Object with x, y, and z indices
 */
function getFrontTileIndex(playerPos, rotation, mapSize) {
  const half = mapSize / 2;
  
  // Calculate position in front of player
  const frontX = playerPos.x - Math.sin(rotation);
  const frontZ = playerPos.z - Math.cos(rotation);
  
  // Convert to tile indices
  const x = Math.floor(frontX + half);
  const y = 0; // Currently only working with the top layer
  const z = Math.floor(frontZ + half);

  // Clamp indexes in range
  return {
    x: Math.max(0, Math.min(mapSize - 1, x)),
    y: y,
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
 * @param {THREE.Camera} camera - The camera to update based on player position
 */
export function updatePlayerMovement(player, keys, camera) {
  const speed = 0.05;
  const rotationSpeed = 0.03;
  const mouseSensitivity = 0.002;
  const gravity = 0.005; // Reduced gravity for slower fall
  const jumpStrength = 0.15;
  const camDistance = 2;
  const camHeight = 1;

  const nextPos = player.position.clone();

  // Handle mouse rotation if pointer is locked
  if (isPointerLocked && mouseMovement.x !== 0) {
    playerRotation -= mouseMovement.x * mouseSensitivity;
  }

  // Rotate player with A and D keys
  if (keys["a"]) {
    keyPressTime.a++;
    if (keyPressTime.a < STRAFE_THRESHOLD && !isPointerLocked) {
      // Only rotate with keys if not using mouse look
      playerRotation += rotationSpeed;
    } else {
      // Always strafe when using mouse look or after threshold
      nextPos.x -= Math.cos(playerRotation) * speed;
      nextPos.z += Math.sin(playerRotation) * speed;
    }
  } else {
    keyPressTime.a = 0;
  }
  if (keys["d"]) {
    keyPressTime.d++;
    if (keyPressTime.d < STRAFE_THRESHOLD && !isPointerLocked) {
      // Only rotate with keys if not using mouse look
      playerRotation -= rotationSpeed;
    } else {
      // Always strafe when using mouse look or after threshold
      nextPos.x += Math.cos(playerRotation) * speed;
      nextPos.z -= Math.sin(playerRotation) * speed;
    }
  } else {
    keyPressTime.d = 0;
  }

  // Apply rotation to player mesh
  player.rotation.y = playerRotation;

  // Move forward/backward in the facing direction
  if (keys["w"]) {
    nextPos.x -= Math.sin(playerRotation) * speed;
    nextPos.z -= Math.cos(playerRotation) * speed;
  }
  if (keys["s"]) {
    nextPos.x += Math.sin(playerRotation) * speed;
    nextPos.z += Math.cos(playerRotation) * speed;
  }

  // Highlight the tile in front of the player
  if (gameState.mapData && gameState.tiles && gameState.materials) {
    // Get the tile index in front of the player
    const { x, y, z } = getFrontTileIndex(player.position, playerRotation, 32);

    // Make sure indices are valid
    if (
      gameState.mapData[x] &&
      gameState.mapData[x][y] &&
      gameState.mapData[x][y][z] !== undefined &&
      gameState.tiles[x] &&
      gameState.tiles[x][y] &&
      gameState.tiles[x][y][z]
    ) {
      // Update highlight border position
      const currentTile = gameState.tiles[x][y][z];
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
      highlightedTile = { x, y, z };

      // Toggle tile type ONLY on initial 'e' key press
      if (keyPressed["e"]) {
        // Place the currently selected tile type
        const newType = TILE_TYPES[gameState.selectedTileType];
        gameState.mapData[x][y][z] = newType;

        // Update tile material based on selected type
        currentTile.material = gameState.materials[gameState.selectedTileType];

        // Save map data when changes are made
        saveMapData();
      }
    }
  }

  // Improved jumping system
  const onGround = player.position.y <= 0.5;

  // Start jump when spacebar is pressed and player is on the ground
  if (keys[" "] && onGround && !isJumping) {
    isJumping = true;
    jumpVelocity = jumpStrength;
  }

  // Apply jump velocity
  if (isJumping) {
    nextPos.y += jumpVelocity;
    jumpVelocity -= gravity;

    // End jump when player lands
    if (nextPos.y <= 0.5) {
      nextPos.y = 0.5;
      isJumping = false;
      jumpVelocity = 0;
    }
  } else {
    // Apply gravity when not jumping
    nextPos.y -= gravity;
    if (nextPos.y < 0.5) nextPos.y = 0.5;
  }

  // Arrow keys for alternative movement
  if (keys["ArrowUp"]) nextPos.z -= speed; // Arrow up
  if (keys["ArrowDown"]) nextPos.z += speed; // Arrow down
  if (keys["ArrowLeft"]) nextPos.x -= speed; // Arrow left
  if (keys["ArrowRight"]) nextPos.x += speed; // Arrow right

  // Clamp to map boundary (-16 to 15 for a 32x32 map)
  const min = -16;
  const max = 15;

  nextPos.x = Math.max(min, Math.min(max, nextPos.x));
  nextPos.z = Math.max(min, Math.min(max, nextPos.z));

  player.position.copy(nextPos);

  // Update camera to follow player from behind
  camera.position.x =
    player.position.x + Math.sin(playerRotation) * camDistance;
  camera.position.z =
    player.position.z + Math.cos(playerRotation) * camDistance;
  camera.position.y = player.position.y + camHeight;
  camera.lookAt(player.position);

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
    console.log("Player position saved:", {
      x: position.x,
      y: position.y,
      z: position.z,
    });
  }, 1000); // Less frequent saves for position
}

// Export for use in other modules
export { TILE_TYPES, TILE_NAMES };