import { generateMap } from "../world/world.js";
import { createPlayer } from "../player/player.js";
import { setupInput } from "../player/input.js";
import { materials } from "../core/assets.js";
import { gameState } from "../core/gameState.js";
import { setupMobileControls } from "../ui/mobileControls.js";
import { setupHUD } from "../ui/hud.js";
import { setupSettingsMenu } from "../ui/settingsMenu.js";

export function initGame(scene, camera) {
  setupInput();
  const { mapData, tiles } = generateMap(scene, 32);
  gameState.mapData = mapData;
  gameState.tiles = tiles;
  gameState.materials = materials;
  const player = createPlayer(scene);
  setupSettingsMenu();
  setupMobileControls();
  const hud = setupHUD();
  gameState.player = player;
  gameState.camera = camera;
  gameState.hud = hud;
}