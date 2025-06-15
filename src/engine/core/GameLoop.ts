import { SceneManager } from "./SceneManager";

export class GameLoop {
  private updateFn: () => void;
  private animationId: number = 0;
  private sceneManager: SceneManager;

  constructor(sceneManager: SceneManager) {
    this.sceneManager = sceneManager;
    this.updateFn = () => {};
  }

  public start(update: () => void) {
    this.updateFn = update;

    const loop = () => {
      this.updateFn();
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
