import * as THREE from 'three';

export class Raycast {
  private raycaster: THREE.Raycaster;

  constructor(private camera: THREE.Camera) {
    this.raycaster = new THREE.Raycaster();
  }

  public cast(mouse: { x: number; y: number }, objects: THREE.Object3D[]): THREE.Intersection[] {
    const normalized = new THREE.Vector2(mouse.x, mouse.y);
    this.raycaster.setFromCamera(normalized, this.camera);
    return this.raycaster.intersectObjects(objects);
  }
}
