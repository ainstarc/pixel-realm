export class PlayerState {
  public position: { x: number; y: number; z: number };
  public velocity: { x: number; y: number; z: number };

  constructor() {
    this.position = { x: 0, y: 5, z: 0 };
    this.velocity = { x: 0, y: 0, z: 0 };
  }

  public setPosition(x: number, y: number, z: number) {
    this.position = { x, y, z };
  }

  public setVelocity(x: number, y: number, z: number) {
    this.velocity = { x, y, z };
  }
}
