import * as THREE from "three";
import { generateMap } from "./world.js";
import { createPlayer, updatePlayerMovement } from "./player.js";
import { setupInput, keys, resetPressedKeys } from "./input.js";
import { materials } from "./assets.js";
import { gameState } from "./gameState.js";
import { storage } from "./storage.js";
import { setupMobileControls } from "./mobileControls.js";
import { setupHUD } from "./hud.js";
import { setupSettingsMenu } from "./settingsMenu.js";

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

// Animate
function animate() {
  requestAnimationFrame(animate);
  updatePlayerMovement(player, keys);

  camera.position.x = player.position.x + 2;
  camera.position.z = player.position.z + 2;
  camera.lookAt(player.position);

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