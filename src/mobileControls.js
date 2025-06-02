import { keys } from "./input.js";

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
    
    // Touch events
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      keys[key] = true;
    });
    
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      keys[key] = false;
    });
    
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
  actionDiv.style.gap = '10px';
  
  // Jump button
  const jumpBtn = createButton('Jump', ' ', '');
  jumpBtn.style.width = '80px';
  jumpBtn.style.height = '80px';
  actionDiv.appendChild(jumpBtn);
  
  // Toggle button
  const toggleBtn = createButton('Toggle', 'e', '');
  toggleBtn.style.width = '80px';
  toggleBtn.style.height = '80px';
  actionDiv.appendChild(toggleBtn);
  
  // Add to DOM
  controlsDiv.appendChild(moveDiv);
  controlsDiv.appendChild(actionDiv);
  document.body.appendChild(controlsDiv);
  
  // Add mobile class to body for CSS adjustments
  document.body.classList.add('mobile');
  
  return controlsDiv;
}