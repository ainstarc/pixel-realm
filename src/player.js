import * as THREE from "three";
import { gameState } from "./gameState.js";
import { keyPressed } from "./input.js";
import { storage } from "./storage.js";

// Track the currently highlighted tile
let highlightedTile = null;
let highlightBorder = null;
let saveTimer = 0;
let positionSaveTimer = 0;

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

  return player;
}

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
      
      // Store current tile info
      highlightedTile = { x, z };
      
      // Toggle tile type ONLY on initial 'e' key press
      if (keyPressed["e"]) {
        gameState.mapData[z][x] = gameState.mapData[z][x] === 0 ? 1 : 0;
        currentTile.material = gameState.mapData[z][x] === 0 
          ? gameState.materials.grass 
          : gameState.materials.mud;
          
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

// Debounced save to avoid saving on every frame
function saveMapData() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    storage.saveMapData(gameState.mapData);
    console.log("Map data saved");
  }, 500);
}

// Save player position with debounce
function savePlayerPosition(position) {
  clearTimeout(positionSaveTimer);
  positionSaveTimer = setTimeout(() => {
    storage.savePlayerPosition(position);
  }, 1000); // Less frequent saves for position
}