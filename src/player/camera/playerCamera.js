import {CAM_DISTANCE, CAM_HEIGHT, MOUSE_SENSITIVITY} from "../player/playerConstants.js";
import {cameraRotation, maxCameraPitch, playerCamera, playerCameraGroup} from "../../setup/init/scene.js";
import {mouseMovement} from "../input/inputState.js";


export function updateCameraPosition(player) {
    playerCameraGroup.position.copy(player.position);
    playerCameraGroup.position.y += CAM_HEIGHT;
}

export function updatePlayerLook() {
    playerCameraGroup.rotation.y -= mouseMovement.x * MOUSE_SENSITIVITY;

    cameraRotation.pitch -= mouseMovement.y * MOUSE_SENSITIVITY;
    cameraRotation.pitch = Math.max(-maxCameraPitch, Math.min(maxCameraPitch, cameraRotation.pitch));
    playerCamera.rotation.x = cameraRotation.pitch;

    mouseMovement.x = 0;
    mouseMovement.y = 0;
}

