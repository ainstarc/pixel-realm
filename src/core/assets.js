import { loadTextures } from "./assets/loadTextures.js";
import { createMaterials } from "./assets/createMaterials.js";

export const textures = loadTextures();
export const materials = createMaterials(textures);
