import { updatePlayerMovement } from "../manager/playerManager.js";
import { keys, resetPressedKeys } from "../manager/inputManager.js";
import { stateManager } from "../manager/stateManager.js";

export function startGameLoop(camera, scene, renderer) {
  function animate() {
    requestAnimationFrame(animate);
    updatePlayerMovement(stateManager.player, keys, camera);
    stateManager.hud.update();
    renderer.render(scene, camera);
    resetPressedKeys();
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
