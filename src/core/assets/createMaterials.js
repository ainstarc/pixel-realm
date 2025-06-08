import * as THREE from "three";

export const createMaterials = (textures) => ({
  grass: new THREE.MeshLambertMaterial({ map: textures.grass }),
  dirt: new THREE.MeshLambertMaterial({ map: textures.dirt }),
  sand: new THREE.MeshLambertMaterial({ map: textures.sand }),
  water: new THREE.MeshLambertMaterial({
    map: textures.water,
    transparent: true,
    opacity: 0.8,
  }),
});
