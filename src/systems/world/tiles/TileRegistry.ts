import { Tile } from './Tile';

export class TileRegistry {
  private static tiles: Map<string, Tile> = new Map();

  public static registerTile(id: string, texture: string) {
    const tile = new Tile(id, texture);
    TileRegistry.tiles.set(id, tile);
  }

  public static getTile(id: string): Tile {
    const tile = TileRegistry.tiles.get(id);
    if (!tile) throw new Error(`Tile not found: ${id}`);
    return tile;
  }
}
