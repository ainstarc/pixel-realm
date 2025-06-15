import { PlayerController } from '../../systems/player/control/PlayerController';
import { MovementSystem } from '../../systems/player/movement/MovementSystem';
import { InputManager } from '../InputManager';

export class PCControls {
  private input: InputManager;
  private controller: PlayerController;
  private movement: MovementSystem;

  constructor(input: InputManager, controller: PlayerController, movement: MovementSystem) {
    this.input = input;
    this.controller = controller;
    this.movement = movement;
  }

  public update() {
    if (this.input.isKeyPressed('w')) this.controller.moveForward();
    if (this.input.isKeyPressed('s')) this.controller.moveBackward();
    if (this.input.isKeyPressed('a')) this.controller.moveLeft();
    if (this.input.isKeyPressed('d')) this.controller.moveRight();
    if (this.input.isKeyPressed(' ')) this.movement.jump();
  }
}
