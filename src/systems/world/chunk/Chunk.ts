import { Tile } from "../tiles/Tile";

export class Chunk {
  public position: { x: number; y: number; z: number };
  public tiles: Tile[][][];

  constructor(x: number, y: number, z: number, size: number) {
    this.position = { x, y, z };
    this.tiles = Array(size)
      .fill(null)
      .map(() =>
        Array(size)
          .fill(null)
          .map(() => Array(size).fill(null))
      );
  }

  public setTile(x: number, y: number, z: number, tile: Tile) {
    this.tiles[x][y][z] = tile;
  }

  public getTile(x: number, y: number, z: number): Tile | null {
    return this.tiles[x]?.[y]?.[z] ?? null;
  }
}
