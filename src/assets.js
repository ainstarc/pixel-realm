/**
 * Assets module for Pixel Realm
 * 
 * Handles loading and managing game textures and materials.
 * Uses proper path resolution for compatibility with GitHub Pages.
 */

import * as THREE from "three";

// Get base URL for proper path resolution in different environments
const basePath = import.meta.env?.BASE_URL || '';

const loader = new THREE.TextureLoader();

// Add error handling for texture loading
const loadTexture = (url) => {
  return new Promise((resolve, reject) => {
    loader.load(
      `${basePath}${url}`,
      (texture) => {
        console.log(`Texture loaded successfully: ${url}`);
        resolve(texture);
      },
      undefined,
      (error) => {
        console.error(`Error loading texture: ${url}`, error);
        reject(error);
      }
    );
  });
};

// Load textures with proper path resolution
export const textures = {
  grass: loader.load(`${basePath}src/assets/textures/grass.png`),
  dirt: loader.load(`${basePath}src/assets/textures/dirt.png`),
  sand: loader.load(`${basePath}src/assets/textures/sand.png`),
  water: loader.load(`${basePath}src/assets/textures/water.png`),
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
    opacity: 0.8
  }),
};