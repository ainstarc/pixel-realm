import { PlayerController } from '../../systems/player/control/PlayerController';
import { MovementSystem } from '../../systems/player/movement/MovementSystem';

export class MobileControls {
  private controller: PlayerController;
  private movement: MovementSystem;

  constructor(controller: PlayerController, movement: MovementSystem) {
    this.controller = controller;
    this.movement = movement;
  }

  public update() {
    // Placeholder for mobile controls
    // Future: virtual joystick & buttons
  }
}
