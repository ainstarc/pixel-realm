import { Chunk } from '../chunk/Chunk';

export class WorldState {
  private chunks: Map<string, Chunk> = new Map();

  public addChunk(chunk: Chunk): void {
    const key = this.getChunkKey(chunk.position.x, chunk.position.y, chunk.position.z);
    this.chunks.set(key, chunk);
  }

  public getChunk(x: number, y: number, z: number): Chunk | undefined {
    const key = this.getChunkKey(x, y, z);
    return this.chunks.get(key);
  }

  public getAllChunks(): Chunk[] {
    return Array.from(this.chunks.values());
  }

  private getChunkKey(x: number, y: number, z: number): string {
    return `${x}:${y}:${z}`;
  }
}
