export function getPlayerTileIndex(playerPos, mapSize) {
  const half = mapSize / 2;
  const x = Math.floor(playerPos.x + half);
  const y = 0;
  const z = Math.floor(playerPos.z + half);
  return {
    x: Math.max(0, Math.min(mapSize - 1, x)),
    y,
    z: Math.max(0, Math.min(mapSize - 1, z)),
  };
}

export function getFrontTileIndex(playerPos, rotation, mapSize) {
  const half = mapSize / 2;
  const frontX = playerPos.x - Math.sin(rotation);
  const frontZ = playerPos.z - Math.cos(rotation);
  const x = Math.floor(frontX + half);
  const y = 0;
  const z = Math.floor(frontZ + half);
  return {
    x: Math.max(0, Math.min(mapSize - 1, x)),
    y,
    z: Math.max(0, Math.min(mapSize - 1, z)),
  };
}
