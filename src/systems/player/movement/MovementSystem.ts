import { PlayerState } from '../state/PlayerState';

export class MovementSystem {
  constructor(private state: PlayerState) {}

  public applyGravity(): void {
    if (this.state.position.y > 0) {
      this.state.velocity.y -= 0.01;
    } else {
      this.state.velocity.y = 0;
      this.state.position.y = 0;
    }

    this.state.position.y += this.state.velocity.y;
  }
}
