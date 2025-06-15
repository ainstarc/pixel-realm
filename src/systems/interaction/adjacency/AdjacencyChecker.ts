import { Chunk } from '../../world/chunk/Chunk';
import { Tile } from '../../world/tiles/Tile';

export class AdjacencyChecker {
  public hasAdjacentTile(chunk: Chunk, x: number, y: number, z: number): boolean {
    const dirs = [
      [1, 0, 0], [-1, 0, 0],
      [0, 1, 0], [0, -1, 0],
      [0, 0, 1], [0, 0, -1]
    ];

    for (const [dx, dy, dz] of dirs) {
      const tile: Tile | null = chunk.getTile(x + dx, y + dy, z + dz);
      if (tile) return true;
    }

    return false;
  }
}
