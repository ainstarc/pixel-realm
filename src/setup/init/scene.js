import * as THREE from "three";

// Scene setup
export const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaee9a7);

export const cameraRotation = {
    pitch: 0
}
export const maxCameraPitch = Math.PI / 2 - 0.1; // Limit pitch to prevent flipping

// Camera setup
export const playerCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
playerCamera.position.set(0, 0, 0); // Initial camera position

export const playerCameraGroup = new THREE.Object3D();

playerCameraGroup.add(playerCamera);
scene.add(playerCameraGroup);

// Renderer setup
export const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

// Directional light
const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(1, 3, 2);
scene.add(dirLight);
