import { GameLoop } from "../engine/core/GameLoop";
import { SceneManager } from "../engine/core/SceneManager";
import { Renderer } from "../engine/core/Renderer";

export default class App {
  private gameLoop: GameLoop;
  private sceneManager: SceneManager;
  private renderer: Renderer;

  constructor() {
    this.renderer = new Renderer();
    this.sceneManager = new SceneManager(this.renderer);
    this.gameLoop = new GameLoop(this.sceneManager);
  }

  public init() {
    this.renderer.init();
    this.sceneManager.init();
    this.gameLoop.start();
  }
}
