import { Chunk } from './Chunk';
import { Tile } from '../tiles/Tile';
import { TileRegistry } from '../tiles/TileRegistry';

export class ChunkBuilder {
  private size: number;

  constructor(size: number) {
    this.size = size;
  }

  public generateChunk(x: number, y: number, z: number): Chunk {
    const chunk = new Chunk(x, y, z, this.size);
    const dirtTile = TileRegistry.getTile('dirt');

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        for (let k = 0; k < this.size; k++) {
          chunk.setTile(i, j, k, dirtTile);
        }
      }
    }

    return chunk;
  }
}
