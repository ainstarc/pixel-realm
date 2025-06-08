import { keys, keyPressed } from "../../player/input.js";
import { gameState } from "../../core/gameState.js";

export function createActionButtons() {
  const actionDiv = document.createElement("div");
  actionDiv.style.display = "flex";
  actionDiv.style.flexDirection = "column";
  actionDiv.style.gap = "10px";

  const mainActions = document.createElement("div");
  mainActions.style.display = "flex";
  mainActions.style.gap = "10px";

  mainActions.appendChild(createKeyButton("Jump", " ", "80px", "80px"));
  mainActions.appendChild(createKeyButton("Place", "e", "80px", "80px"));
  actionDiv.appendChild(mainActions);

  const tileSelectionDiv = document.createElement("div");
  tileSelectionDiv.style.display = "flex";
  tileSelectionDiv.style.justifyContent = "center";
  tileSelectionDiv.style.marginTop = "10px";

  ["grass", "dirt", "sand", "water"].forEach((tile) => {
    tileSelectionDiv.appendChild(createTileButton(tile));
  });

  actionDiv.appendChild(tileSelectionDiv);

  return actionDiv;
}

function createKeyButton(text, key, width, height) {
  const btn = document.createElement("button");
  btn.textContent = text;
  Object.assign(btn.style, {
    width,
    height,
    backgroundColor: "rgba(255,255,255,0.3)",
    border: "none",
    borderRadius: "10px",
    fontSize: "24px",
    color: "white",
    userSelect: "none",
  });

  btn.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      keys[key] = true;
      keyPressed[key] = true;
    },
    { passive: false }
  );

  btn.addEventListener(
    "touchend",
    (e) => {
      e.preventDefault();
      keys[key] = false;
    },
    { passive: false }
  );

  return btn;
}

function createTileButton(tileType) {
  const btn = document.createElement("button");
  btn.textContent = tileType.charAt(0).toUpperCase() + tileType.slice(1);
  Object.assign(btn.style, {
    width: "50px",
    height: "50px",
    backgroundColor: "rgba(255,255,255,0.3)",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    color: "white",
    userSelect: "none",
    margin: "0 5px",
  });

  btn.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      gameState.selectedTileType = tileType;
    },
    { passive: false }
  );

  return btn;
}
