export function savePlayerPosition(position) {
  try {
    localStorage.setItem(
      "pixel-realm-player",
      JSON.stringify({
        x: position.x,
        y: position.y,
        z: position.z,
      })
    );
  } catch (e) {
    console.error("Failed to save player position:", e);
  }
}

export function loadPlayerPosition() {
  try {
    const savedPos = localStorage.getItem("pixel-realm-player");
    return savedPos ? JSON.parse(savedPos) : null;
  } catch (e) {
    console.error("Failed to load player position:", e);
    return null;
  }
}
