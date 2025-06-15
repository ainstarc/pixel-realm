import * as THREE from 'three';
import { Tile } from '../../world/tiles/Tile';

export class TilePlacer {
  public placeTile(position: THREE.Vector3, tile: Tile) {
    // Future: logic to add tile to world data structure
    console.log(`Placed tile ${tile.id} at`, position);
  }
}
