# Changelog

All notable changes to Pixel Realm will be documented in this file.

## [0.9.0]

### Added
- Converted world map to 3D voxel grid structure
- Added support for vertical layers (height) in the world
- Updated world generation to create underground layers
- Modified tile rendering to support the 3D structure
- Updated player interaction to work with 3D coordinates

## [0.8.0]

### Changed
- Reorganized codebase into a modular directory structure
  - Created core/ directory for central game functionality
  - Created player/ directory for player-related code
  - Created ui/ directory for interface components
  - Created world/ directory for world generation
- Updated import paths throughout the codebase
- Added index.js to maintain backward compatibility
- Improved code organization and maintainability

## [0.7.5]

### Fixed
- Fixed player position not being saved between sessions
- Added immediate position save on player creation
- Added debug logging for position saving/loading
- Ensured player position persistence works correctly

## [0.7.4]

### Changed
- Reduced gravity to make jump falls less abrupt
- Fine-tuned jump physics for a more natural feel

## [0.7.3]

### Fixed
- Fixed Place button not working on mobile devices
- Improved jumping mechanics with proper physics-based system
- Added jump velocity and gravity for more natural movement
- Enhanced mobile controls with better action button handling

## [0.7.2]

### Fixed
- Fixed 404 errors when loading textures on GitHub Pages
- Updated texture paths to use public folder structure
- Simplified asset loading for better compatibility with Vite builds

## [0.7.1]

### Fixed
- Fixed black screen issue when deploying to GitHub Pages
- Added proper base path configuration in Vite
- Updated asset loading to use correct paths in deployment
- Added error handling for texture loading
- Improved debugging information for deployment issues

## [0.7.0]

### Added
- Settings menu with gear icon in top-right corner
- Reset World option in settings menu
- Report Issue button that links to GitHub issues
- Placeholder button for future features
- Improved UI organization

### Changed
- Moved reset functionality from bottom button to settings menu
- Enhanced UI styling for better visibility

## [0.6.3]

### Fixed
- Fixed "non-passive event listener" warning in mobile controls
- Added explicit { passive: false } option to touch event listeners
- Prevented page scrolling when using mobile controls

## [0.6.2]

### Added
- Comprehensive documentation for all core modules
- Expanded README with detailed persistence information
- JSDoc comments for better code readability

### Fixed
- Clarified player position saving mechanism
- Improved error handling in storage operations

## [0.6.1]

### Fixed
- Fixed persistence for all tile types (grass, dirt, sand, water)
- Added proper tile type mapping system
- Ensured consistent material application on reload

## [0.6.0]

### Added
- GitHub Actions workflow for automatic deployment
- Live demo on GitHub Pages
- Updated README with comprehensive documentation
- Development and build instructions

## [0.5.0]

### Added
- Tile placement preview system
- Semi-transparent preview of selected tile under player
- Real-time preview updates as player moves
- Preview uses actual tile material with transparency

## [0.4.0]

### Added
- HUD display showing currently selected tile type
- Multiple tile type selection (press 1-4 to select different tiles)
- Support for additional tile types (grass, dirt, sand, water)
- Mobile tile selection buttons

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