import * as THREE from "three";
import { generateMap } from "./world/world.js";
import { createPlayer, updatePlayerMovement } from "./player/player.js";
import { setupInput, keys, resetPressedKeys } from "./player/input.js";
import { materials } from "./core/assets.js";
import { gameState } from "./core/gameState.js";
import { storage } from "./core/storage.js";
import { setupMobileControls } from "./ui/mobileControls.js";
import { setupHUD } from "./ui/hud.js";
import { setupSettingsMenu } from "./ui/settingsMenu.js";

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaee9a7);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(2, 3, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(1, 3, 2);
scene.add(dirLight);

// Init
setupInput();
const { mapData, tiles } = generateMap(scene, 32);

// Store in gameState
gameState.mapData = mapData;
gameState.tiles = tiles;
gameState.materials = materials;

const player = createPlayer(scene);

// Setup UI elements
setupSettingsMenu();
setupMobileControls();
const hud = setupHUD();

// Add instructions for mouse controls
const instructions = document.createElement('div');
instructions.className = 'ui';
instructions.style.position = 'absolute';
instructions.style.top = '50%';
instructions.style.left = '50%';
instructions.style.transform = 'translate(-50%, -50%)';
instructions.style.color = 'white';
instructions.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
instructions.style.padding = '20px';
instructions.style.borderRadius = '5px';
instructions.style.textAlign = 'center';
instructions.style.fontFamily = 'Arial, sans-serif';
instructions.style.zIndex = '1000';
instructions.innerHTML = 'Click to enable mouse look<br>WASD to move<br>Space to jump<br>Left-click or E to place blocks<br>1-4 to select block type<br>Alt to temporarily show cursor';
document.body.appendChild(instructions);

// Hide instructions when pointer is locked
document.addEventListener('pointerlockchange', () => {
  if (document.pointerLockElement) {
    instructions.style.display = 'none';
  } else {
    instructions.style.display = 'block';
  }
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  updatePlayerMovement(player, keys, camera);

  // Update HUD
  hud.update();

  renderer.render(scene, camera);

  // Reset one-time key presses at the end of each frame
  resetPressedKeys();
}
animate();

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});