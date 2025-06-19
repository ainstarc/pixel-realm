// Saves and loads map data to/from localStorage
export function saveMapData(mapData) {
  try {
    localStorage.setItem("pixel-realm-map", JSON.stringify(mapData));
  } catch (e) {
    console.error("Failed to save map data:", e);
  }
}

export function loadMapData() {
  try {
    const savedData = localStorage.getItem("pixel-realm-map");
    return savedData ? JSON.parse(savedData) : null;
  } catch (e) {
    console.error("Failed to load map data:", e);
    return null;
  }
}
