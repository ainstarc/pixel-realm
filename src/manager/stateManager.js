import { mapState } from '../core/state/mapState.js';
import { materialState } from '../core/state/materialState.js';
import { tileState } from '../core/state/tileState.js';

export const stateManager = {
  ...mapState,
  ...materialState,
  ...tileState
};
