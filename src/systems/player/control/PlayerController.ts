import { PlayerState } from '../state/PlayerState';

export class PlayerController {
  private state: PlayerState;
  private speed: number = 0.1;

  constructor(state: PlayerState) {
    this.state = state;
  }

  public moveForward() {
    this.state.position.z -= this.speed;
  }

  public moveBackward() {
    this.state.position.z += this.speed;
  }

  public moveLeft() {
    this.state.position.x -= this.speed;
  }

  public moveRight() {
    this.state.position.x += this.speed;
  }
}
