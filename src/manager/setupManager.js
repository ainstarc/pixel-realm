import { generateMap } from "./worldManager.js";
import { createPlayer } from "./playerManager.js";
import { setupInput } from "./inputManager.js";
import { materials } from "./assetsManager.js";
import { stateManager } from "./stateManager.js";
import { setupMobileControls } from "./mobileControlsManager.js";
import { setupHUD } from "../ui/hud/hud.js";
import { setupSettingsMenu } from "./settingsMenuManager.js";

export function initGame(scene, camera) {
  setupInput();
  const { mapData, tiles } = generateMap(scene, 32);
  stateManager.mapData = mapData;
  stateManager.tiles = tiles;
  stateManager.materials = materials;
  const player = createPlayer(scene);
  setupSettingsMenu();
  setupMobileControls();
  const hud = setupHUD();
  stateManager.player = player;
  stateManager.camera = camera;
  stateManager.hud = hud;
}