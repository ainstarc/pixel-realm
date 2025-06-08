import { CAM_DISTANCE, CAM_HEIGHT } from "./playerConstants.js";

export function updateCamera(camera, player, rotation) {
  camera.position.x = player.position.x + Math.sin(rotation) * CAM_DISTANCE;
  camera.position.z = player.position.z + Math.cos(rotation) * CAM_DISTANCE;
  camera.position.y = player.position.y + CAM_HEIGHT;
  camera.lookAt(player.position);
}
