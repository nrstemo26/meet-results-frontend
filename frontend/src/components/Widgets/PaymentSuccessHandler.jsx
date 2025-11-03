import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { account } from '../../features/authSlice';
import SuccessModal from './SuccessModal';
import { 
  getPaymentSuccessEvent,
  clearPaymentSuccessEvent,
  markPaymentModalSeen,
  hasPaymentModalBeenSeen,
  fetchPaymentSuccessEvent
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
  const location = useLocation();

  useEffect(() => {
    const checkForEvents = async () => {
      // First check session storage for existing events
      const storedEvent = getPaymentSuccessEvent();
      const modalSeen = hasPaymentModalBeenSeen();
      
      if (storedEvent && !modalSeen) {
        console.log('Found stored payment event:', storedEvent);
        setSuccessEvent(storedEvent);
        setShowModal(true);
        
        // If we have a user ID, refresh the user's account info
        if (storedEvent.userId && user) {
          dispatch(account());
        }
        return;
      }
      
      // If no stored event, check for session_id in URL (from Stripe redirect)
      const params = new URLSearchParams(location.search);
      const sessionId = params.get('session_id');
      
      if (sessionId && !modalSeen) {
        console.log('Fetching event by session ID:', sessionId);
        // Fetch the event from the API
        const event = await fetchPaymentSuccessEvent({ sessionId });
        console.log('API response for session ID fetch:', event);
        
        if (event) {
          setSuccessEvent(event);
          setShowModal(true);
          
          // If we have a user ID, refresh the user's account info
          if (event.userId && user) {
            dispatch(account());
          }
          return;
        } else {
          console.log('No event found for session ID, trying with just email if user is logged in');
        }
      } else {
        console.log('No session ID in URL or modal already seen');
      }
      
      // If user is logged in, check for events by user ID or email
      if (user && !modalSeen) {
        console.log('Trying to fetch event by user ID/email:', user.id, user.email);
        const event = await fetchPaymentSuccessEvent({ 
          userId: user.id,
          email: user.email 
        });
        console.log('API response for user ID/email fetch:', event);
        
        if (event) {
          setSuccessEvent(event);
          setShowModal(true);
          dispatch(account());
        }
      }
    };
    
    checkForEvents();
    // Only check once on mount or when location changes (e.g., URL params)
    // Don't re-run when user changes to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleCloseModal = () => {
    setShowModal(false);
    clearPaymentSuccessEvent();
    markPaymentModalSeen();
    
    // Remove session_id from URL if present
    const params = new URLSearchParams(window.location.search);
    if (params.has('session_id')) {
      params.delete('session_id');
      const newUrl = window.location.pathname + 
        (params.toString() ? `?${params.toString()}` : '');
      window.history.replaceState({}, '', newUrl);
    }
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