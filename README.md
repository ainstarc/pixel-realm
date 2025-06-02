# Pixel Realm

A simple voxel-style world builder using Three.js.

## Features

- 3D voxel-style world with multiple tile types (grass, dirt, sand, water)
- Player movement with WASD keys or arrow keys
- Place different tile types with the E key
- Tile selection system (press 1-4 to select different tiles)
- Tile placement preview shows what will be placed before you commit
- Jump with spacebar, crouch with shift or control
- Highlighted tile indicator shows which tile you're standing on
- Full persistence system:
  - World state saves automatically as you build
  - Player position is remembered between sessions
  - All tile types (grass, dirt, sand, water) are properly saved
- Mobile touch controls for playing on phones and tablets
- Reset world option to start fresh

## Controls

### Desktop
- **WASD** or **Arrow Keys**: Move player
- **1-4**: Select tile type (grass, dirt, sand, water)
- **E**: Place selected tile
- **Spacebar**: Jump
- **Shift/Control**: Crouch
- **Reset World** button: Clear all changes and regenerate the world

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

## Getting Started

1. Clone this repository
2. Open index.html in your browser
3. Start building your world!

## Live Demo

Check out the live demo at: https://ainstarc.github.io/pixel-realm/

## Technical Details

- Built with Three.js for 3D rendering
- Uses localStorage for persistent world data
- Responsive design works on both desktop and mobile devices
- No build process required - pure JavaScript
- Deployed using GitHub Pages

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

## License

MIT License - See LICENSE file for details