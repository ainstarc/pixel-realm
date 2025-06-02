/**
 * Main entry point for Pixel Realm
 * 
 * This file re-exports all modules from the new directory structure
 * to maintain backward compatibility during the transition.
 */

// Core modules
export { gameState } from './core/gameState.js';
export { materials, textures } from './core/assets.js';
export { storage } from './core/storage.js';

// World modules
export { generateMap } from './world/world.js';

// Player modules
export { createPlayer, updatePlayerMovement, TILE_TYPES, TILE_NAMES } from './player/player.js';
export { setupInput, keys, keyPressed, resetPressedKeys } from './player/input.js';

// UI modules
export { setupHUD } from './ui/hud.js';
export { setupMobileControls } from './ui/mobileControls.js';
export { setupSettingsMenu } from './ui/settingsMenu.js';

// Import main to execute it
import './main.js';