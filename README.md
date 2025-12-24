# Plugin Template

Base template to build your own Allow2Automate plugins quickly and easily.

## Description

This is the official template for creating custom Allow2Automate plugins. It provides a complete development environment with build tools, example code, and best practices to help you create professional plugins that integrate with the Allow2 parental control ecosystem.

## Features

- Complete plugin development scaffold
- Pre-configured build system with Rollup
- React component examples
- Material-UI integration
- Babel transpilation for modern JavaScript
- Example actions and triggers
- Development server with hot reload
- Production-ready build configuration
- Comprehensive documentation structure

## Installation

### Via NPM

```bash
npm install @allow2/allow2automate-plugin
```

### Via Git

```bash
git clone https://github.com/Allow2/allow2automate-plugin.git
cd allow2automate-plugin
npm install
npm run build
```

## Getting Started

### Creating Your Plugin

1. Clone this template repository
2. Update `package.json` with your plugin details
3. Modify the `allow2automate` section with your plugin metadata
4. Implement your plugin logic in `src/index.js`
5. Create UI components in `src/components/`
6. Build and test your plugin

### Project Structure

```
allow2automate-plugin/
├── src/
│   ├── index.js          # Main plugin entry point
│   ├── components/       # React components
│   └── utils/           # Utility functions
├── dist/                # Built plugin files
├── examples/            # Example usage
├── package.json         # Plugin metadata
└── rollup.config.js     # Build configuration
```

## Configuration

### Plugin Metadata

Update the `allow2automate` section in `package.json`:

```json
{
  "allow2automate": {
    "plugin": true,
    "pluginId": "your-plugin-id",
    "displayName": "Your Plugin Name",
    "category": "Your Category",
    "permissions": ["permission1", "permission2"],
    "minAppVersion": "2.0.0",
    "api": {
      "actions": [...],
      "triggers": [...]
    }
  }
}
```

### Required Permissions

This template includes:

- **configuration**: To read and modify plugin settings

Customize permissions based on your plugin's needs:
- **network**: For external API calls
- **filesystem**: For file operations
- **system**: For system-level operations

## Usage

### Implementing Actions

```javascript
export const actions = {
  myAction: async (params) => {
    // Your action logic here
    return { success: true };
  }
};
```

### Implementing Triggers

```javascript
export const triggers = {
  myTrigger: {
    subscribe: (callback) => {
      // Set up event listener
      // Call callback(data) when event occurs
    },
    unsubscribe: () => {
      // Clean up event listener
    }
  }
};
```

### Creating UI Components

```javascript
import React from 'react';
import { Button } from '@material-ui/core';

export const ConfigPanel = () => {
  return (
    <div>
      <h2>Plugin Configuration</h2>
      <Button variant="contained" color="primary">
        Configure
      </Button>
    </div>
  );
};
```

## API Documentation

### Default Actions

#### `configure`
- **Name**: Configure Plugin
- **Description**: Configure plugin settings
- **Parameters**:
  - `settings` (object): Plugin configuration object

### Default Triggers

#### `stateChanged`
- **Name**: State Changed
- **Description**: Triggered when plugin state changes
- **Payload**:
  - `state` (object): New plugin state
  - `previousState` (object): Previous plugin state

## Development Setup

```bash
# Clone the template
git clone https://github.com/Allow2/allow2automate-plugin.git your-plugin-name
cd your-plugin-name

# Install dependencies
npm install

# Start development server with hot reload
npm start

# Build for production
npm run build

# Run tests
npm test

# Deploy example
npm run deploy
```

## Building Your Plugin

The template includes a complete build pipeline:

1. **Development**: `npm start` - Watch mode with hot reload
2. **Production**: `npm run build` - Optimized build
3. **Testing**: `npm test` - Run test suite

### Build Output

The build process generates:
- `dist/index.js` - CommonJS module
- `dist/index.es.js` - ES6 module

## Publishing Your Plugin

1. Update version in `package.json`
2. Build the plugin: `npm run build`
3. Publish to npm: `npm publish`
4. Submit to Allow2 plugin directory

## Best Practices

- Follow the existing code structure
- Write comprehensive tests
- Document all actions and triggers
- Use meaningful error messages
- Implement proper error handling
- Keep dependencies minimal
- Follow semantic versioning

## Requirements

- Node.js 12.0 or higher
- Allow2Automate 2.0.0 or higher
- React 16.12.0 or higher
- Material-UI 4.11.3 or higher

## License

MIT - See [LICENSE](LICENSE) file for details

## Support

- **Issues**: [GitHub Issues](https://github.com/Allow2/allow2automate-plugin/issues)
- **Documentation**: [Allow2 Documentation](https://www.allow2.com/docs)
- **Plugin Development Guide**: [Allow2 Plugin Guide](https://www.allow2.com/docs/plugins)
- **Community**: [Allow2 Community Forums](https://community.allow2.com)

## Contributing

Contributions to improve this template are welcome! Please submit pull requests with improvements.

## Author

Allow2

## Keywords

allow2automate, allow2, template, plugin, starter, development
