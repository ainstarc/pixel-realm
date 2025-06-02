import * as THREE from "three";

const loader = new THREE.TextureLoader();

export const textures = {
  grass: loader.load("src/assets/textures/grass.png"),
  dirt: loader.load("src/assets/textures/dirt.png"),
  sand: loader.load("src/assets/textures/sand.jpg"),
  water: loader.load("src/assets/textures/water.png"),
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
