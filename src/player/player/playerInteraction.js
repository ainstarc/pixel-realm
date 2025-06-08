import { gameState } from "../../core/gameState.js";
import { getFrontTileIndex } from "./playerUtils.js";
import { keyPressed } from "../input.js";
import { getPreviewTile, getHighlightBorder } from "./playerFactory.js";
import { TILE_TYPES } from "./playerConstants.js";
import { saveMapData } from "./playerPersistence.js";

export function handleTileInteraction(player, rotation) {
  if (!gameState.mapData || !gameState.tiles || !gameState.materials) return;

  const { x, y, z } = getFrontTileIndex(player.position, rotation, 32);
  const currentTile = gameState.tiles?.[x]?.[y]?.[z];

  if (!currentTile) return;

  const highlightBorder = getHighlightBorder();
  const previewTile = getPreviewTile();

  highlightBorder.position.copy(currentTile.position);
  highlightBorder.visible = true;

  previewTile.position.copy(currentTile.position);
  previewTile.position.y += 0.01;
  previewTile.visible = true;

  if (previewTile.userData.lastType !== gameState.selectedTileType) {
    const selectedMat = gameState.materials[gameState.selectedTileType];
    const previewMat = selectedMat.clone();
    previewMat.transparent = true;
    previewMat.opacity = 0.5;
    previewMat.depthWrite = false;
    previewTile.material = previewMat;
    previewTile.userData.lastType = gameState.selectedTileType;
  }

  if (keyPressed["e"]) {
    const newType = TILE_TYPES[gameState.selectedTileType];
    gameState.mapData[x][y][z] = newType;
    currentTile.material = gameState.materials[gameState.selectedTileType];
    saveMapData();
  }
}
