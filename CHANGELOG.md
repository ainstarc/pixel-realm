# Changelog

All notable changes to **Pixel Realm** will be documented here.

---

## [0.13.0] - Camera Drag Look

### Added

- Added mouse and touch drag look support for camera rotation; fixed touchmove event for smoother mobile experience.

## [0.12.7] – Modularity Phase 2

### Internal Restructure

- 🔁 `/player` refactored into submodules: `input`, `controls`, `factory`, `camera`, `player`
- 🧭 `/manager` layer created for all coordination logic
- 🎮 `/loop`, `/setup/init`, `/ui` modularized cleanly by responsibility
- 📦 `game.js` now serves as orchestrator
- Improved separation of concerns and future scalability

---

## [0.12.6] – Mobile Instructions UX

### Added

- Auto-dismiss overlay on mobile after 3 seconds or first touch
- Persistent dismissal via `localStorage`

---

## [0.12.5] – Pointer Lock and UI Focus

### Added

- Prevent pointer lock when hovering UI elements
- Cursor remains visible on UI
- All UI marked with `.ui` class for detection

---

## [0.12.4] – Temporary Cursor with Alt

### Added

- Hold `Alt` to exit pointer lock temporarily
- Auto re-lock on Alt release
- `Escape` still exits pointer lock fully

---

## [0.12.3] – Mobile Joystick Toggle

### Added

- Joystick/WASD toggle in settings (mobile)
- Control preference saved with `localStorage`
- Context-sensitive controls in Help modal

---

## [0.12.2–0.12.1] – Intuitive Mouse Controls

### Added

- Left-click now places tile (same as `E`)
- Highlight tracks the tile in front of the player

---

## [0.12.0] – Mouse Look + Modularity Phase 1

### Added

- Pointer Lock API for immersive mouse control
- Mouse camera rotation and smart strafe logic
- Instructions overlay for desktop users
- Modularization:
  - 🧱 `/core/state` for state separation
  - 🧱 `/core/storage` refactor for localStorage logic

### Removed

- PWA and service worker logic for simplicity

---

## [0.11.0 → 0.10.0] – Core Gameplay Foundation

### Added

- Voxel map, player movement, tile placement/editing
- LocalStorage-based persistence for player/world state
- Settings modal with controls/help/version
- GitHub Pages asset path fixes
- Responsive viewport improvements

### Fixed

- Position persistence bugs
- Debug logs for save/load reliability

---

## [0.9.0 → 0.6.0] – Engine & UX Refinements (Grouped)

### Highlights

- 3D world layering with height support
- HUD added with tile selection (1–4)
- Jump physics refined (velocity, gravity)
- Joystick/touch controls for mobile
- Settings menu + reset & report options
- GitHub Pages deployment, Actions CI/CD
- Persistent tile types and preview rendering
- Comprehensive documentation via README and JSDoc
- Improved UI structure and event handling

---

## [0.5.0 → 0.1.0] – Early Milestones

### Added

- Basic Three.js world, movement, tile toggling
- Gravity, boundaries, highlight system
- Initial mobile touch support and controls
- storageManager using `localStorage`
