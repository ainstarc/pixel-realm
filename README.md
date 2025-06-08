# Pixel Realm

A 3D voxel-based world building game built with [Three.js](https://threejs.org/), designed for both desktop and mobile play. Build, explore, and interact with a dynamic tile-based environment in real time.

---

## 🧩 Features

- 3D voxel-based sandbox environment
- Multiple tile types: **grass**, **dirt**, **sand**, **water**
- Smooth **player movement** with mouse and keyboard support
- Real-time **tile placement and destruction**
- **Persistent world** and player state using local storage
- **Mobile-friendly controls**: joystick or WASD buttons
- Responsive **UI with adaptive layout** across devices
- Customizable **settings menu** with game controls and metadata
- Onboarding with **smart instructions overlay** for new players

---

## 🎮 Controls

### 🖥️ Desktop

| Action             | Input                                   |
| ------------------ | --------------------------------------- |
| Move               | `W`, `A`, `S`, `D`                      |
| Jump               | `Space`                                 |
| Look around        | Move mouse (click to lock)              |
| Place tile         | `E` or Left-click                       |
| Select tile        | `1`–`4`                                 |
| Unlock mouse       | `Escape`                                |
| Show cursor (hold) | `Alt`                                   |
| Alternative move   | Arrow keys                              |
| A/D behavior       | Strafe with mouse locked, rotate if not |

### 📱 Mobile

| Action       | Input                      |
| ------------ | -------------------------- |
| Move/Rotate  | Joystick or WASD buttons   |
| Jump         | Tap jump button            |
| Place tile   | Tap place button           |
| Select tile  | Tap tile icon              |
| Dismiss help | Auto-dismiss or tap screen |

---

## ⚙️ Settings Menu

Accessible via the gear icon (⚙️) in the top-right corner:

- **Game Options**
  - Reset all game data
  - Toggle control scheme (joystick ↔ WASD) on mobile
- **Help**
  - View control guide
  - Report issues
- **About**
  - Display version info

---

## 🚧 Development

To get started locally:

```bash
git clone https://github.com/your-username/pixel-realm.git
cd pixel-realm
npm install
npm run dev
```

Then open your browser at [`http://localhost:5173`](http://localhost:5173)

---

## 🚀 Deployment

To generate a production build:

```bash
npm run build
```

Build files will be output to the `dist/` folder.

---

## 📁 Project Structure Overview

```
src/
├─ core/              # Game state, assets, and storage logic
├─ manager/           # Central managers coordinating systems
├─ player/            # Player logic, controls, input, and camera
├─ ui/                # HUD, settings menu, and mobile controls
├─ world/             # World generation, tiles, and helpers
├─ setup/             # Scene and game initialization
├─ loop/              # Game loop (animation)
├─ game.js            # Entry point for game logic
└─ index.js           # App initialization
```

---

## 📄 License

[MIT](LICENSE)
