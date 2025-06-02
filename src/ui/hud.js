/**
 * HUD (Heads-Up Display) module for Pixel Realm
 * 
 * Creates and manages the on-screen UI elements that display game information.
 * Currently shows the selected tile type in the top-left corner.
 */

import { gameState } from "../core/gameState.js";

/**
 * Sets up the HUD elements
 * @returns {Object} - Object with update method for refreshing the HUD
 */
export function setupHUD() {
  // Create HUD container
  const hudContainer = document.createElement('div');
  hudContainer.id = 'hud';
  hudContainer.style.position = 'absolute';
  hudContainer.style.top = '10px';
  hudContainer.style.left = '10px';
  hudContainer.style.color = 'white';
  hudContainer.style.fontFamily = 'Arial, sans-serif';
  hudContainer.style.fontSize = '16px';
  hudContainer.style.fontWeight = 'bold';
  hudContainer.style.padding = '8px 12px';
  hudContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  hudContainer.style.borderRadius = '4px';
  hudContainer.style.textShadow = '1px 1px 2px black';
  hudContainer.style.zIndex = '1000';
  
  // Create tile selection display
  const tileDisplay = document.createElement('div');
  tileDisplay.id = 'tile-display';
  tileDisplay.textContent = `Selected: ${capitalizeFirstLetter(gameState.selectedTileType)}`;
  
  // Add to DOM
  hudContainer.appendChild(tileDisplay);
  document.body.appendChild(hudContainer);
  
  // Return object with update method
  return {
    /**
     * Updates the HUD display with current game state
     */
    update() {
      tileDisplay.textContent = `Selected: ${capitalizeFirstLetter(gameState.selectedTileType)}`;
    }
  };
}

/**
 * Helper function to capitalize first letter of a string
 * @param {string} string - Input string
 * @returns {string} - String with first letter capitalized
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}