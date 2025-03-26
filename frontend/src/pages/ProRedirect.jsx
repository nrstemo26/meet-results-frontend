import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { MbSpinnerGradient as GradientSpinner } from './Spinners/MbSpinnerGradient';
import { fetchPaymentSuccessEvent, getPaymentSuccessEvent } from '../services/paymentService';

const ProRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [debug, setDebug] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 5;
  
  useEffect(() => {
    // Check for session_id in URL
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session_id');
    
    // Debug output
    setDebug({
      sessionId,
      timestamp: new Date().toISOString(),
      storedEvent: getPaymentSuccessEvent(),
      retryCount
    });
    
    // If we have a session_id, try to fetch the payment success event
    if (sessionId) {
      console.log(`Attempting to fetch payment event with session ID (attempt ${retryCount + 1}/${MAX_RETRIES}):`, sessionId);
      
      fetchPaymentSuccessEvent({ sessionId })
        .then(event => {
          console.log('Payment success event fetched:', event);
          // Update debug info
          setDebug(prev => ({ ...prev, fetchedEvent: event }));
          
          if (!event && retryCount < MAX_RETRIES) {
            // If no event found and we haven't hit max retries, try again after a delay
            console.log(`No event found, retrying in 1.5 seconds (${retryCount + 1}/${MAX_RETRIES})`);
            const retryTimer = setTimeout(() => {
              setRetryCount(prev => prev + 1);
            }, 1500);
            
            return () => clearTimeout(retryTimer);
          }
          
          // PaymentSuccessHandler will detect the event in session storage
          // and display the success modal
        })
        .catch(error => {
          console.error('Error fetching payment event:', error);
          setDebug(prev => ({ ...prev, error: error.toString() }));
          
          if (retryCount < MAX_RETRIES) {
            // If there was an error and we haven't hit max retries, try again after a delay
            console.log(`Error fetching event, retrying in 1.5 seconds (${retryCount + 1}/${MAX_RETRIES})`);
            const retryTimer = setTimeout(() => {
              setRetryCount(prev => prev + 1);
            }, 1500);
            
            return () => clearTimeout(retryTimer);
          }
        });
    }
    
    // Redirect to login after delay (longer to accommodate retries)
    const redirectTimeout = setTimeout(() => {
      navigate('/login'); 
    }, 15000); // Increased timeout to accommodate retries

    return () => clearTimeout(redirectTimeout); // Clean up timeout on component unmount
  }, [navigate, location, retryCount]);

  return (
    <div className='mt-4 flex flex-col items-center text-primary-950'>
      <h1 className='text-lg font-bold'>Welcome to Lift Oracle Pro!</h1>
      {/* <p>Welcome to Lift Oracle Pro.</p> */}
      <GradientSpinner />
      <div className="mt-4 bg-white shadow-md p-6 rounded-lg text-center">
        <p className="text-sm">If you do not already have a Lift Oracle account, no worries. We created one for you and emailed your temporary credentials to the address you subscribed with.</p>
      </div>
      
      {/* Debug output - only visible during development */}
      {import.meta.env.DEV && debug && (
        <div className="mt-4 p-4 bg-gray-100 text-xs text-left w-full max-w-2xl overflow-auto">
          <h3 className="font-bold">Debug Info:</h3>
          <pre>{JSON.stringify(debug, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ProRedirect;
