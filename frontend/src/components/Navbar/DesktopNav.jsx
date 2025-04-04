import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LiftOracleLogo from '../../assets/lift_oracle_lo_res.svg';
import { FiChevronDown, FiUsers, FiCalendar, FiList, FiSearch, FiMapPin } from 'react-icons/fi';

function DesktopNav({ handleLogout }) {
  const user = useSelector((state) => state.auth.user);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const toolsMenuRef = useRef(null);

  const toggleToolsMenu = () => {
    setIsToolsMenuOpen(!isToolsMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target)) {
      setIsToolsMenuOpen(false);
    }
  };

  const handleMenuItemClick = () => {
    setIsToolsMenuOpen(false);
  };

  useEffect(() => {
    if (isToolsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isToolsMenuOpen]);

  const menuItems = [
    { to: '/meets', label: 'Meets', icon: <FiCalendar className="w-4 h-4" /> },
    { to: '/athletes', label: 'Lifters', icon: <FiUsers className="w-4 h-4" /> },
    { to: '/watchlist', label: 'Watchlist', icon: <FiList className="w-4 h-4" /> },
    { to: '/query', label: 'Query', icon: <FiSearch className="w-4 h-4" /> },
    { to: '/weightlifting-gym-near-me', label: 'GymFinder', icon: <FiMapPin className="w-4 h-4" /> },
  ];

  return (
    <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4">
      <Link to='/' className="flex-shrink-0">
        <img src={LiftOracleLogo} alt="Lift Oracle Logo" className="h-8 w-auto" />
      </Link>

      <div className="flex items-center space-x-6">
        <Link to="/" className="text-white hover:text-primary-200 transition-colors">
          Home
        </Link>
        
        <div className="relative" ref={toolsMenuRef}>
          <button 
            onClick={toggleToolsMenu}
            className="flex items-center space-x-1 text-white hover:text-primary-200 transition-colors"
          >
            <span>Stats</span>
            <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${isToolsMenuOpen ? 'transform rotate-180' : ''}`} />
          </button>
          
          <div 
            className={`absolute z-10 mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200 transform origin-top ${
              isToolsMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
            }`}
          >
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                onClick={handleMenuItemClick}
              >
                <span className="text-gray-400 group-hover:text-primary-500">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <Link to="/about" className="text-white hover:text-primary-200 transition-colors">
          About
        </Link>
        
        <a 
          href="https://milwaukeebarbell.com/collections/lift-oracle" 
          data-umami-event="merch" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-primary-200 transition-colors"
        >
          Merch
        </a>
      </div>

      <div className="flex items-center space-x-6">
        {user ? (
          <>
            <Link to="/account" className="text-white hover:text-primary-200 transition-colors">
              Account
            </Link>
            <button 
              onClick={handleLogout}
              className="text-white hover:text-primary-200 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-primary-200 transition-colors">
              Login
            </Link>
            <Link to="/register" className="text-white hover:text-primary-200 transition-colors">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default DesktopNav;
