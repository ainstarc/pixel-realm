import { PlayerState } from '../state/PlayerState';
import * as THREE from 'three';

export class CameraSystem {
  constructor(
    private state: PlayerState,
    private camera: THREE.PerspectiveCamera
  ) {}

  public updateCamera(): void {
    this.camera.position.set(
      this.state.position.x,
      this.state.position.y + 5,
      this.state.position.z + 10
    );
    this.camera.lookAt(
      this.state.position.x,
      this.state.position.y,
      this.state.position.z
    );
  }
}
