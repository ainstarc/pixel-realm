import * as THREE from "three";

const loader = new THREE.TextureLoader();

export const loadTextures = () => {
  const textures = {
    grass: loader.load("textures/grass.png"),
    dirt: loader.load("textures/dirt.png"),
    sand: loader.load("textures/sand.png"),
    water: loader.load("textures/water.png"),
  };

  Object.values(textures).forEach((tex) => {
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
  });

  return textures;
};
