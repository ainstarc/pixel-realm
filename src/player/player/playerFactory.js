import * as THREE from "three";
import { storage } from "../../core/storage.js";

let highlightBorder = null;
let previewTile = null;

export function createPlayer(scene) {
  const size = 0.5;
  const geo = new THREE.BoxGeometry(size, size, size);
  const mat = new THREE.MeshStandardMaterial({ color: 0xff4444 });
  const player = new THREE.Mesh(geo, mat);

  const savedPosition = storage.loadPlayerPosition();
  player.position.set(
    savedPosition?.x ?? 0,
    savedPosition?.y ?? 0.5,
    savedPosition?.z ?? 0
  );

  scene.add(player);

  // Highlight border
  const borderGeo = new THREE.EdgesGeometry(
    new THREE.BoxGeometry(1.05, 0.55, 1.05)
  );
  const borderMat = new THREE.LineBasicMaterial({ color: 0xffff00 });
  highlightBorder = new THREE.LineSegments(borderGeo, borderMat);
  highlightBorder.visible = false;
  scene.add(highlightBorder);

  // Preview tile
  const tileGeo = new THREE.BoxGeometry(1, 0.5, 1);
  const previewMat = new THREE.MeshStandardMaterial({
    transparent: true,
    opacity: 0.5,
    color: 0xffffff,
  });
  previewTile = new THREE.Mesh(tileGeo, previewMat);
  previewTile.visible = false;
  scene.add(previewTile);

  storage.savePlayerPosition(player.position);

  return player;
}

export function getHighlightBorder() {
  return highlightBorder;
}

export function getPreviewTile() {
  return previewTile;
}
