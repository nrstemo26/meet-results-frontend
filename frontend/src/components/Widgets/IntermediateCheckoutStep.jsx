import React, { useEffect, useRef } from 'react';

/**
 * IntermediateCheckoutStep component
 * Displays a modal with account creation information before proceeding to Stripe checkout
 * 
 * @param {Object} props
 * @param {string} props.email - User's email if logged in
 * @param {string} props.checkoutUrl - URL to redirect to for Stripe checkout
 * @param {Function} props.onClose - Function to close the modal
 * @param {boolean} props.hasStripeButton - Whether to show embedded Stripe button (true) or use link (false)
 * @param {Object} props.stripeConfig - Configuration for Stripe button if hasStripeButton is true
 * @param {string} props.userId - User ID if logged in
 */
const IntermediateCheckoutStep = ({ 
  email, 
  checkoutUrl, 
  onClose, 
  hasStripeButton = false, 
  stripeConfig = {},
  userId
}) => {
  const stripeContainerRef = useRef(null);
  
  // This effect ensures proper Stripe button rendering
  useEffect(() => {
    // For Stripe buttons, there's sometimes a delay in rendering
    // This helps ensure the button is properly styled after it loads
    if (hasStripeButton && stripeContainerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        // When the Stripe container changes size (meaning the button loaded)
        // add our custom styling
        const stripeButtons = stripeContainerRef.current.querySelectorAll('stripe-buy-button');
        stripeButtons.forEach(button => {
          button.style.margin = '0 auto';
          button.style.display = 'block';
          
          // Apply inline styles for responsive design that can't be handled by Tailwind
          const iframes = button.querySelectorAll('iframe');
          iframes.forEach(iframe => {
            iframe.style.margin = '0 auto';
          });
        });
      });
      
      resizeObserver.observe(stripeContainerRef.current);
      
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [hasStripeButton]);
  
  const handleContinue = () => {
    // Track the event if analytics are available
    if (window.umami) {
      window.umami.track('Proceed to Checkout', { source: 'intermediate_step' });
    }
    
    // If no stripe button is provided, redirect to the checkout URL
    if (!hasStripeButton) {
      window.location.href = checkoutUrl;
    }
    // Otherwise the embedded Stripe button will be used
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto max-h-screen h-full md:h-screen">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto my-8">
        <div className="p-4 sm:p-6">
          <h2 className="text-xl font-bold mb-4 text-primary-800">
            Upgrade to Lift Oracle Pro
          </h2>
          
          <div className="mb-5">
            <h3 className="text-primary-900 font-medium mb-2">
              Account Information
            </h3>
            <p className="text-primary-700 text-sm mb-4">
              If you have an existing account, please use the same email address.
              If you don't have an account, one will be created for you to access your Pro features.
            </p>
            
            {email && (
              <div className="bg-primary-50 p-3 rounded-md border border-primary-100 mb-4">
                <p className="text-sm text-primary-800">
                  <span className="font-medium">Checkout with:</span> {email}
                </p>
              </div>
            )}
            
            <div className="bg-gray-100 p-3 rounded-md">
              <h4 className="font-medium text-gray-800 mb-1">What happens next?</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• You'll be redirected to our secure payment processor</li>
                <li>• Complete your payment information</li>
                <li>• Your Pro subscription will be activated immediately</li>
                {!email && (
                  <li>• You'll receive account credentials by email</li>
                )}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            {hasStripeButton && stripeConfig.buttonId && stripeConfig.publishableKeyId ? (
              <div 
                className="flex justify-center items-center w-full text-center" 
                ref={stripeContainerRef}
              >
                <stripe-buy-button
                  buy-button-id={stripeConfig.buttonId}
                  publishable-key={stripeConfig.publishableKeyId}
                  customer-email={email}
                  client-reference-id={userId}
                  data-umami-event="pro-checkout"
                >
                </stripe-buy-button>
              </div>
            ) : (
              <button
                onClick={handleContinue}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-md py-3 min-h-[44px] font-medium transition-colors"
              >
                Continue to Payment
              </button>
            )}
            
            <button
              onClick={onClose}
              className="w-full bg-white hover:bg-gray-100 text-primary-700 border border-primary-200 rounded-md py-3 min-h-[44px] font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntermediateCheckoutStep; 