import { Chunk } from './Chunk';
import { TileRegistry } from '../tiles/TileRegistry';

export class ChunkBuilder {
  private chunkSize: number;

  constructor(chunkSize: number) {
    this.chunkSize = chunkSize;
  }

  public build(position: { x: number; y: number; z: number }): Chunk {
    const chunk = new Chunk(position, this.chunkSize);

    for (let x = 0; x < this.chunkSize; x++) {
      for (let y = 0; y < this.chunkSize; y++) {
        for (let z = 0; z < this.chunkSize; z++) {
          const tile = TileRegistry.getTile('grass');
          if (tile) {
            chunk.setTile(x, y, z, tile);
          }
        }
      }
    }

    return chunk;
  }
}
