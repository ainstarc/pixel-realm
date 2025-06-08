import packageJson from "../../../package.json";
import { createSectionHeader, createInfoText } from "./domElements.js";

export function appendVersionInfo(container) {
  container.appendChild(createSectionHeader("About"));
  const version = packageJson.version || "0.12.6";
  container.appendChild(createInfoText(`Version: ${version}`));
  container.appendChild(createInfoText("© 2025 Pixel Realm"));
}