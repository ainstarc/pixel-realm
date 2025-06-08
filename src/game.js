import { scene, camera, renderer } from "./setup/init/scene.js";
import { initGame } from "./manager/setupManager.js";
import { setupInstructions } from "./setup/init/instructions.js";
import { startGameLoop } from "./loop/animate.js";

initGame(scene, camera);
setupInstructions();
startGameLoop(camera, scene, renderer);
