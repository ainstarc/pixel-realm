export class StorageManager {
  private static MAP_KEY = 'pixel-realm-map';
  private static PLAYER_KEY = 'pixel-realm-player';

  public static saveMap(mapData: object) {
    localStorage.setItem(this.MAP_KEY, JSON.stringify(mapData));
  }

  public static loadMap(): object | null {
    const data = localStorage.getItem(this.MAP_KEY);
    return data ? JSON.parse(data) : null;
  }

  public static savePlayer(playerData: object) {
    localStorage.setItem(this.PLAYER_KEY, JSON.stringify(playerData));
  }

  public static loadPlayer(): object | null {
    const data = localStorage.getItem(this.PLAYER_KEY);
    return data ? JSON.parse(data) : null;
  }

  public static clearAll() {
    localStorage.removeItem(this.MAP_KEY);
    localStorage.removeItem(this.PLAYER_KEY);
  }
}
