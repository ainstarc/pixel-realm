import { SceneManager } from './SceneManager';

export class GameLoop {
  private sceneManager: SceneManager;
  private animationId: number = 0;

  constructor(sceneManager: SceneManager) {
    this.sceneManager = sceneManager;
  }

  public start() {
    const loop = () => {
      this.sceneManager.update();
      this.sceneManager.render();
      this.animationId = requestAnimationFrame(loop);
    };
    loop();
  }

  public stop() {
    cancelAnimationFrame(this.animationId);
  }
}
