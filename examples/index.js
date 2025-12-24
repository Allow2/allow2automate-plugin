/**
 * {{PLUGIN_NAME}} - allow2automate plugin
 * {{DESCRIPTION}}
 *
 * @author {{AUTHOR_NAME}}
 * @license MIT
 */

const axios = require('axios');

/**
 * Plugin metadata
 * This object describes your plugin to allow2automate
 */
const metadata = {
  name: '{{PLUGIN_NAME}}',
  version: '1.0.0',
  description: '{{DESCRIPTION}}',
  author: '{{AUTHOR_NAME}}',

  // Configuration schema for the plugin
  configSchema: {
    apiKey: {
      type: 'string',
      required: true,
      secure: true, // Will be encrypted in storage
      description: 'API key for {{SERVICE_NAME}}'
    },
    apiEndpoint: {
      type: 'string',
      required: false,
      default: 'https://api.example.com',
      description: 'API endpoint URL'
    },
    timeout: {
      type: 'number',
      required: false,
      default: 5000,
      description: 'Request timeout in milliseconds'
    },
    enableFeature: {
      type: 'boolean',
      required: false,
      default: true,
      description: 'Enable advanced features'
    }
  },

  // UI component for configuration (optional)
  // If not provided, auto-generated UI will be used based on configSchema
  configComponent: './src/config-ui.js',

  // Permissions required by this plugin
  permissions: [
    'network', // Make HTTP requests
    'storage', // Access local storage
    // 'filesystem', // Access file system (if needed)
    // 'process', // Spawn processes (if needed)
  ],

  // Hooks this plugin implements
  hooks: [
    'onLoad',
    'onUnload',
    'newState',
    'beforeAction',
    'afterAction'
  ]
};

/**
 * Plugin state
 * Store any runtime data here
 */
let pluginState = {
  initialized: false,
  apiClient: null,
  cache: new Map(),
  config: {}
};

/**
 * Initialize API client
 * @param {Object} config - Plugin configuration
 * @returns {Object} Axios instance
 */
function initializeApiClient(config) {
  return axios.create({
    baseURL: config.apiEndpoint || 'https://api.example.com',
    timeout: config.timeout || 5000,
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'allow2automate-{{PLUGIN_NAME}}/1.0.0'
    }
  });
}

/**
 * onLoad hook
 * Called when the plugin is loaded
 *
 * @param {Object} config - Plugin configuration from user
 * @param {Object} context - Plugin context (logger, storage, etc.)
 * @returns {Promise<void>}
 */
async function onLoad(config, context) {
  try {
    context.logger.info('{{PLUGIN_NAME}} plugin loading...');

    // Validate configuration
    if (!config.apiKey) {
      throw new Error('API key is required');
    }

    // Store configuration
    pluginState.config = config;

    // Initialize API client
    pluginState.apiClient = initializeApiClient(config);

    // TODO: Add your initialization logic here
    // Example: Test API connection
    try {
      await pluginState.apiClient.get('/health');
      context.logger.info('API connection successful');
    } catch (error) {
      context.logger.warn('API connection failed:', error.message);
    }

    // Load cached data from storage
    const cachedData = await context.storage.get('pluginCache');
    if (cachedData) {
      pluginState.cache = new Map(Object.entries(cachedData));
      context.logger.info(`Loaded ${pluginState.cache.size} cached items`);
    }

    pluginState.initialized = true;
    context.logger.info('{{PLUGIN_NAME}} plugin loaded successfully');

  } catch (error) {
    context.logger.error('Failed to load plugin:', error);
    throw error;
  }
}

/**
 * onUnload hook
 * Called when the plugin is being unloaded
 *
 * @param {Object} context - Plugin context
 * @returns {Promise<void>}
 */
async function onUnload(context) {
  try {
    context.logger.info('{{PLUGIN_NAME}} plugin unloading...');

    // TODO: Add cleanup logic here
    // Example: Save cache to storage
    if (pluginState.cache.size > 0) {
      const cacheObject = Object.fromEntries(pluginState.cache);
      await context.storage.set('pluginCache', cacheObject);
      context.logger.info(`Saved ${pluginState.cache.size} cached items`);
    }

    // Clear API client
    pluginState.apiClient = null;
    pluginState.initialized = false;

    context.logger.info('{{PLUGIN_NAME}} plugin unloaded successfully');

  } catch (error) {
    context.logger.error('Error during plugin unload:', error);
    throw error;
  }
}

