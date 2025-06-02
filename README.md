# Pixel Realm

A simple voxel-style world builder using Three.js.

## Features

- 3D voxel-style world with grass and mud tiles
- Player movement with WASD keys or arrow keys
- Toggle tiles between grass and mud with the E key
- Jump with spacebar, crouch with shift or control
- Highlighted tile indicator shows which tile you're standing on
- Persistent world state using localStorage (your changes are saved!)
- Mobile touch controls for playing on phones and tablets
- Reset world option to start fresh

## Controls

### Desktop
- **WASD** or **Arrow Keys**: Move player
- **E**: Toggle tile type (grass/mud)
- **Spacebar**: Jump
- **Shift/Control**: Crouch
- **Reset World** button: Clear all changes and regenerate the world

### Mobile
- **Directional Pad**: Move player
- **Jump** button: Jump up
- **Toggle** button: Change tile type

## Getting Started

1. Clone this repository
2. Open index.html in your browser
3. Start building your world!

## Technical Details

- Built with Three.js for 3D rendering
- Uses localStorage for persistent world data
- Responsive design works on both desktop and mobile devices
- No build process required - pure JavaScript

## Changelog

### v0.3.0
- Added mobile touch controls
- Added player position saving
- Expanded storage capabilities
- Added README and documentation

### v0.2.0
- Added persistent storage using localStorage
- Added tile highlighting with border
- Fixed key press detection for tile toggling
- Added reset world functionality

### v0.1.0
- Initial release
- Basic world generation
- Player movement
- Tile toggling