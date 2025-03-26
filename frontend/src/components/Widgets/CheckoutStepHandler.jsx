import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import IntermediateCheckoutStep from './IntermediateCheckoutStep';
import { onShowCheckoutStep } from '../../services/checkoutService';
import { fetchStripeConfig } from '../../config';

/**
 * Global component that listens for checkout events and displays the checkout step
 * This allows any component to trigger the checkout flow without implementing modal logic
 */
const CheckoutStepHandler = () => {
  const [showModal, setShowModal] = useState(false);
  const [stripeConfig, setStripeConfig] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [source, setSource] = useState('unknown');
  const authState = useSelector((state) => state.auth);
  
  // Extract email and user ID from auth state
  const userEmail = authState?.email || '';
  const userId = authState?.id || null;
  
  useEffect(() => {
    // Load Stripe config when component mounts
    const loadStripeConfig = async () => {
      try {
        const config = await fetchStripeConfig();
        setStripeConfig(config);
        setCheckoutUrl(config.proLink);
      } catch (error) {
        console.error('Error loading Stripe config:', error);
      }
    };
    
    loadStripeConfig();
    
    // Listen for checkout events
    const cleanup = onShowCheckoutStep((detail) => {
      setShowModal(true);
      if (detail.source) {
        setSource(detail.source);
      }
    });
    
    return cleanup;
  }, []);
  
  const handleClose = () => {
    setShowModal(false);
  };
  
  if (!showModal || !stripeConfig) {
    return null;
  }
  
  return (
    <IntermediateCheckoutStep
      email={userEmail}
      checkoutUrl={checkoutUrl}
      onClose={handleClose}
      hasStripeButton={Boolean(stripeConfig.buttonId && stripeConfig.publishableKeyId)}
      stripeConfig={stripeConfig}
      userId={userId}
    />
  );
};

export default CheckoutStepHandler; 