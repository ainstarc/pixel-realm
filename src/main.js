import { scene, camera, renderer } from "./setup/scene.js";
import { initGame } from "./setup/init.js";
import { setupInstructions } from "./setup/instructions.js";
import { startGameLoop } from "./loop/animate.js";

initGame(scene, camera);
setupInstructions();
startGameLoop(camera, scene, renderer);
