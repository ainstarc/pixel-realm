import { Tile } from './Tile';

export class TileRegistry {
  private static tiles: Map<string, Tile> = new Map();

  public static registerTile(id: string, texture: string): void {
    this.tiles.set(id, { id, texture });
  }

  public static getTile(id: string): Tile | undefined {
    return this.tiles.get(id);
  }
}
