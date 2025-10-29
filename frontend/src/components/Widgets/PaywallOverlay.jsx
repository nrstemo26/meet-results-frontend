import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { account } from '../../features/authSlice';
import { proLink } from "../../config";
import { showCheckoutStep } from '../../services/checkoutService';

function PaywallOverlay({ children, buttonText = 'Unlock with Lift Oracle Pro', blur ='blur-sm' }) {
  const user = useSelector((state) => state.auth);
  const { isSubscribed } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user !== null) {
      dispatch(account());
    }
    // Only run once on mount to check subscription status
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpgradeClick = (e) => {
    e.preventDefault();
    
    // Track the event if analytics are available
    if (window.umami) {
      window.umami.track('Upgrade to PRO', { source: 'paywall_overlay' });
    }
    
    // Show the intermediate checkout step
    showCheckoutStep({
      source: 'paywall_overlay'
    });
  };
  
  const enhancedChildren = isSubscribed 
    ? children 
    : React.cloneElement(children, {
        className: `${children.props.className || ''} ${blur}`,
      });

  return (
    <div className="relative">
      {enhancedChildren}
      {!isSubscribed && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="
          absolute top-0 left-0 right-0 bottom-0
          bg-gradient-to-r from-white via-primary-50 to-white
          opacity-50
          flex items-center justify-center z-0
          "></div>
          <button 
            onClick={handleUpgradeClick}
            className="bg-primary-950 hover:bg-primary-400 text-white font-bold py-2 px-4 rounded z-20"
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
}

export default PaywallOverlay;
