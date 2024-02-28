import React from 'react';
import { useSelector } from "react-redux";
import { proLink } from "../../config"

function PaywallOverlay({ children, buttonText = 'Unlock with Lift Oracle Pro' }) {
  const auth = useSelector((state) => state.auth);
  const isSubscribed = useSelector((state) => state.auth.isSubscribed)
  const enhancedChildren = isSubscribed 
    ? children 
    : React.cloneElement(children, {
        className: `${children.props.className || ''} blur-sm`,
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
          <a href={proLink} className="z-20">
            <button className="bg-primary-950 hover:bg-primary-400 text-white font-bold py-2 px-4 rounded">
              {buttonText}
            </button>
          </a>
        </div>
      )}
    </div>
  );
}

export default PaywallOverlay;
