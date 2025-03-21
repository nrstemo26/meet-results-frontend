/**
 * Utility functions for sanitizing data before rendering in the UI
 * to help prevent XSS attacks
 */

/**
 * Sanitizes text input to prevent XSS attacks
 * @param {string} input - The text to sanitize
 * @param {string} fallback - Optional fallback value if input is invalid
 * @returns {string} - The sanitized text
 */
export const sanitizeText = (input, fallback = '') => {
  if (input === null || input === undefined) {
    return fallback;
  }
  
  // Convert to string if not already
  const text = String(input);
  
  // Replace HTML entities
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Sanitizes URL to ensure it's safe to use in href attributes
 * @param {string} url - The URL to sanitize
 * @param {string} fallback - Optional fallback URL if the input is invalid
 * @returns {string} - The sanitized URL
 */
export const sanitizeUrl = (url, fallback = '#') => {
  if (!url) {
    return fallback;
  }
  
  // Check if URL is valid and uses http or https protocol
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
      return urlObj.toString();
    }
    return fallback;
  } catch (e) {
    return fallback;
  }
};

/**
 * Sanitizes email address to prevent XSS in mailto links
 * @param {string} email - The email to sanitize
 * @returns {string|null} - The sanitized email or null if invalid
 */
export const sanitizeEmail = (email, fallback = null) => {
  if (!email) {
    return fallback;
  }
  
  // Basic email validation
  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return email;
  }
  
  return fallback;
};

/**
 * Sanitizes a number to prevent invalid values
 * @param {number|string} num - The number to sanitize
 * @param {number} fallback - Optional fallback value if input is invalid
 * @returns {number} - The sanitized number
 */
export const sanitizeNumber = (num, fallback = 0) => {
  const parsed = parseFloat(num);
  return isNaN(parsed) ? fallback : parsed;
};

/**
 * Creates a safe style object for React
 * @param {Object} styles - The style object to sanitize
 * @returns {Object} - The sanitized style object
 */
export const sanitizeStyle = (styles) => {
  if (!styles || typeof styles !== 'object') {
    return {};
  }
  
  // List of allowed CSS properties for basic styling
  const allowedProps = [
    'color', 'backgroundColor', 'fontSize', 'fontWeight', 'textAlign', 
    'margin', 'padding', 'border', 'borderRadius', 'display', 'width', 
    'height', 'maxWidth', 'maxHeight', 'overflow', 'position'
  ];
  
  // Filter the style object to only include allowed properties
  return Object.keys(styles).reduce((safeStyles, prop) => {
    if (allowedProps.includes(prop)) {
      safeStyles[prop] = styles[prop];
    }
    return safeStyles;
  }, {});
}; 