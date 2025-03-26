import React, { useState } from 'react';
import IntermediateCheckoutStep from './IntermediateCheckoutStep';
import { showCheckoutStep } from '../../services/checkoutService';

/**
 * Test component for checking the checkout flow
 * For development purposes only - can be used to test both direct modal and event-based approaches
 */
const CheckoutTestButton = () => {
  const [showModal, setShowModal] = useState(false);
  
  const handleDirectTest = () => {
    setShowModal(true);
  };
  
  const handleEventTest = () => {
    showCheckoutStep({
      source: 'test_button'
    });
  };
  
  const handleClose = () => {
    setShowModal(false);
  };
  
  const mockStripeConfig = {
    buttonId: 'buy_btn_0NTsunUiMszhBUnlaOwffE0u',
    publishableKeyId: 'pk_test_example',
    proLink: '#test-link'
  };
  
  return (
    <>
      <div className="flex space-x-4 p-4">
        <button 
          onClick={handleDirectTest}
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Test Direct Modal
        </button>
        
        <button 
          onClick={handleEventTest}
          className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Test Event Modal
        </button>
      </div>
      
      {showModal && (
        <IntermediateCheckoutStep
          email="test@example.com"
          checkoutUrl="#test"
          onClose={handleClose}
          hasStripeButton={true}
          stripeConfig={mockStripeConfig}
          userId="test-123"
        />
      )}
    </>
  );
};

export default CheckoutTestButton; 