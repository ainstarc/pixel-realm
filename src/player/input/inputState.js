export const keys = {};
export const keyPressed = {};

export let isPointerLocked = false;
export function setIsPointerLocked(value) {
  isPointerLocked = value;
}

export const mouseMovement = { x: 0, y: 0 };

export let mouseClicked = false;
export function setMouseClicked(value) {
  mouseClicked = value;
}

export let wasPointerLockedBeforeAlt = false;
export function setWasPointerLockedBeforeAlt(value) {
  wasPointerLockedBeforeAlt = value;
}

export let isHoveringUI = false;
export function setIsHoveringUI(value) {
  isHoveringUI = value;
}
