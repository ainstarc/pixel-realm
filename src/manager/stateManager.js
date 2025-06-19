// Combines map, material, and tile state into a single state manager
import { mapState } from "../core/state/mapState.js";
import { materialState } from "../core/state/materialState.js";
import { tileState } from "../core/state/tileState.js";

// Centralized state manager for the game
export const stateManager = {
  ...mapState,
  ...materialState,
  ...tileState,
};
