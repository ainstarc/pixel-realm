// Sets up the main game scene, instructions, and starts the game loop
import {
  scene,
  playerCameraGroup,
  renderer,
  playerCamera,
} from "./setup/init/scene.js";
import { initGame } from "./manager/setupManager.js";
import { setupInstructions } from "./setup/init/instructions.js";
import { startGameLoop } from "./loop/animate.js";

// Initialize game objects and state
initGame(scene, playerCamera);
// Show instructions overlay
setupInstructions();
// Start the animation/game loop
startGameLoop(playerCamera, scene, renderer);
