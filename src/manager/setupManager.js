// Initializes the game: map, player, input, UI, and settings
import { generateMap } from "./worldManager.js";
import { createPlayer } from "./playerManager.js";
import { setupInput } from "./inputManager.js";
import { materials } from "./assetsManager.js";
import { stateManager } from "./stateManager.js";
import { setupMobileControls } from "./mobileControlsManager.js";
import { setupHUD } from "../ui/hud/hud.js";
import { setupSettingsMenu } from "./settingsMenuManager.js";

// Main game initialization function
export function initGame(scene, camera) {
  setupInput(); // Set up keyboard, mouse, and UI input
  const { mapData, tiles } = generateMap(scene, 32); // Generate world
  stateManager.mapData = mapData;
  stateManager.tiles = tiles;
  stateManager.materials = materials;
  const player = createPlayer(scene); // Add player to scene
  setupSettingsMenu(); // Add settings menu
  setupMobileControls(); // Add mobile controls if needed
  const hud = setupHUD(); // Add HUD
  stateManager.player = player;
  stateManager.camera = camera;
  stateManager.hud = hud;
}
