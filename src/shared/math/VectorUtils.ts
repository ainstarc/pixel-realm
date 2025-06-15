import * as THREE from 'three';

export class VectorUtils {
  public static toChunkPosition(pos: THREE.Vector3, chunkSize: number): { x: number, y: number, z: number } {
    return {
      x: Math.floor(pos.x / chunkSize),
      y: Math.floor(pos.y / chunkSize),
      z: Math.floor(pos.z / chunkSize)
    };
  }

  public static cloneVector3(vec: THREE.Vector3): THREE.Vector3 {
    return new THREE.Vector3(vec.x, vec.y, vec.z);
  }
}
