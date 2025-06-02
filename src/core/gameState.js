/**
 * Game State module for Pixel Realm
 * 
 * Central store for shared game data that needs to be accessed
 * across different modules. This helps avoid circular dependencies
 * and provides a single source of truth for important game state.
 */

// Central place to store shared game state
export const gameState = {
  /**
   * 3D array of tile type values
   * Each value corresponds to a tile type (0=grass, 1=dirt, etc.)
   * Structure: mapData[x][y][z]
   */
  mapData: null,
  
  /**
   * 3D array of THREE.Mesh objects representing the tiles
   * Corresponds to the mapData array positions
   * Structure: tiles[x][y][z]
   */
  tiles: null,
  
  /**
   * Object containing material references for different tile types
   * Keys are tile type names (grass, dirt, sand, water)
   */
  materials: null,
  
  /**
   * Currently selected tile type for placement
   * Default is 'grass'
   */
  selectedTileType: 'grass'
};