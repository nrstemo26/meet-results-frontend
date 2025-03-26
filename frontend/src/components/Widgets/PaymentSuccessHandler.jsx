import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { account } from '../../features/authSlice';
import SuccessModal from './SuccessModal';
import { 
  getPaymentSuccessEvent,
  clearPaymentSuccessEvent,
  markPaymentModalSeen,
  hasPaymentModalBeenSeen
} from '../../services/paymentService';

/**
 * Component to handle payment success events
 * Displays a success modal when a payment is successful
 */
const PaymentSuccessHandler = () => {
  const [showModal, setShowModal] = useState(false);
  const [successEvent, setSuccessEvent] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check for success event in session storage
    const event = getPaymentSuccessEvent();
    const modalSeen = hasPaymentModalBeenSeen();
    
    if (event && !modalSeen) {
      setSuccessEvent(event);
      setShowModal(true);
      
      // If we have a user ID, refresh the user's account info
      if (event.userId && user) {
        dispatch(account());
      }
    }
  }, [dispatch, user]);

  const handleCloseModal = () => {
    setShowModal(false);
    clearPaymentSuccessEvent();
    markPaymentModalSeen();
  };

  if (!showModal || !successEvent) {
    return null;
  }

  return (
    <SuccessModal
      accountStatus={successEvent.accountStatus}
      credentials={successEvent.credentials}
      onClose={handleCloseModal}
    />
  );
};

export default PaymentSuccessHandler; 