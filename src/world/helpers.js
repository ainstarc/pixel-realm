import { storage } from "../core/storage.js";

/**
 * Retrieves saved map data from storage (if any)
 * @returns {Array|null} Saved map data or null
 */
export function getSavedMapData() {
  return storage.loadMapData();
}

/**
 * Determines whether to render the tile at the given y-level
 * @param {number} y - vertical coordinate
 * @returns {boolean} true if tile should be rendered
 */
export function shouldRenderTile(y) {
  return y === 0; // only top layer rendered for now
}

/**
 * Gets the tile type at given coordinates
 * @param {Array|null} savedMapData - previously saved map data
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {number} tile type ID
 */
export function getTileType(savedMapData, x, y, z) {
  if (
    savedMapData &&
    savedMapData[x] &&
    savedMapData[x][y] &&
    savedMapData[x][y][z] !== undefined
  ) {
    return savedMapData[x][y][z];
  } else {
    // Terrain generation logic
    if (y === 0) {
      // surface layer - mostly grass with some dirt and sand
      if (Math.random() < 0.8) {
        return 0; // grass
      } else {
        return Math.random() < 0.5 ? 1 : 2; // dirt or sand
      }
    } else {
      // underground layers mostly dirt
      return 1;
    }
  }
}
