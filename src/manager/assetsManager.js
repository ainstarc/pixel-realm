import { loadTextures } from "../core/assets/loadTextures.js";
import { createMaterials } from "../core/assets/createMaterials.js";

export const textures = loadTextures();
export const materials = createMaterials(textures);
