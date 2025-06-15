import { Chunk } from "../chunk/Chunk";

export class WorldState {
  private chunks: Map<string, Chunk>;

  constructor() {
    this.chunks = new Map();
  }

  public addChunk(chunk: Chunk) {
    const key = `${chunk.position.x},${chunk.position.y},${chunk.position.z}`;
    this.chunks.set(key, chunk);
  }

  public getChunk(x: number, y: number, z: number): Chunk | undefined {
    const key = `${x},${y},${z}`;
    return this.chunks.get(key);
  }

  public getAllChunks(): Chunk[] {
    return Array.from(this.chunks.values());
  }
}
