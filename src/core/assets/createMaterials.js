// Creates materials for each tile type using loaded textures
import * as THREE from "three";

// Returns an object with materials for each tile type
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
