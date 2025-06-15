import { WorldState } from '../world/state/WorldState';

export class StorageManager {
  public saveWorld(world: WorldState): void {
    const data = JSON.stringify(world);
    localStorage.setItem('pixel-realm-world', data);
  }

  public loadWorld(): string | null {
    return localStorage.getItem('pixel-realm-world');
  }

  public clear(): void {
    localStorage.removeItem('pixel-realm-world');
  }
}
