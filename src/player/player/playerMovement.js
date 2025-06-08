import {
  keyPressed,
  mouseMovement,
  isPointerLocked,
} from "../input.js";
import {
  STRAFE_THRESHOLD,
  SPEED,
  ROTATION_SPEED,
  MOUSE_SENSITIVITY,
  CAM_DISTANCE,
  CAM_HEIGHT,
} from "./playerConstants.js";
import { handleJump } from "./playerJump.js";
import { updateCamera } from "./playerCamera.js";
import { handleTileInteraction } from "./playerInteraction.js";
import { savePlayerPosition } from "./playerPersistence.js";

const keyPressTime = { a: 0, d: 0 };
let playerRotation = 0;

export function updatePlayerMovement(player, keys, camera) {
  const nextPos = player.position.clone();

  if (isPointerLocked && mouseMovement.x !== 0) {
    playerRotation -= mouseMovement.x * MOUSE_SENSITIVITY;
  }

  if (keys["a"]) {
    keyPressTime.a++;
    if (keyPressTime.a < STRAFE_THRESHOLD && !isPointerLocked) {
      playerRotation += ROTATION_SPEED;
    } else {
      nextPos.x -= Math.cos(playerRotation) * SPEED;
      nextPos.z += Math.sin(playerRotation) * SPEED;
    }
  } else keyPressTime.a = 0;

  if (keys["d"]) {
    keyPressTime.d++;
    if (keyPressTime.d < STRAFE_THRESHOLD && !isPointerLocked) {
      playerRotation -= ROTATION_SPEED;
    } else {
      nextPos.x += Math.cos(playerRotation) * SPEED;
      nextPos.z -= Math.sin(playerRotation) * SPEED;
    }
  } else keyPressTime.d = 0;

  player.rotation.y = playerRotation;

  if (keys["w"]) {
    nextPos.x -= Math.sin(playerRotation) * SPEED;
    nextPos.z -= Math.cos(playerRotation) * SPEED;
  }
  if (keys["s"]) {
    nextPos.x += Math.sin(playerRotation) * SPEED;
    nextPos.z += Math.cos(playerRotation) * SPEED;
  }

  // Arrow keys
  if (keys["ArrowUp"]) nextPos.z -= SPEED;
  if (keys["ArrowDown"]) nextPos.z += SPEED;
  if (keys["ArrowLeft"]) nextPos.x -= SPEED;
  if (keys["ArrowRight"]) nextPos.x += SPEED;

  // Jump logic
  handleJump(player, keys, nextPos);

  // Tile interaction
  handleTileInteraction(player, playerRotation);

  // Clamp bounds (-16 to 15)
  nextPos.x = Math.max(-16, Math.min(15, nextPos.x));
  nextPos.z = Math.max(-16, Math.min(15, nextPos.z));

  player.position.copy(nextPos);

  updateCamera(camera, player, playerRotation);
  savePlayerPosition(player.position);
}
