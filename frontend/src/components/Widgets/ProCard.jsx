import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { account } from '../../features/authSlice';
import { proLink } from "../../config";

const UpgradeProCard = () => {
    const [isVisible, setIsVisible] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth);
    const { isSubscribed } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user && user !== null) {
          dispatch(account());
        }
      }, [dispatch, user]);
    
    useEffect(() => {
        if (!isSubscribed) {
            const dismissed = localStorage.getItem('upgradeProCardDismissed');
            if (dismissed === 'true') {
            setIsVisible(false);
            }
        }
    }, [isSubscribed]);

  

  const features = [
    "🫶 Support Lift Oracle",
    "💳 20% all MB+Oracle Gear",
    "🔢 Custom queries and analytics.",
    "🧮 Advanced athlete statistics.",
    "🏆 Upcoming meet startlists.",
    "💾 Build and save unlimited watchlists.",
    "📲 Export to Excel or Google Sheets.",
  ];

  const handleUpgrade = (e) => {
    e.preventDefault();

    if (window.umami) {
      window.umami.track('Upgrade to PRO', { source: 'upgrade_card' });
    }

    window.location.href = proLink;
  };

  const handleDismiss = (e) => {
    e.preventDefault();
    
    if (window.umami) {
      window.umami.track('Dismiss PRO Upgrade', { source: 'upgrade_card' });
    }

    setIsVisible(false);
    localStorage.setItem('upgradeProCardDismissed', 'true');
  };

  if (isSubscribed || !isVisible) return null;

  return (
    <div className="relative rounded-md bg-primary-100 border border-primary-200 hover:border-primary-500 text-primary-800 text-left">
      <div className="p-4 pt-3 pb-0 font-bold text-lg text-primary-800">
        Upgrade to Lift Oracle PRO
      </div>
      <div className="p-4 pt-2">
        <p className="text-sm font-medium">Subscribe to unlock all features and support on-going development of the platform.</p>
      </div>
      <ul className="px-4 text-sm font-medium leading-7 mb-6">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <div className="flex gap-2 p-4 pt-0">
        <button
          onClick={handleUpgrade}
          className="block grow text-center text-base rounded-full bg-primary-700 hover:bg-primary-500 text-white font-bold px-3 py-2"
        >
          Upgrade
        </button>
        <button
          onClick={handleDismiss}
          className="block grow text-center text-base rounded-full text-primary-700 hover:text-primary-800 bg-primary-300 hover:bg-primary-400 font-bold px-3 py-2"
        >
          Not now
        </button>
      </div>
    </div>
  );
};

export default UpgradeProCard;