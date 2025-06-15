import { Chunk } from '../../world/chunk/Chunk';
import { Tile } from '../../world/tiles/Tile';

export class TilePlacer {
  public placeTile(chunk: Chunk, x: number, y: number, z: number, tile: Tile): void {
    chunk.setTile(x, y, z, tile);
  }
}
