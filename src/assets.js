/**
 * Assets module for Pixel Realm
 *
 * Handles loading and managing game textures and materials.
 * Uses proper path resolution for compatibility with GitHub Pages.
 */

import * as THREE from "three";

const loader = new THREE.TextureLoader();

// Load textures with proper path resolution
// For GitHub Pages deployment, assets should be in the public folder
export const textures = {
  grass: loader.load("textures/grass.png"),
  dirt: loader.load("textures/dirt.png"),
  sand: loader.load("textures/sand.png"),
  water: loader.load("textures/water.png"),
};

// Keep them pixelated
Object.values(textures).forEach((tex) => {
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
});

export const materials = {
  grass: new THREE.MeshLambertMaterial({ map: textures.grass }),
  dirt: new THREE.MeshLambertMaterial({ map: textures.dirt }),
  sand: new THREE.MeshLambertMaterial({ map: textures.sand }),
  water: new THREE.MeshLambertMaterial({
    map: textures.water,
    transparent: true,
    opacity: 0.8,
  }),
};