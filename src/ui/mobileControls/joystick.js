import { keys } from "../../manager/inputManager.js";
import { controlsState } from "./state.js";

export function createJoystickControls() {
  const joystickDiv = document.createElement("div");
  Object.assign(joystickDiv.style, {
    position: "relative",
    width: "120px",
    height: "120px",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: "60px",
    marginBottom: "20px",
  });

  const handle = document.createElement("div");
  Object.assign(handle.style, {
    position: "absolute",
    width: "50px",
    height: "50px",
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: "25px",
    top: "35px",
    left: "35px",
    transform: "translate(0, 0)",
  });

  joystickDiv.appendChild(handle);

  controlsState.joystickHandle = handle;

  joystickDiv.addEventListener("touchstart", handleJoystickStart, {
    passive: false,
  });
  joystickDiv.addEventListener("touchmove", handleJoystickMove, {
    passive: false,
  });
  joystickDiv.addEventListener("touchend", handleJoystickEnd, {
    passive: false,
  });

  return joystickDiv;
}

export function resetJoystickKeys() {
  keys.w = false;
  keys.a = false;
  keys.s = false;
  keys.d = false;
}

function handleJoystickStart(e) {
  const touch = e.touches[0];
  const rect = controlsState.joystickDiv.getBoundingClientRect();
  controlsState.joystickStartPos = {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top,
  };
  controlsState.joystickCurrentPos = { ...controlsState.joystickStartPos };
  controlsState.joystickActive = true;
}

function handleJoystickMove(e) {
  if (!controlsState.joystickActive) return;
  const touch = e.touches[0];
  const rect = controlsState.joystickDiv.getBoundingClientRect();
  const deltaX = touch.clientX - rect.left - controlsState.joystickStartPos.x;
  const deltaY = touch.clientY - rect.top - controlsState.joystickStartPos.y;

  const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), 35);
  const angle = Math.atan2(deltaY, deltaX);
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  controlsState.joystickHandle.style.transform = `translate(${x}px, ${y}px)`;

  keys.w = y < -10;
  keys.s = y > 10;
  keys.a = x < -10;
  keys.d = x > 10;
}

function handleJoystickEnd(e) {
  controlsState.joystickActive = false;
  controlsState.joystickHandle.style.transform = "translate(0, 0)";
  resetJoystickKeys();
}
