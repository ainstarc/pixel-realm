import { Tile } from '../tiles/Tile';

export class Chunk {
  public tiles: (Tile | null)[][][] = [];
  public position: { x: number; y: number; z: number };

  constructor(position: { x: number; y: number; z: number }, chunkSize: number) {
    this.position = position;

    for (let x = 0; x < chunkSize; x++) {
      this.tiles[x] = [];
      for (let y = 0; y < chunkSize; y++) {
        this.tiles[x][y] = [];
        for (let z = 0; z < chunkSize; z++) {
          this.tiles[x][y][z] = null;
        }
      }
    }
  }

  public setTile(x: number, y: number, z: number, tile: Tile): void {
    this.tiles[x][y][z] = tile;
  }

  public getTile(x: number, y: number, z: number): Tile | null {
    return this.tiles[x][y][z];
  }
}
