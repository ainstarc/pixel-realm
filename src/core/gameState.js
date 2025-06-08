import { mapState } from './state/mapState.js';
import { materialState } from './state/materialState.js';
import { tileState } from './state/tileState.js';

export const gameState = {
  ...mapState,
  ...materialState,
  ...tileState
};
