import * as THREE from 'three';

export class Renderer {
  public renderer: THREE.WebGLRenderer;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
  }

  public init(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this.renderer.domElement);
  }

  public getDomElement(): HTMLElement {
    return this.renderer.domElement;
  }

  public resize(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
