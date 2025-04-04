/**
 * Service to handle checkout-related functionality
 */

// Custom event name
const SHOW_CHECKOUT_EVENT = 'show-checkout-step';

/**
 * Show the intermediate checkout step by dispatching a custom event
 * This allows any component to trigger the checkout flow without having to 
 * implement the modal display logic
 * 
 * @param {Object} params Optional parameters for the checkout step
 * @param {string} params.source Source of the checkout initiation for analytics
 */
export const showCheckoutStep = (params = {}) => {
  // Create a custom event with checkout data
  const event = new CustomEvent(SHOW_CHECKOUT_EVENT, {
    detail: {
      source: params.source || 'unknown',
      timestamp: Date.now(),
      ...params
    }
  });
  
  // Dispatch the event
  document.dispatchEvent(event);
};

/**
 * Add a listener for the show checkout step event
 * 
 * @param {Function} callback Function to call when the event is dispatched
 * @returns {Function} Function to remove the event listener
 */
export const onShowCheckoutStep = (callback) => {
  const handler = (event) => {
    callback(event.detail);
  };
  
  document.addEventListener(SHOW_CHECKOUT_EVENT, handler);
  
  // Return a cleanup function
  return () => {
    document.removeEventListener(SHOW_CHECKOUT_EVENT, handler);
  };
}; 