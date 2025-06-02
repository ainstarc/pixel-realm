import * as THREE from "three";
import { gameState } from "./gameState.js";

export function createPlayer(scene) {
  const size = 0.5;
  const geo = new THREE.BoxGeometry(size, size, size);
  const mat = new THREE.MeshStandardMaterial({ color: 0xff4444 });

  const player = new THREE.Mesh(geo, mat);
  player.position.set(0, 0.3, 0);
  scene.add(player);

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

  if (keys["e"] && gameState.mapData && gameState.tiles) {
    const { x, z } = getPlayerTileIndex(player.position, 32);

    // Toggle tile type (0->1 or 1->0)
    gameState.mapData[z][x] = gameState.mapData[z][x] === 0 ? 1 : 0;

    // Update tile material
    const tile = gameState.tiles[z][x];
    tile.material = gameState.mapData[z][x] === 0 ? gameState.materials.grass : gameState.materials.mud;
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
}