import { WorldState } from '../state/WorldState';
import { ChunkBuilder } from './ChunkBuilder';
import { Chunk } from './Chunk';

export class ChunkLoader {
  private world: WorldState;
  private builder: ChunkBuilder;

  constructor(world: WorldState, builder: ChunkBuilder) {
    this.world = world;
    this.builder = builder;
  }

  public loadInitialChunks() {
    const chunk = this.builder.generateChunk(0, 0, 0);
    this.world.addChunk(chunk);
  }
}
