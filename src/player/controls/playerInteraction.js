import { stateManager } from "../../manager/stateManager.js";
import { getFrontTileIndex } from "../player/playerUtils.js";
import { keyPressed } from "../../manager/inputManager.js";
import {
  getPreviewTile,
  getHighlightBorder,
} from "../factory/playerFactory.js";
import { TILE_TYPES } from "../../world/tiles/tiles.js";
import { saveMapData } from "../data/playerPersistence.js";

export function handleTileInteraction(player, rotation) {
  if (!stateManager.mapData || !stateManager.tiles || !stateManager.materials)
    return;

  const { x, y, z } = getFrontTileIndex(player.position, rotation, 32);
  const currentTile = stateManager.tiles?.[x]?.[y]?.[z];

  if (!currentTile) return;

  const highlightBorder = getHighlightBorder();
  const previewTile = getPreviewTile();

  highlightBorder.position.copy(currentTile.position);
  highlightBorder.visible = true;

  previewTile.position.copy(currentTile.position);
  previewTile.position.y += 0.01;
  previewTile.visible = true;

  if (previewTile.userData.lastType !== stateManager.selectedTileType) {
    const selectedMat = stateManager.materials[stateManager.selectedTileType];
    const previewMat = selectedMat.clone();
    previewMat.transparent = true;
    previewMat.opacity = 0.5;
    previewMat.depthWrite = false;
    previewTile.material = previewMat;
    previewTile.userData.lastType = stateManager.selectedTileType;
  }

  if (keyPressed["e"]) {
    const newType = TILE_TYPES[stateManager.selectedTileType];
    stateManager.mapData[x][y][z] = newType;
    currentTile.material =
      stateManager.materials[stateManager.selectedTileType];
    saveMapData();
  }
}
