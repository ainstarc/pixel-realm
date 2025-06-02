/**
 * Mobile Controls module for Pixel Realm
 * 
 * Creates touch-friendly controls for mobile devices.
 * Includes movement pad, action buttons, and tile selection.
 */

import { keys, keyPressed } from "./input.js";
import { gameState } from "./gameState.js";

// Mobile touch controls
export function setupMobileControls() {
  // Only setup on touch devices
  if (!('ontouchstart' in window)) return;
  
  const controlsDiv = document.createElement('div');
  controlsDiv.id = 'mobile-controls';
  controlsDiv.style.position = 'absolute';
  controlsDiv.style.bottom = '20px';
  controlsDiv.style.left = '0';
  controlsDiv.style.width = '100%';
  controlsDiv.style.display = 'flex';
  controlsDiv.style.justifyContent = 'space-between';
  controlsDiv.style.padding = '0 20px';
  controlsDiv.style.boxSizing = 'border-box';
  
  // Movement pad
  const moveDiv = document.createElement('div');
  moveDiv.style.display = 'grid';
  moveDiv.style.gridTemplateColumns = 'repeat(3, 60px)';
  moveDiv.style.gridTemplateRows = 'repeat(3, 60px)';
  moveDiv.style.gap = '5px';
  
  // Create movement buttons
  const createButton = (text, key, gridArea) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.style.gridArea = gridArea;
    btn.style.width = '100%';
    btn.style.height = '100%';
    btn.style.backgroundColor = 'rgba(255,255,255,0.3)';
    btn.style.border = 'none';
    btn.style.borderRadius = '10px';
    btn.style.fontSize = '24px';
    btn.style.color = 'white';
    btn.style.userSelect = 'none';
    
    // Touch events with passive: false option
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      keys[key] = true;
    }, { passive: false });
    
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      keys[key] = false;
    }, { passive: false });
    
    return btn;
  };
  
  // Create action button that triggers keyPressed events
  const createActionButton = (text, key, width, height) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.style.width = width || '80px';
    btn.style.height = height || '80px';
    btn.style.backgroundColor = 'rgba(255,255,255,0.3)';
    btn.style.border = 'none';
    btn.style.borderRadius = '10px';
    btn.style.fontSize = '24px';
    btn.style.color = 'white';
    btn.style.userSelect = 'none';
    
    // Touch events with passive: false option
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      keys[key] = true;
      keyPressed[key] = true; // Important: Set keyPressed for action buttons
    }, { passive: false });
    
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      keys[key] = false;
    }, { passive: false });
    
    return btn;
  };
  
  // Create tile selection button
  const createTileButton = (text, tileType) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.style.width = '50px';
    btn.style.height = '50px';
    btn.style.backgroundColor = 'rgba(255,255,255,0.3)';
    btn.style.border = 'none';
    btn.style.borderRadius = '10px';
    btn.style.fontSize = '14px';
    btn.style.color = 'white';
    btn.style.userSelect = 'none';
    btn.style.margin = '0 5px';
    
    // Touch events with passive: false option
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      gameState.selectedTileType = tileType;
    }, { passive: false });
    
    return btn;
  };
  
  // Movement buttons
  moveDiv.appendChild(createButton('↑', 'w', '1 / 2 / 2 / 3'));
  moveDiv.appendChild(createButton('←', 'a', '2 / 1 / 3 / 2'));
  moveDiv.appendChild(createButton('↓', 's', '2 / 2 / 3 / 3'));
  moveDiv.appendChild(createButton('→', 'd', '2 / 3 / 3 / 4'));
  
  // Action buttons
  const actionDiv = document.createElement('div');
  actionDiv.style.display = 'flex';
  actionDiv.style.flexDirection = 'column';
  actionDiv.style.gap = '10px';
  
  // Main action buttons
  const mainActions = document.createElement('div');
  mainActions.style.display = 'flex';
  mainActions.style.gap = '10px';
  
  // Jump button - increased size for better usability
  const jumpBtn = createButton('Jump', ' ', '');
  jumpBtn.style.width = '80px';
  jumpBtn.style.height = '80px';
  mainActions.appendChild(jumpBtn);
  
  // Place button - using createActionButton to trigger keyPressed
  const placeBtn = createActionButton('Place', 'e', '80px', '80px');
  mainActions.appendChild(placeBtn);
  
  actionDiv.appendChild(mainActions);
  
  // Tile selection row
  const tileSelectionDiv = document.createElement('div');
  tileSelectionDiv.style.display = 'flex';
  tileSelectionDiv.style.justifyContent = 'center';
  tileSelectionDiv.style.marginTop = '10px';
  
  // Tile buttons
  tileSelectionDiv.appendChild(createTileButton('Grass', 'grass'));
  tileSelectionDiv.appendChild(createTileButton('Dirt', 'dirt'));
  tileSelectionDiv.appendChild(createTileButton('Sand', 'sand'));
  tileSelectionDiv.appendChild(createTileButton('Water', 'water'));
  
  actionDiv.appendChild(tileSelectionDiv);
  
  // Add to DOM
  controlsDiv.appendChild(moveDiv);
  controlsDiv.appendChild(actionDiv);
  document.body.appendChild(controlsDiv);
  
  // Prevent page scrolling when touching the controls
  controlsDiv.addEventListener('touchmove', (e) => {
    e.preventDefault();
  }, { passive: false });
  
  // Add mobile class to body for CSS adjustments
  document.body.classList.add('mobile');
  
  return controlsDiv;
}