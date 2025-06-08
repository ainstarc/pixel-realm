import { setIsHoveringUI } from "./inputState.js";

export function setupUIListeners() {
  document.addEventListener("mouseover", (e) => {
    const isHovering = e.target.closest(".ui") !== null;
    setIsHoveringUI(isHovering);
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest(".ui")) {
      e.stopPropagation();
      setIsHoveringUI(true);
    }
  });
}
