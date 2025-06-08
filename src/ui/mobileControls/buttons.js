import { keys } from "../../player/input.js";

export function createButtonControls() {
  const buttonsDiv = document.createElement("div");
  Object.assign(buttonsDiv.style, {
    display: "grid",
    gridTemplateColumns: "repeat(3, 60px)",
    gridTemplateRows: "repeat(3, 60px)",
    gap: "5px",
  });

  const createButton = (text, key, gridArea) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.style = `grid-area: ${gridArea}; width: 100%; height: 100%; background: rgba(255,255,255,0.3); border: none; border-radius: 10px; font-size: 24px; color: white; user-select: none;`;

    btn.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        keys[key] = true;
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
  };

  buttonsDiv.appendChild(createButton("↑", "w", "1 / 2 / 2 / 3"));
  buttonsDiv.appendChild(createButton("←", "a", "2 / 1 / 3 / 2"));
  buttonsDiv.appendChild(createButton("↓", "s", "2 / 2 / 3 / 3"));
  buttonsDiv.appendChild(createButton("→", "d", "2 / 3 / 3 / 4"));

  return buttonsDiv;
}
