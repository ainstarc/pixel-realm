# Pixel Realm

A simple voxel-style world builder using Three.js.

## Features

- 3D voxel-style world with multiple tile types (grass, dirt, sand, water)
- True 3D voxel grid with support for vertical layers
- Underground terrain with different block types at different depths
- Player movement with WASD keys or arrow keys
- Place different tile types with the E key
- Tile selection system (press 1-4 to select different tiles)
- Physics-based jumping with realistic gravity
- Tile placement preview shows what will be placed before you commit
- Highlighted tile indicator shows which tile you're standing on
- Full persistence system:
  - 3D world state saves automatically as you build
  - Player position is remembered between sessions
  - All tile types (grass, dirt, sand, water) are properly saved
- Mobile touch controls for playing on phones and tablets
- Settings menu with world reset and issue reporting
- Reset world option to start fresh

## Controls

### Desktop

- **WASD** or **Arrow Keys**: Move player
- **1-4**: Select tile type (grass, dirt, sand, water)
- **E**: Place selected tile
- **Spacebar**: Jump
- **Shift/Control**: Crouch
- **⚙️ (Settings)**: Access settings menu

### Mobile

- **Directional Pad**: Move player
- **Tile Buttons**: Select tile type
- **Place** button: Place selected tile
- **Jump** button: Jump up

## Persistence

The game automatically saves your progress using localStorage:

- **World Map**: Saved whenever you place or modify tiles
- **Player Position**: Saved periodically as you move around
- **Settings**: Saved when changed

Your world and position will be exactly as you left them when you return to the game.

## Live Demo

Check out the live demo at: https://ainstarc.github.io/pixel-realm/

## Technical Details

- Built with Three.js for 3D rendering
- Physics-based movement system
- Uses localStorage for persistent world data
- Responsive design works on both desktop and mobile devices
- Deployed using GitHub Pages and Vite

## Development

To run locally:

```
npm install
npm run dev
```

To build for production:

```
npm run build
```

## Deployment

When deploying to GitHub Pages:

1. Ensure `vite.config.js` has the correct base path matching your repository name:

   ```javascript
   export default defineConfig({
     base: "/pixel-realm/", // Must match your repository name
     build: {
       outDir: "dist",
     },
   });
   ```

2. Place texture files in the public folder:

   ```
   public/
     └── textures/
         ├── grass.png
         ├── dirt.png
         ├── sand.png
         └── water.png
   ```

3. Reference textures with simple paths in assets.js:

   ```javascript
   export const textures = {
     grass: loader.load("textures/grass.png"),
     dirt: loader.load("textures/dirt.png"),
     // ...
   };
   ```

4. The GitHub Actions workflow will automatically deploy to GitHub Pages when you push to the main branch

5. If you encounter a black screen after deployment:
   - Check browser console for 404 errors on textures
   - Verify that texture files are in the correct public folder
   - Clear browser cache or try in incognito mode

## License

MIT License - See LICENSE file for details

## File Structure

```
pixel-realm/
├─ public/                    # Static assets for deployment
│  └─ textures/               # Game textures (accessible at runtime)
│     ├─ dirt.png
│     ├─ grass.png
│     ├─ sand.png
│     └─ water.png
├─ src/                       # Source code
│  ├─ core/                   # Core game functionality
│  │  ├─ assets.js            # Texture and material loading
│  │  ├─ gameState.js         # Central game state management
│  │  └─ storage.js           # Local storage persistence
│  ├─ player/                 # Player-related functionality
│  │  ├─ input.js             # Keyboard and input handling
│  │  └─ player.js            # Player movement and interaction
│  ├─ ui/                     # User interface components
│  │  ├─ hud.js               # Heads-up display
│  │  ├─ mobileControls.js    # Touch controls for mobile
│  │  └─ settingsMenu.js      # Settings and options menu
│  ├─ world/                  # World generation and management
│  │  └─ world.js             # Map generation and tile handling
│  ├─ index.js                # Entry point with module re-exports
│  ├─ main.js                 # Main application setup
│  └─ style.css               # Global styles
├─ index.html                 # HTML entry point
├─ package.json               # Project dependencies
├─ vite.config.js             # Build configuration
├─ CHANGELOG.md               # Version history
└─ README.md                  # Project documentation
```