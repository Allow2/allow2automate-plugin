/**
 * API Wrapper for {{SERVICE_NAME}}
 *
 * This module provides a clean interface to interact with external APIs.
 * Customize this based on your specific API requirements.
 */

const axios = require('axios');

class ApiWrapper {
  /**
   * Create API wrapper instance
   * @param {Object} config - Configuration object
   * @param {string} config.apiKey - API key
   * @param {string} config.apiEndpoint - API endpoint URL
   * @param {number} config.timeout - Request timeout
   * @param {Object} logger - Logger instance
   */
  constructor(config, logger) {
    this.config = config;
    this.logger = logger;
    this.client = axios.create({
      baseURL: config.apiEndpoint || 'https://api.example.com',
      timeout: config.timeout || 5000,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'allow2automate-{{PLUGIN_NAME}}/1.0.0'
      }
    });

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        this.logger.debug(`API Request: ${config.method.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        this.logger.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => {
        this.logger.debug(`API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        this.handleApiError(error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Handle API errors consistently
   * @param {Error} error - Axios error object
   */
  handleApiError(error) {
    if (error.response) {
      // Server responded with error status
      this.logger.error(`API Error: ${error.response.status} - ${error.response.statusText}`, {
        url: error.config.url,
        data: error.response.data
      });
    } else if (error.request) {
      // Request made but no response
      this.logger.error('API Error: No response received', {
        url: error.config.url
      });
    } else {
      // Error in request setup
      this.logger.error('API Error:', error.message);
    }
  }

  /**
   * Check API health
   * @returns {Promise<boolean>}
   */
  async checkHealth() {
    try {
      const response = await this.client.get('/health');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  /**
   * TODO: Add your API methods here
   * Below are examples - replace with your actual API endpoints
   */

  /**
   * Get user data
   * @param {string} userId - User ID
   * @returns {Promise<Object>}
   */
  async getUser(userId) {
    try {
      const response = await this.client.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to get user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Create resource
   * @param {Object} data - Resource data
   * @returns {Promise<Object>}
   */
  async createResource(data) {
    try {
      const response = await this.client.post('/resources', data);
      return response.data;
    } catch (error) {
      this.logger.error('Failed to create resource:', error);
      throw error;
    }
  }

  /**
   * Update resource
   * @param {string} id - Resource ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>}
   */
  async updateResource(id, data) {
    try {
      const response = await this.client.put(`/resources/${id}`, data);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to update resource ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete resource
   * @param {string} id - Resource ID
   * @returns {Promise<boolean>}
   */
  async deleteResource(id) {
    try {
      await this.client.delete(`/resources/${id}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to delete resource ${id}:`, error);
      throw error;
    }
  }

  /**
   * List resources with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @returns {Promise<Object>}
   */
  async listResources({ page = 1, limit = 20 } = {}) {
    try {
      const response = await this.client.get('/resources', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      this.logger.error('Failed to list resources:', error);
      throw error;
    }
  }

  /**
   * Search resources
   * @param {string} query - Search query
   * @returns {Promise<Array>}
   */
  async searchResources(query) {
    try {
      const response = await this.client.get('/resources/search', {
        params: { q: query }
      });
      return response.data.results;
    } catch (error) {
      this.logger.error('Search failed:', error);
      throw error;
    }
  }

  /**
   * Batch operation
   * @param {Array<Object>} operations - Array of operations
   * @returns {Promise<Array>}
   */
  async batchOperation(operations) {
    try {
      const response = await this.client.post('/batch', { operations });
      return response.data.results;
    } catch (error) {
      this.logger.error('Batch operation failed:', error);
      throw error;
    }
  }

  /**
   * Upload file
   * @param {Buffer|Stream} file - File data
   * @param {string} filename - File name
   * @returns {Promise<Object>}
   */
  async uploadFile(file, filename) {
    try {
      const formData = new FormData();
      formData.append('file', file, filename);

      const response = await this.client.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      this.logger.error('File upload failed:', error);
      throw error;
    }
  }

  /**
   * Get analytics data
   * @param {Object} params - Analytics parameters
   * @param {string} params.startDate - Start date (ISO format)
   * @param {string} params.endDate - End date (ISO format)
   * @param {string} params.metric - Metric name
   * @returns {Promise<Object>}
   */
  async getAnalytics({ startDate, endDate, metric }) {
    try {
      const response = await this.client.get('/analytics', {
        params: { startDate, endDate, metric }
      });
      return response.data;
    } catch (error) {
      this.logger.error('Failed to get analytics:', error);
      throw error;
    }
  }

  /**
   * Subscribe to webhook
   * @param {Object} params - Webhook parameters
   * @param {string} params.event - Event type
   * @param {string} params.url - Webhook URL
   * @returns {Promise<Object>}
   */
  async subscribeWebhook({ event, url }) {
    try {
      const response = await this.client.post('/webhooks', {
        event,
        url
      });
      return response.data;
    } catch (error) {
      this.logger.error('Webhook subscription failed:', error);
      throw error;
    }
  }
}

module.exports = ApiWrapper;
