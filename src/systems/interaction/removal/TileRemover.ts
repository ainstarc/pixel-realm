import { Chunk } from '../../world/chunk/Chunk';

export class TileRemover {
  public removeTile(chunk: Chunk, x: number, y: number, z: number): void {
    chunk.setTile(x, y, z, null);
  }
}