/**
 * newState hook
 * Called when application state changes
 *
 * @param {Object} state - Current application state
 * @param {Object} previousState - Previous application state
 * @param {Object} context - Plugin context
 * @returns {Promise<void>}
 */
async function newState(state, previousState, context) {
  if (!pluginState.initialized) {
    return;
  }

  try {
    // TODO: Add your state change logic here
    // Example: Detect specific state changes
    if (state.user && !previousState.user) {
      context.logger.info('User logged in:', state.user.id);
      // Perform actions on login
    }

    if (state.currentPage !== previousState.currentPage) {
      context.logger.debug('Page changed:', state.currentPage);
      // Handle page navigation
    }

    // Example: Send state updates to API
    if (pluginState.config.enableFeature) {
      await sendStateUpdate(state, context);
    }

  } catch (error) {
    context.logger.error('Error in newState hook:', error);
  }
}

/**
 * beforeAction hook
 * Called before an action is executed
 *
 * @param {Object} action - Action to be executed
 * @param {Object} context - Plugin context
 * @returns {Promise<Object|null>} Modified action or null to cancel
 */
async function beforeAction(action, context) {
  if (!pluginState.initialized) {
    return action;
  }

  try {
    // TODO: Add pre-action logic here
    // Example: Validate action
    if (action.type === 'CRITICAL_ACTION') {
      const isAllowed = await checkPermission(action, context);
      if (!isAllowed) {
        context.logger.warn('Action blocked by plugin:', action.type);
        return null; // Cancel action
      }
    }

    // Example: Modify action
    if (action.type === 'API_CALL') {
      action.metadata = {
        ...action.metadata,
        pluginEnhancement: true,
        timestamp: Date.now()
      };
    }

    return action;

  } catch (error) {
    context.logger.error('Error in beforeAction hook:', error);
    return action;
  }
}

/**
 * afterAction hook
 * Called after an action is executed
 *
 * @param {Object} action - Executed action
 * @param {Object} result - Action result
 * @param {Object} context - Plugin context
 * @returns {Promise<void>}
 */
async function afterAction(action, result, context) {
  if (!pluginState.initialized) {
    return;
  }

  try {
    // TODO: Add post-action logic here
    // Example: Log action results
    if (action.type === 'DATA_FETCH') {
      context.logger.debug('Data fetched:', {
        action: action.type,
        success: result.success,
        dataSize: result.data?.length || 0
      });
    }

    // Example: Cache results
    if (result.cacheable) {
      pluginState.cache.set(action.id, {
        action,
        result,
        timestamp: Date.now()
      });
    }

    // Example: Send analytics
    if (pluginState.config.enableFeature) {
      await sendAnalytics(action, result, context);
    }

  } catch (error) {
    context.logger.error('Error in afterAction hook:', error);
  }
}

/**
 * Helper function: Send state update to API
 * @param {Object} state - Current state
 * @param {Object} context - Plugin context
 */
async function sendStateUpdate(state, context) {
  try {
    // TODO: Implement your API call logic
    const response = await pluginState.apiClient.post('/state', {
      timestamp: Date.now(),
      state: state
    });

    context.logger.debug('State update sent:', response.status);
  } catch (error) {
    context.logger.error('Failed to send state update:', error);
  }
}

/**
 * Helper function: Check permission for action
 * @param {Object} action - Action to check
 * @param {Object} context - Plugin context
 * @returns {Promise<boolean>}
 */
async function checkPermission(action, context) {
  try {
    // TODO: Implement your permission check logic
    const response = await pluginState.apiClient.post('/check-permission', {
      action: action.type,
      userId: context.userId
    });

    return response.data.allowed;
  } catch (error) {
    context.logger.error('Permission check failed:', error);
    return false;
  }
}

/**
 * Helper function: Send analytics
 * @param {Object} action - Executed action
 * @param {Object} result - Action result
 * @param {Object} context - Plugin context
 */
async function sendAnalytics(action, result, context) {
  try {
    // TODO: Implement your analytics logic
    await pluginState.apiClient.post('/analytics', {
      event: 'action_completed',
      action: action.type,
      success: result.success,
      timestamp: Date.now()
    });
  } catch (error) {
    context.logger.error('Failed to send analytics:', error);
  }
}

/**
 * Export plugin
 */
module.exports = {
  metadata,
  onLoad,
  onUnload,
  newState,
  beforeAction,
  afterAction
};
