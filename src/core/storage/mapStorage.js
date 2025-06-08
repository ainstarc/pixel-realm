export const mapStorage = {
  save(mapData) {
    try {
      localStorage.setItem("pixel-realm-map", JSON.stringify(mapData));
    } catch (e) {
      console.error("Failed to save map data:", e);
    }
  },
  load() {
    try {
      const savedData = localStorage.getItem("pixel-realm-map");
      return savedData ? JSON.parse(savedData) : null;
    } catch (e) {
      console.error("Failed to load map data:", e);
      return null;
    }
  },
};
