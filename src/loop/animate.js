import { updatePlayerMovement } from "../player/player.js";
import { keys, resetPressedKeys } from "../player/input.js";
import { gameState } from "../core/gameState.js";

export function startGameLoop(camera, scene, renderer) {
  function animate() {
    requestAnimationFrame(animate);
    updatePlayerMovement(gameState.player, keys, camera);
    gameState.hud.update();
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
