import { PlayerState } from '../state/PlayerState';
import * as THREE from 'three';

export class CameraSystem {
  private state: PlayerState;
  private camera: THREE.PerspectiveCamera;

  constructor(state: PlayerState, camera: THREE.PerspectiveCamera) {
    this.state = state;
    this.camera = camera;
  }

  public updateCamera() {
    this.camera.position.set(
      this.state.position.x,
      this.state.position.y + 5,
      this.state.position.z + 10
    );
    this.camera.lookAt(this.state.position.x, this.state.position.y, this.state.position.z);
  }
}
