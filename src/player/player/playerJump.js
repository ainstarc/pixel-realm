import { GRAVITY, JUMP_STRENGTH } from "./playerConstants.js";

let isJumping = false;
let jumpVelocity = 0;

export function handleJump(player, keys, nextPos) {
  const onGround = player.position.y <= 0.5;

  if (keys[" "] && onGround && !isJumping) {
    isJumping = true;
    jumpVelocity = JUMP_STRENGTH;
  }

  if (isJumping) {
    nextPos.y += jumpVelocity;
    jumpVelocity -= GRAVITY;
    if (nextPos.y <= 0.5) {
      nextPos.y = 0.5;
      isJumping = false;
    }
  } else {
    nextPos.y -= GRAVITY;
    if (nextPos.y < 0.5) nextPos.y = 0.5;
  }
}
