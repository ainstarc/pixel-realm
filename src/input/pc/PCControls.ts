import { InputManager } from '../InputManager';
import { PlayerController } from '../../systems/player/control/PlayerController';

export class PCControls {
  constructor(
    private input: InputManager,
    private player: PlayerController
  ) {}

  public update(): void {
    const speed = 0.1;

    if (this.input.isKeyPressed('w')) this.player.moveForward(speed);
    if (this.input.isKeyPressed('s')) this.player.moveBackward(speed);
    if (this.input.isKeyPressed('a')) this.player.moveLeft(speed);
    if (this.input.isKeyPressed('d')) this.player.moveRight(speed);
  }
}
