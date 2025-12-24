# allow2automate Plugin Template

This is a starter template for creating allow2automate plugins. It provides a complete, ready-to-use boilerplate with all necessary files, structure, and best practices built-in.

## 🚀 Quick Start

### 1. Clone or Copy This Template

```bash
# Option 1: Clone this directory
cp -r examples/plugin-template my-awesome-plugin

# Option 2: Use as template on GitHub
# Click "Use this template" button
```

### 2. Customize the Template

Run through this checklist and replace all placeholders:

#### Replace These Placeholders:

- [ ] `{{PLUGIN_NAME}}` - Your plugin name (e.g., `analytics-tracker`)
- [ ] `{{DESCRIPTION}}` - Brief plugin description
- [ ] `{{AUTHOR_NAME}}` - Your name
- [ ] `{{AUTHOR_EMAIL}}` - Your email
- [ ] `{{GITHUB_USERNAME}}` - Your GitHub username
- [ ] `{{SERVICE_NAME}}` - External service name (if applicable)
- [ ] `{{KEYWORD_1}}`, `{{KEYWORD_2}}` - npm keywords
- [ ] `{{YEAR}}` - Current year for license
- [ ] `{{YYYY-MM-DD}}` - Current date for changelog
- [ ] `{{SECURITY_EMAIL}}` - Security contact email
- [ ] `{{SUPPORT_EMAIL}}` - Support contact email

**Quick Find & Replace:**

```bash
# Linux/Mac
find . -type f -exec sed -i 's/{{PLUGIN_NAME}}/my-awesome-plugin/g' {} +
find . -type f -exec sed -i 's/{{AUTHOR_NAME}}/John Doe/g' {} +
# ... repeat for all placeholders

# Or use your IDE's find-and-replace across files
```

### 3. Customize the Code

#### Essential Files to Modify:

1. **`index.js`** - Main plugin logic
   - [ ] Update `metadata` object
   - [ ] Implement `onLoad()` logic (lines marked with `// TODO:`)
   - [ ] Implement `onUnload()` cleanup
   - [ ] Implement `newState()` state handling
   - [ ] Implement `beforeAction()` and `afterAction()` if needed
   - [ ] Update helper functions for your use case

2. **`src/api-wrapper.js`** - API integration
   - [ ] Update API methods for your service
   - [ ] Add authentication logic
   - [ ] Implement error handling
   - [ ] Add rate limiting if needed

3. **`src/config-ui.js`** - Configuration UI (optional)
   - [ ] Update form fields for your config
   - [ ] Implement validation logic
   - [ ] Add custom UI elements
   - [ ] Or delete this file if you want auto-generated UI

4. **`test/index.test.js`** - Tests
   - [ ] Update test cases for your logic
   - [ ] Add tests for new features
   - [ ] Update mock data

5. **`package.json`**
   - [ ] Update dependencies
   - [ ] Update scripts if needed
   - [ ] Verify `allow2automate` compatibility version

#### Files to Update:

- [ ] **`README.md`** - User-facing documentation
- [ ] **`docs/API.md`** - API reference
- [ ] **`CONTRIBUTING.md`** - Contribution guidelines
- [ ] **`CHANGELOG.md`** - Version history
- [ ] **`.env.example`** - Environment variables template

### 4. Install Dependencies

```bash
npm install
```

### 5. Configure Environment

```bash
cp .env.example .env
# Edit .env with your development credentials
```

### 6. Develop & Test

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Check coverage
npm run test:coverage
```

### 7. Build & Publish

```bash
# Build (if you added a build step)
npm run build

# Publish to npm
npm publish
```

## 📁 Template Structure

```
plugin-template/
├── index.js                    # Main plugin file - START HERE
├── package.json                # Dependencies & metadata
├── README.md                   # User documentation
├── LICENSE                     # MIT license
├── .env.example               # Environment variables template
├── .eslintrc.json             # Linting configuration
├── .gitignore                 # Git ignore rules
├── CONTRIBUTING.md            # Contribution guidelines
├── CHANGELOG.md               # Version history
├── TEMPLATE_README.md         # This file
│
├── src/
│   ├── config-ui.js          # Configuration UI component
│   └── api-wrapper.js        # External API integration
│
├── test/
│   └── index.test.js         # Test suite
│
├── docs/
│   └── API.md                # API documentation
│
└── .github/
    └── workflows/
        └── ci.yml            # CI/CD pipeline
```

## 🎯 What to Keep vs. Customize

### ✅ Keep As-Is:

- CI/CD pipeline (`.github/workflows/ci.yml`)
- ESLint configuration (`.eslintrc.json`)
- `.gitignore` patterns
- License structure (update copyright only)
- Test framework setup
- Storage and logging interfaces

### 🔧 Customize:

- All `// TODO:` comments in code
- API endpoint URLs
- Configuration schema in `metadata.configSchema`
- Hook implementations (`onLoad`, `newState`, etc.)
- API wrapper methods
- Test cases
- Documentation examples

### ❌ Optional (Can Delete):

- `src/config-ui.js` - If you want auto-generated UI
- `src/api-wrapper.js` - If no external API needed
- Unused hook functions - Remove from `metadata.hooks` and exports

## 📝 Customization Checklist

### Phase 1: Setup (Required)

- [ ] Replace all `{{PLACEHOLDERS}}`
- [ ] Update `package.json` metadata
- [ ] Set up `.env` with development credentials
- [ ] Initialize git repository
- [ ] Install dependencies (`npm install`)

### Phase 2: Core Logic (Required)

