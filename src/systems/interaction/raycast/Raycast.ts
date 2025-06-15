import * as THREE from 'three';

export class Raycast {
  private raycaster: THREE.Raycaster;
  private camera: THREE.Camera;
  private domElement: HTMLElement;

  constructor(camera: THREE.Camera, domElement: HTMLElement) {
    this.raycaster = new THREE.Raycaster();
    this.camera = camera;
    this.domElement = domElement;
  }

  public cast(mouse: { x: number; y: number }, objects: THREE.Object3D[]): THREE.Intersection[] {
    const rect = this.domElement.getBoundingClientRect();
    const normalized = {
      x: ((mouse.x - rect.left) / rect.width) * 2 - 1,
      y: -((mouse.y - rect.top) / rect.height) * 2 + 1,
    };

    this.raycaster.setFromCamera(normalized, this.camera);
    return this.raycaster.intersectObjects(objects);
  }
}
