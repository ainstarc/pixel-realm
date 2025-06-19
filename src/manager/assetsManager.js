// Loads textures and creates materials for different tile types
import { loadTextures } from "../core/assets/loadTextures.js";
import { createMaterials } from "../core/assets/createMaterials.js";

// Load textures from files
export const textures = loadTextures();
// Create materials using the loaded textures
export const materials = createMaterials(textures);