- [ ] Define configuration schema in `metadata.configSchema`
- [ ] Implement `onLoad()` initialization logic
- [ ] Implement `onUnload()` cleanup logic
- [ ] Implement state change handling in `newState()`
- [ ] Update API wrapper for your service
- [ ] Write basic tests

### Phase 3: Advanced Features (Optional)

- [ ] Implement `beforeAction()` for action validation
- [ ] Implement `afterAction()` for post-processing
- [ ] Create custom configuration UI
- [ ] Add caching logic
- [ ] Add rate limiting
- [ ] Implement webhooks

### Phase 4: Documentation (Required)

- [ ] Update README with actual examples
- [ ] Document API methods in API.md
- [ ] Add troubleshooting section
- [ ] Update CONTRIBUTING.md
- [ ] Start CHANGELOG.md

### Phase 5: Testing & Quality (Required)

- [ ] Write comprehensive tests (>80% coverage)
- [ ] Run linter and fix issues
- [ ] Test with actual allow2automate app
- [ ] Security audit (`npm audit`)
- [ ] Performance testing

### Phase 6: Publishing (Required)

- [ ] Create GitHub repository
- [ ] Set up CI/CD
- [ ] Tag version 1.0.0
- [ ] Publish to npm
- [ ] Announce release

## 🔑 Key Concepts

### Plugin Hooks

Your plugin can implement these hooks (all optional):

1. **`onLoad(config, context)`** - Initialize plugin
2. **`onUnload(context)`** - Cleanup resources
3. **`newState(state, previousState, context)`** - React to state changes
4. **`beforeAction(action, context)`** - Intercept actions before execution
5. **`afterAction(action, result, context)`** - Process action results

### Configuration Schema

Define your configuration in `metadata.configSchema`:

```javascript
configSchema: {
  apiKey: {
    type: 'string',        // Type validation
    required: true,        // Is it required?
    secure: true,          // Should it be encrypted?
    default: 'default',    // Default value
    description: '...'     // Help text
  }
}
```

### Context Object

Available in all hooks:

```javascript
context.logger.info('message')  // Logging
context.storage.set(key, value) // Persistent storage
context.userId                  // Current user
```

## 📚 Examples

### Example 1: Analytics Plugin

```javascript
// Track page views
async function newState(state, previousState, context) {
  if (state.currentPage !== previousState.currentPage) {
    await analytics.track('pageview', {
      page: state.currentPage,
      userId: context.userId
    });
  }
}
```

### Example 2: Permission Checker

```javascript
// Block unauthorized actions
async function beforeAction(action, context) {
  if (action.type === 'DELETE_USER') {
    const canDelete = await checkPermission(context.userId);
    if (!canDelete) {
      context.logger.warn('Unauthorized delete attempt');
      return null; // Cancel action
    }
  }
  return action;
}
```

### Example 3: Data Sync

```javascript
// Sync data after actions
async function afterAction(action, result, context) {
  if (result.success && action.type === 'UPDATE_PROFILE') {
    await api.syncProfile(result.data);
    context.logger.info('Profile synced');
  }
}
```

## 🛠️ Development Tips

### 1. Start Simple

Begin with just `onLoad()` and basic functionality. Add hooks incrementally.

### 2. Test Early

Write tests alongside your code. Use test-driven development.

### 3. Log Everything

Use `context.logger` extensively during development:

```javascript
context.logger.debug('State changed:', state);
context.logger.info('Action completed');
context.logger.warn('Unusual condition detected');
context.logger.error('Operation failed:', error);
```

### 4. Handle Errors Gracefully

Never crash the main app:

```javascript
async function newState(state, previousState, context) {
  try {
    await riskyOperation();
  } catch (error) {
    context.logger.error('Operation failed:', error);
    // Don't throw - let app continue
  }
}
```

### 5. Use Storage Wisely

Cache data to avoid unnecessary API calls:

```javascript
// Check cache first
let data = await context.storage.get('cachedData');
if (!data) {
  data = await api.fetchData();
  await context.storage.set('cachedData', data);
}
```

### 6. Security First

- Never hardcode secrets
- Always validate input
- Use `secure: true` for sensitive config
- Sanitize data before storage
- Follow least privilege principle

## 🔍 Debugging

### Enable Debug Logging

```javascript
// In your .env
LOG_LEVEL=debug
```

### Test Locally

```bash
# Link plugin locally
npm link

# In your allow2automate app
npm link {{PLUGIN_NAME}}
```

### Common Issues

1. **Plugin not loading**
   - Check configuration schema validation
   - Verify all required fields are provided
   - Check logs for initialization errors

2. **State changes not detected**
   - Ensure `newState` is in `metadata.hooks`
   - Verify state comparison logic
   - Check if plugin is initialized

3. **API calls failing**
   - Verify API key is correct
   - Check network permissions
   - Review error handling

## 📖 Further Reading

- [allow2automate Plugin Guide](../../../docs/plugins.md)
- [Plugin Best Practices](../../../docs/plugin-best-practices.md)
- [API Reference](./docs/API.md)
- [Contributing Guide](./CONTRIBUTING.md)

## 💡 Need Help?

- Read the [full documentation](./README.md)
- Check [API.md](./docs/API.md) for detailed API info
- Look at [example plugins](../) for inspiration
- Open an issue on GitHub

## 🎉 You're Ready!

Follow the checklist above, customize the template, and start building your plugin!

**Remember:**
1. Replace all placeholders
2. Implement core logic (TODOs)
3. Write tests
4. Update documentation
5. Test thoroughly
6. Publish!

Good luck with your plugin! 🚀

---

**Template Version:** 1.0.0
**Compatible with:** allow2automate >= 1.0.0
**License:** MIT
