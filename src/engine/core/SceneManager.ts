import * as THREE from 'three';

export class SceneManager {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  constructor(private renderer: { getDomElement(): HTMLElement; resize(): void }) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  }

  public init(): void {
    this.camera.position.set(8, 8, 20);
    window.addEventListener('resize', () => this.renderer.resize());
  }

  public getScene(): THREE.Scene {
    return this.scene;
  }

  public getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  public update(): void {
    // Any global scene logic per frame (skybox, environment, etc)
  }

  public render(): void {
    (this.renderer as any).renderer.render(this.scene, this.camera);
  }
}
