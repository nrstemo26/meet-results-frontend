/**
 * Service to handle payment-related functionality
 */

// Constants for session storage keys
const PAYMENT_SUCCESS_KEY = 'payment_success_event';
const PAYMENT_MODAL_SEEN_KEY = 'payment_modal_seen';

/**
 * Check if there's a payment success event in session storage
 * @returns {Object|null} The payment success event or null if none exists
 */
export const getPaymentSuccessEvent = () => {
  try {
    const eventStr = sessionStorage.getItem(PAYMENT_SUCCESS_KEY);
    if (!eventStr) return null;
    
    const event = JSON.parse(eventStr);
    return event;
  } catch (error) {
    console.error('Error reading payment success event:', error);
    return null;
  }
};

/**
 * Save a payment success event to session storage
 * @param {Object} event - The payment success event
 */
export const savePaymentSuccessEvent = (event) => {
  try {
    sessionStorage.setItem(PAYMENT_SUCCESS_KEY, JSON.stringify(event));
  } catch (error) {
    console.error('Error saving payment success event:', error);
  }
};

/**
 * Clear the payment success event from session storage
 */
export const clearPaymentSuccessEvent = () => {
  try {
    sessionStorage.removeItem(PAYMENT_SUCCESS_KEY);
  } catch (error) {
    console.error('Error clearing payment success event:', error);
  }
};

/**
 * Mark the payment success modal as seen
 */
export const markPaymentModalSeen = () => {
  try {
    sessionStorage.setItem(PAYMENT_MODAL_SEEN_KEY, 'true');
  } catch (error) {
    console.error('Error marking payment modal as seen:', error);
  }
};

/**
 * Check if the payment success modal has been seen
 * @returns {boolean} True if the modal has been seen, false otherwise
 */
export const hasPaymentModalBeenSeen = () => {
  try {
    return sessionStorage.getItem(PAYMENT_MODAL_SEEN_KEY) === 'true';
  } catch (error) {
    console.error('Error checking if payment modal has been seen:', error);
    return false;
  }
}; 