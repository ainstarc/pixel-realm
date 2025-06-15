import { Renderer } from "./Renderer";
import * as THREE from "three";

export class SceneManager {
  private renderer: Renderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
  }

  public init() {
    this.camera.position.set(0, 10, 10);
    this.camera.lookAt(0, 0, 0);
  }

  public update() {
    // Future system updates
  }

  public render() {
    this.renderer.render(this.scene, this.camera);
  }

  public getScene() {
    return this.scene;
  }

  public getCamera() {
    return this.camera;
  }
}
