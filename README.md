# Pixel Realm

A 3D voxel-based world building game built with Three.js.

## Features

- 3D voxel-based world
- Different tile types (grass, dirt, sand, water)
- Player movement and camera controls
- Tile placement and editing
- Persistent world and player position
- Progressive Web App (PWA) support for offline play
- Mobile-friendly controls
- Enhanced settings menu with game information

## Controls

- **WASD**: Move and rotate
  - Tap for rotation, hold for strafing
- **Space**: Jump
- **E**: Place selected tile
- **1-4**: Select tile type (grass, dirt, sand, water)
- **Arrow Keys**: Alternative movement

## Settings

Access the settings menu by clicking the gear icon (⚙️) in the top-right corner:

- **Game Options**: Reset world data
- **Help**: View controls and report issues
- **About**: Version information

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser at `http://localhost:5173`

## Deployment

The game is automatically deployed to GitHub Pages when changes are pushed to the main branch.

You can also manually deploy:

```
npm run build
npm run deploy
```

The built files will be in the `dist` directory.

## PWA Support

Pixel Realm works offline as a Progressive Web App. You can install it on your device from the browser.

## License

MIT