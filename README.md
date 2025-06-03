# Pixel Realm

A 3D voxel-based world building game built with Three.js.

## Features

- 3D voxel-based world
- Different tile types (grass, dirt, sand, water)
- Player movement and camera controls with mouse support
- Tile placement and editing
- Persistent world and player position
- Mobile-friendly controls with joystick option
- Enhanced settings menu with game information
- Adaptive UI for both desktop and mobile devices
- Smart instructions overlay with automatic dismissal on mobile

## Controls

### Desktop
- **Mouse**: Look around (click to enable pointer lock)
- **Left-click**: Place selected tile (same as E key)
- **WASD**: Move (forward, left, backward, right)
  - With mouse look: A/D always strafe
  - Without mouse: Tap A/D for rotation, hold for strafing
- **Space**: Jump
- **E**: Place selected tile
- **1-4**: Select tile type (grass, dirt, sand, water)
- **Alt**: Hold to temporarily show cursor
- **Escape**: Exit pointer lock mode
- **Arrow Keys**: Alternative movement

### Mobile
- **Joystick or WASD buttons**: Move and rotate (toggle in settings)
- **Jump Button**: Jump
- **Place Button**: Place selected tile
- **Tile Buttons**: Select tile type (grass, dirt, sand, water)
- **Instructions**: Auto-dismisses after 3 seconds or on first touch

## Settings

Access the settings menu by clicking the gear icon (⚙️) in the top-right corner:

- **Game Options**: 
  - Reset world data
  - Toggle between joystick and WASD buttons (mobile only)
- **Help**: View controls and report issues
- **About**: Version information

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser at `http://localhost:5173`

## Deployment

The game can be built for deployment:

```
npm run build
```

The built files will be in the `dist` directory.

## License

MIT