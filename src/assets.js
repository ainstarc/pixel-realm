import * as THREE from "three";

const loader = new THREE.TextureLoader();

export const textures = {
  grass: loader.load("src/assets/textures/grass.png"),
  dirt: loader.load("src/assets/textures/dirt.png"),
  mud: loader.load("src/assets/textures/mud.png"),
};

// Keep them pixelated
Object.values(textures).forEach((tex) => {
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
});

export const materials = {
  grass: new THREE.MeshLambertMaterial({ map: textures.grass }),
  mud: new THREE.MeshLambertMaterial({ map: textures.mud }),
};
