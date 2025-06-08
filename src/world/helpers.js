import { storage } from "../core/storage.js";

export function getSavedMapData() {
  return storage.loadMapData();
}

export function shouldRenderTile(y) {
  return y === 0; // only top layer rendered for now
}

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
