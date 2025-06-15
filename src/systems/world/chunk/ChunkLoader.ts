import { WorldState } from '../state/WorldState';
import { Chunk } from './Chunk';
import { ChunkBuilder } from './ChunkBuilder';

export class ChunkLoader {
  private world: WorldState;
  private builder: ChunkBuilder;

  constructor(world: WorldState, builder: ChunkBuilder) {
    this.world = world;
    this.builder = builder;
  }

  public loadInitialChunks(): void {
    const chunk = this.builder.build({ x: 0, y: 0, z: 0 });
    this.world.addChunk(chunk);
  }
}
