# Changelog

All notable changes to Pixel Realm will be documented in this file.

## [0.4.0]

### Added
- HUD display showing currently selected tile type
- Multiple tile type selection (press 1-4 to select different tiles)
- Support for additional tile types (grass, dirt, sand, water)

### Changed
- Improved tile placement to use selected tile type
- Renamed all "mud" references to "dirt" for consistency

## [0.3.0]

### Added
- Mobile touch controls for movement and actions
- Expanded localStorage functionality
  - Save player position
  - Save game settings
- Comprehensive README with documentation
- Dedicated changelog file

### Changed
- Improved UI controls positioning
- Better touch detection for mobile devices

## [0.2.0]

### Added
- Persistent storage using localStorage
- Tile highlighting with yellow border
- Reset world functionality

### Fixed
- Key press detection for tile toggling
- Error when accessing undefined map data
- Tile material reference issues

## [0.1.0]

### Added
- Initial release
- Basic 3D world generation with Three.js
- Player movement with WASD and arrow keys
- Tile toggling between grass and mud
- Basic physics (gravity, jumping, boundaries)