import { PlayerState } from '../state/PlayerState';

export class PlayerController {
  constructor(private state: PlayerState) {}

  public moveForward(amount: number): void {
    this.state.position.z -= amount;
  }

  public moveBackward(amount: number): void {
    this.state.position.z += amount;
  }

  public moveLeft(amount: number): void {
    this.state.position.x -= amount;
  }

  public moveRight(amount: number): void {
    this.state.position.x += amount;
  }
}
