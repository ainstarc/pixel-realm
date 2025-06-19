// Handles the main animation/game loop and window resizing
import { updatePlayerMovement } from "../manager/playerManager.js";
import { keys, resetPressedKeys } from "../manager/inputManager.js";
import { stateManager } from "../manager/stateManager.js";

// Starts the game loop
export function startGameLoop(camera, scene, renderer) {
  function animate() {
    requestAnimationFrame(animate); // Loop
    updatePlayerMovement(stateManager.player, keys, camera); // Update player
    stateManager.hud.update(); // Update HUD
    renderer.render(scene, camera); // Render scene
    resetPressedKeys(); // Reset input
  }
  animate();

  // Handle window resizing
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
