/**
 * Mobile Controls module for Pixel Realm
 * 
 * Creates touch-friendly controls for mobile devices.
 * Includes movement pad, action buttons, and tile selection.
 * Supports both joystick and button controls.
 */

import { keys, keyPressed } from "../player/input.js";
import { gameState } from "../core/gameState.js";
import { storage } from "../core/storage.js";

// Control state
let useJoystick = false;
let controlsDiv = null;
let joystickDiv = null;
let buttonsDiv = null;
let joystickActive = false;
let joystickStartPos = { x: 0, y: 0 };
let joystickCurrentPos = { x: 0, y: 0 };
let joystickHandle = null;

// Mobile touch controls
export function setupMobileControls() {
  // Only setup on touch devices
  if (!('ontouchstart' in window)) return;
  
  // Load user preference
  const settings = storage.loadSettings() || {};
  useJoystick = settings.useJoystick || false;
  
  // Create main container
  controlsDiv = document.createElement('div');
  controlsDiv.id = 'mobile-controls';
  controlsDiv.className = 'ui';
  controlsDiv.style.position = 'absolute';
  controlsDiv.style.bottom = '20px';
  controlsDiv.style.left = '0';
  controlsDiv.style.width = '100%';
  controlsDiv.style.display = 'flex';
  controlsDiv.style.justifyContent = 'space-between';
  controlsDiv.style.padding = '0 20px';
  controlsDiv.style.boxSizing = 'border-box';
  
  // Create both control types
  createButtonControls();
  createJoystickControls();
  
  // Action buttons (common to both control types)
  const actionDiv = createActionButtons();
  
  // Add to DOM
  controlsDiv.appendChild(useJoystick ? joystickDiv : buttonsDiv);
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

// Create traditional button controls
function createButtonControls() {
  buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'ui';
  buttonsDiv.style.display = 'grid';
  buttonsDiv.style.gridTemplateColumns = 'repeat(3, 60px)';
  buttonsDiv.style.gridTemplateRows = 'repeat(3, 60px)';
  buttonsDiv.style.gap = '5px';
  
  // Create movement buttons
  const createButton = (text, key, gridArea) => {
    const btn = document.createElement('button');
    btn.className = 'ui';
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
  
  // Movement buttons - updated for directional movement
  buttonsDiv.appendChild(createButton('↑', 'w', '1 / 2 / 2 / 3')); // Forward
  buttonsDiv.appendChild(createButton('←', 'a', '2 / 1 / 3 / 2')); // Rotate left
  buttonsDiv.appendChild(createButton('↓', 's', '2 / 2 / 3 / 3')); // Backward
  buttonsDiv.appendChild(createButton('→', 'd', '2 / 3 / 3 / 4')); // Rotate right
}

// Create joystick controls
function createJoystickControls() {
  joystickDiv = document.createElement('div');
  joystickDiv.className = 'ui';
  joystickDiv.style.position = 'relative';
  joystickDiv.style.width = '120px';
  joystickDiv.style.height = '120px';
  joystickDiv.style.backgroundColor = 'rgba(255,255,255,0.2)';
  joystickDiv.style.borderRadius = '60px';
  joystickDiv.style.marginBottom = '20px';
  
  // Create joystick handle
  joystickHandle = document.createElement('div');
  joystickHandle.className = 'ui';
  joystickHandle.style.position = 'absolute';
  joystickHandle.style.width = '50px';
  joystickHandle.style.height = '50px';
  joystickHandle.style.backgroundColor = 'rgba(255,255,255,0.5)';
  joystickHandle.style.borderRadius = '25px';
  joystickHandle.style.top = '35px';
  joystickHandle.style.left = '35px';
  joystickHandle.style.transform = 'translate(0, 0)';
  joystickDiv.appendChild(joystickHandle);
  
  // Joystick touch events
  joystickDiv.addEventListener('touchstart', handleJoystickStart, { passive: false });
  joystickDiv.addEventListener('touchmove', handleJoystickMove, { passive: false });
  joystickDiv.addEventListener('touchend', handleJoystickEnd, { passive: false });
}

// Create action buttons (common to both control types)
function createActionButtons() {
  const actionDiv = document.createElement('div');
  actionDiv.className = 'ui';
  actionDiv.style.display = 'flex';
  actionDiv.style.flexDirection = 'column';
  actionDiv.style.gap = '10px';
  
  // Create action button that triggers keyPressed events
  const createActionButton = (text, key, width, height) => {
    const btn = document.createElement('button');
    btn.className = 'ui';
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
    btn.className = 'ui';
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
  
  // Main action buttons
  const mainActions = document.createElement('div');
  mainActions.className = 'ui';
  mainActions.style.display = 'flex';
  mainActions.style.gap = '10px';
  
  // Jump button - increased size for better usability
  const jumpBtn = createActionButton('Jump', ' ', '80px', '80px');
  mainActions.appendChild(jumpBtn);
  
  // Place button - using createActionButton to trigger keyPressed
  const placeBtn = createActionButton('Place', 'e', '80px', '80px');
  mainActions.appendChild(placeBtn);
  
  actionDiv.appendChild(mainActions);
  
  // Tile selection row
  const tileSelectionDiv = document.createElement('div');
  tileSelectionDiv.className = 'ui';
  tileSelectionDiv.style.display = 'flex';
  tileSelectionDiv.style.justifyContent = 'center';
  tileSelectionDiv.style.marginTop = '10px';
  
  // Tile buttons
  tileSelectionDiv.appendChild(createTileButton('Grass', 'grass'));
  tileSelectionDiv.appendChild(createTileButton('Dirt', 'dirt'));
  tileSelectionDiv.appendChild(createTileButton('Sand', 'sand'));
  tileSelectionDiv.appendChild(createTileButton('Water', 'water'));
  
  actionDiv.appendChild(tileSelectionDiv);
  
  return actionDiv;
}

// Joystick event handlers
function handleJoystickStart(e) {
  e.preventDefault();
  joystickActive = true;
  
  const touch = e.touches[0];
  const rect = joystickDiv.getBoundingClientRect();
  joystickStartPos = {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
  joystickCurrentPos = { ...joystickStartPos };
}

function handleJoystickMove(e) {
  if (!joystickActive) return;
  e.preventDefault();
  
  const touch = e.touches[0];
  const rect = joystickDiv.getBoundingClientRect();
  joystickCurrentPos = {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
  
  // Calculate joystick displacement
  let deltaX = joystickCurrentPos.x - joystickStartPos.x;
  let deltaY = joystickCurrentPos.y - joystickStartPos.y;
  
  // Limit to circle
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const maxDistance = 35; // Max joystick travel distance
  
  if (distance > maxDistance) {
    deltaX = (deltaX / distance) * maxDistance;
    deltaY = (deltaY / distance) * maxDistance;
  }
  
  // Update joystick handle position
  joystickHandle.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  
  // Convert joystick position to key presses
  // Forward/backward (W/S)
  if (deltaY < -10) {
    keys['w'] = true;
    keys['s'] = false;
  } else if (deltaY > 10) {
    keys['w'] = false;
    keys['s'] = true;
  } else {
    keys['w'] = false;
    keys['s'] = false;
  }
  
  // Left/right (A/D)
  if (deltaX < -10) {
    keys['a'] = true;
    keys['d'] = false;
  } else if (deltaX > 10) {
    keys['a'] = false;
    keys['d'] = true;
  } else {
    keys['a'] = false;
    keys['d'] = false;
  }
}

function handleJoystickEnd(e) {
  e.preventDefault();
  joystickActive = false;
  
  // Reset joystick handle position
  joystickHandle.style.transform = 'translate(0, 0)';
  
  // Reset all movement keys
  keys['w'] = false;
  keys['a'] = false;
  keys['s'] = false;
  keys['d'] = false;
}

// Toggle between joystick and button controls
export function toggleControlType(useJoystickControls) {
  if (!controlsDiv) return;
  
  useJoystick = useJoystickControls;
  
  // Save preference
  const settings = storage.loadSettings() || {};
  settings.useJoystick = useJoystick;
  storage.saveSettings(settings);
  
  // Remove current control element
  const currentControl = controlsDiv.firstChild;
  if (currentControl) {
    controlsDiv.removeChild(currentControl);
  }
  
  // Add new control element
  controlsDiv.insertBefore(useJoystick ? joystickDiv : buttonsDiv, controlsDiv.firstChild);
  
  // Reset all movement keys
  keys['w'] = false;
  keys['a'] = false;
  keys['s'] = false;
  keys['d'] = false;
}