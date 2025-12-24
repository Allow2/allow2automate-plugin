/**
 * Configuration UI Component for {{PLUGIN_NAME}}
 *
 * This React component provides a custom configuration interface for the plugin.
 * If you don't need custom UI, you can delete this file and the configComponent
 * property in index.js - allow2automate will auto-generate a UI based on configSchema.
 */

import React, { useState, useEffect } from 'react';

/**
 * Plugin Configuration Component
 *
 * @param {Object} props
 * @param {Object} props.config - Current configuration
 * @param {Function} props.onChange - Callback when configuration changes
 * @param {Function} props.onValidate - Callback to validate configuration
 * @param {Object} props.context - Plugin context
 */
export default function ConfigUI({ config, onChange, onValidate, context }) {
  const [formData, setFormData] = useState({
    apiKey: config.apiKey || '',
    apiEndpoint: config.apiEndpoint || 'https://api.example.com',
    timeout: config.timeout || 5000,
    enableFeature: config.enableFeature !== false
  });

  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const [testStatus, setTestStatus] = useState(null);

  // Update parent when form data changes
  useEffect(() => {
    onChange(formData);
  }, [formData]);

  /**
   * Handle input change
   */
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  /**
   * Validate API key format
   */
  const validateApiKey = (key) => {
    if (!key || key.length < 10) {
      return 'API key must be at least 10 characters';
    }
    // TODO: Add your specific validation logic
    if (!/^[a-zA-Z0-9_-]+$/.test(key)) {
      return 'API key contains invalid characters';
    }
    return null;
  };

  /**
   * Test API connection
   */
  const testConnection = async () => {
    setIsValidating(true);
    setTestStatus(null);

    try {
      // Validate form first
      const apiKeyError = validateApiKey(formData.apiKey);
      if (apiKeyError) {
        setErrors({ apiKey: apiKeyError });
        setTestStatus({ success: false, message: apiKeyError });
        return;
      }

      // TODO: Implement actual API test
      // Example using fetch:
      const response = await fetch(`${formData.apiEndpoint}/health`, {
        headers: {
          'Authorization': `Bearer ${formData.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: formData.timeout
      });

      if (response.ok) {
        setTestStatus({
          success: true,
          message: 'Connection successful!'
        });
        onValidate(true);
      } else {
        setTestStatus({
          success: false,
          message: `API returned ${response.status}: ${response.statusText}`
        });
        onValidate(false);
      }
    } catch (error) {
      setTestStatus({
        success: false,
        message: `Connection failed: ${error.message}`
      });
      onValidate(false);
    } finally {
      setIsValidating(false);
    }
  };

  /**
   * Validate entire form
   */
  const validateForm = () => {
    const newErrors = {};

    const apiKeyError = validateApiKey(formData.apiKey);
    if (apiKeyError) {
      newErrors.apiKey = apiKeyError;
    }

    if (formData.timeout < 1000 || formData.timeout > 60000) {
      newErrors.timeout = 'Timeout must be between 1000 and 60000 ms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="plugin-config" style={styles.container}>
      <h2 style={styles.title}>{{PLUGIN_NAME}} Configuration</h2>
      <p style={styles.description}>{{DESCRIPTION}}</p>

      <div style={styles.form}>
        {/* API Key Field */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="apiKey">
            API Key <span style={styles.required}>*</span>
          </label>
          <input
            id="apiKey"
            type="password"
            value={formData.apiKey}
            onChange={(e) => handleChange('apiKey', e.target.value)}
            placeholder="Enter your API key"
            style={errors.apiKey ? styles.inputError : styles.input}
          />
          {errors.apiKey && (
            <span style={styles.errorText}>{errors.apiKey}</span>
          )}
          <small style={styles.hint}>
            Get your API key from {{SERVICE_NAME}} dashboard
          </small>
        </div>

        {/* API Endpoint Field */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="apiEndpoint">
            API Endpoint
          </label>
          <input
            id="apiEndpoint"
            type="url"
            value={formData.apiEndpoint}
            onChange={(e) => handleChange('apiEndpoint', e.target.value)}
            placeholder="https://api.example.com"
            style={styles.input}
          />
          <small style={styles.hint}>
            Custom API endpoint (leave default if unsure)
          </small>
        </div>

        {/* Timeout Field */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="timeout">
            Request Timeout (ms)
          </label>
          <input
            id="timeout"
            type="number"
            min="1000"
            max="60000"
            step="1000"
            value={formData.timeout}
            onChange={(e) => handleChange('timeout', parseInt(e.target.value))}
            style={errors.timeout ? styles.inputError : styles.input}
          />
          {errors.timeout && (
            <span style={styles.errorText}>{errors.timeout}</span>
          )}
          <small style={styles.hint}>
            Maximum time to wait for API responses
          </small>
        </div>

        {/* Enable Feature Toggle */}
        <div style={styles.formGroup}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.enableFeature}
              onChange={(e) => handleChange('enableFeature', e.target.checked)}
              style={styles.checkbox}
            />
            Enable Advanced Features
          </label>
          <small style={styles.hint}>
            Enable analytics and enhanced monitoring
          </small>
        </div>

        {/* Test Connection Button */}
        <div style={styles.formGroup}>
          <button
            onClick={testConnection}
            disabled={isValidating || !formData.apiKey}
            style={isValidating ? styles.buttonDisabled : styles.button}
          >
            {isValidating ? 'Testing...' : 'Test Connection'}
          </button>
        </div>

        {/* Test Status */}
        {testStatus && (
          <div style={testStatus.success ? styles.successMessage : styles.errorMessage}>
            {testStatus.message}
          </div>
        )}

        {/* Help Section */}
        <div style={styles.helpSection}>
          <h3 style={styles.helpTitle}>Need Help?</h3>
          <ul style={styles.helpList}>
            <li>
              <a href="https://example.com/docs" target="_blank" rel="noopener noreferrer">
                Documentation
              </a>
            </li>
            <li>
              <a href="https://example.com/api-keys" target="_blank" rel="noopener noreferrer">
                Get API Key
              </a>
            </li>
            <li>
              <a href="https://github.com/{{GITHUB_USERNAME}}/{{PLUGIN_NAME}}/issues" target="_blank" rel="noopener noreferrer">
                Report Issue
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Inline styles (you can replace with CSS modules or styled-components)
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#1a1a1a'
  },
  description: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '24px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333'
  },
  required: {
    color: '#e53e3e'
  },
  input: {
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  inputError: {
    padding: '10px 12px',
    fontSize: '14px',
    border: '1px solid #e53e3e',
    borderRadius: '6px',
    outline: 'none'
  },
  checkbox: {
    marginRight: '8px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    cursor: 'pointer'
  },
  hint: {
    fontSize: '12px',
    color: '#6b7280'
  },
  errorText: {
    fontSize: '12px',
    color: '#e53e3e'
  },
  button: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  buttonDisabled: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#9ca3af',
    border: 'none',
    borderRadius: '6px',
    cursor: 'not-allowed'
  },
  successMessage: {
    padding: '12px',
    backgroundColor: '#d1fae5',
    border: '1px solid #10b981',
    borderRadius: '6px',
    color: '#065f46',
    fontSize: '14px'
  },
  errorMessage: {
    padding: '12px',
    backgroundColor: '#fee2e2',
    border: '1px solid #ef4444',
    borderRadius: '6px',
    color: '#991b1b',
    fontSize: '14px'
  },
  helpSection: {
    marginTop: '20px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '6px'
  },
  helpTitle: {
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '12px',
    color: '#1a1a1a'
  },
  helpList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }
};
