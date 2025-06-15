import { PlayerState } from '../state/PlayerState';

export class MovementSystem {
  private state: PlayerState;

  constructor(state: PlayerState) {
    this.state = state;
  }

  public applyGravity() {
    this.state.velocity.y -= 0.01;
    this.state.position.y += this.state.velocity.y;
    if (this.state.position.y < 0) {
      this.state.position.y = 0;
      this.state.velocity.y = 0;
    }
  }

  public jump() {
    if (this.state.position.y === 0) {
      this.state.velocity.y = 0.2;
    }
  }
}
