import * as THREE from "three";
import { TILE_NAMES } from "../player/player.js";
import { getSavedMapData, shouldRenderTile, getTileType } from "./helpers.js";
import { createTile } from "./tileFactory.js";
import { storage } from "../core/storage.js";

// Constants
const MAP_HEIGHT = 4; // Vertical layers

export function generateMap(scene, size = 32) {
  const savedMapData = getSavedMapData();
  const mapData = [];
  const tiles = [];

  for (let x = 0; x < size; x++) {
    mapData[x] = [];
    tiles[x] = [];

    for (let y = 0; y < MAP_HEIGHT; y++) {
      mapData[x][y] = [];
      tiles[x][y] = [];

      for (let z = 0; z < size; z++) {
        const type = getTileType(savedMapData, x, y, z);
        mapData[x][y][z] = type;

        if (shouldRenderTile(y)) {
          const tileType = TILE_NAMES[type] || "grass";
          const tile = createTile(tileType, x, size, z);
          scene.add(tile);
          tiles[x][y][z] = tile;
        } else {
          tiles[x][y][z] = null;
        }
      }
    }
  }

  if (!savedMapData) {
    storage.saveMapData(mapData);
  }

  return { mapData, tiles };
}
