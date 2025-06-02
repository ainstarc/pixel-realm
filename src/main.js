import * as THREE from "three";

// === SCENE SETUP ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaee9a7); // light sky green

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(2, 2, 5);

// === RENDERER ===
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// === LIGHT ===
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(1, 3, 2);
scene.add(directionalLight);

// === GRASS TILE ===
const tileSize = 1;
const geometry = new THREE.BoxGeometry(tileSize, 0.1, tileSize);
const material = new THREE.MeshLambertMaterial({ color: 0x2ecc71 }); // green tile
const grassTile = new THREE.Mesh(geometry, material);
// scene.add(grassTile);
// === TILE GRID (WORLD MAP) ===
const mapSize = 10; // 10x10 tiles
for (let x = -mapSize / 2; x < mapSize / 2; x++) {
  for (let z = -mapSize / 2; z < mapSize / 2; z++) {
    const tile = new THREE.Mesh(geometry, material);
    tile.position.set(x, 0, z);
    scene.add(tile);
  }
}

// === PLAYER CUBE ===
const playerSize = 0.5;
const playerGeometry = new THREE.BoxGeometry(
  playerSize,
  playerSize,
  playerSize
);
const playerMaterial = new THREE.MeshStandardMaterial({ color: 0xff4444 }); // red cube
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.set(0, 0.3, 0); // above the tile
scene.add(player);

const keysPressed = {};

window.addEventListener("keydown", (e) => {
  keysPressed[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
  keysPressed[e.key.toLowerCase()] = false;
});

// === ANIMATE LOOP ===
function animate() {
  requestAnimationFrame(animate);

  const speed = 0.05;
  if (keysPressed["w"]) player.position.z -= speed;
  if (keysPressed["s"]) player.position.z += speed;
  if (keysPressed["a"]) player.position.x -= speed;
  if (keysPressed["d"]) player.position.x += speed;

  // Optional: make camera follow player
  player.position.x = Math.max(-5, Math.min(4, player.position.x));
  player.position.z = Math.max(-5, Math.min(4, player.position.z));

  camera.position.set(
    player.position.x + 2,
    player.position.y + 3,
    player.position.z + 5
  );
  camera.lookAt(player.position);

  renderer.render(scene, camera);
}
animate();

// === RESIZE HANDLER ===
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
