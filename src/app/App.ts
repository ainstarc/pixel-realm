import { Renderer } from "../engine/core/Renderer";
import { SceneManager } from "../engine/core/SceneManager";
import { GameLoop } from "../engine/core/GameLoop";
import { WorldState } from "../systems/world/state/WorldState";
import { ChunkBuilder } from "../systems/world/chunk/ChunkBuilder";
import { ChunkLoader } from "../systems/world/chunk/ChunkLoader";
import { TileRegistry } from "../systems/world/tiles/TileRegistry";
import { GameConstants } from "../shared/constants/GameConstants";
import { SettingsMenu } from "../ui/components/SettingsMenu";
import { LoadingScreen } from "../ui/loader/LoadingScreen";

export default class App {
  private renderer!: Renderer;
  private sceneManager!: SceneManager;
  private world!: WorldState;
  private loadingScreen!: LoadingScreen;

  public init(): void {
    this.setupLoadingScreen();
    this.setupRenderer();
    this.setupScene();
    this.registerTiles();
    this.loadWorld();
    this.startGameLoop();
    new SettingsMenu();
  }

  private setupLoadingScreen(): void {
    this.loadingScreen = new LoadingScreen();
  }

  private setupRenderer(): void {
    this.renderer = new Renderer();
    this.renderer.init();
  }

  private setupScene(): void {
    this.sceneManager = new SceneManager(this.renderer);
    this.sceneManager.init();
  }

  private registerTiles(): void {
    TileRegistry.registerTile("grass", "/textures/grass.png");
    TileRegistry.registerTile("dirt", "/textures/dirt.png");
    TileRegistry.registerTile("sand", "/textures/sand.png");
    TileRegistry.registerTile("water", "/textures/water.png");
  }

  private loadWorld(): void {
    this.world = new WorldState();
    const builder = new ChunkBuilder(GameConstants.ChunkSize);
    const loader = new ChunkLoader(this.world, builder);
    loader.loadInitialChunks();
    this.loadingScreen.hide();
  }

  private startGameLoop(): void {
    const gameLoop = new GameLoop(this.sceneManager);
    gameLoop.start();
  }
}
