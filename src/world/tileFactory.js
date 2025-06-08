import * as THREE from "three";
import { materials } from "../core/assets.js";

/**
 * Creates a tile mesh at given coordinates with appropriate material
 * @param {string} tileType - tile material name (e.g., "grass")
 * @param {number} x - X coordinate
 * @param {number} size - map size (to center tiles)
 * @param {number} z - Z coordinate
 * @returns {THREE.Mesh} tile mesh
 */
export function createTile(tileType, x, size, z) {
  const tileGeo = new THREE.BoxGeometry(1, 0.5, 1);
  const mat = materials[tileType];
  const tile = new THREE.Mesh(tileGeo, mat);
  tile.position.set(x - size / 2, 0, z - size / 2);
  return tile;
}
