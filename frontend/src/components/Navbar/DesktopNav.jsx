import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LiftOracleLogo from '../../assets/lift_oracle_lo_res.svg';

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

  return (
    <>
      <Link to='/'>
        <div className=''>
          <img src={LiftOracleLogo} alt="Lift Oracle Logo" className="h-8 w-auto" />
        </div>
      </Link>

      <div className="flex gap-2">
        <Link to="/">
          <div>Home</div>
        </Link>
        
        
        <div className="relative" ref={toolsMenuRef}>
          <div className="cursor-pointer" onClick={toggleToolsMenu}>Start</div>
          {isToolsMenuOpen && (
            <div className="absolute z-10 mt-2 w-48 bg-white shadow-lg rounded-lg hover:rounded-lg overflow-hidden">
              <Link to="/meets" className="block px-4 py-2 text-primary-950 hover:bg-gradient-to-r hover:from-primary-400 hover:to-primary-50 hover:text-white hover:border-transparent shadow-sm" onClick={handleMenuItemClick}>
                <div>Meets</div>
              </Link>
              <Link to="/athletes" className="block px-4 py-2 text-primary-950 hover:bg-gradient-to-r hover:from-primary-400 hover:to-primary-50 hover:text-white hover:border-transparent shadow-sm" onClick={handleMenuItemClick}>
                <div>Lifters</div>
              </Link>
              <Link to="/watchlist" className="block px-4 py-2 text-primary-950 hover:bg-gradient-to-r hover:from-primary-400 hover:to-primary-50 hover:text-white hover:border-transparent shadow-sm" onClick={handleMenuItemClick}>
                <div>Watchlist</div>
              </Link>
              <Link to="/query" className="block px-4 py-2 text-primary-950 hover:bg-gradient-to-r hover:from-primary-400 hover:to-primary-50 hover:text-white hover:border-transparent shadow-sm" onClick={handleMenuItemClick}>
                <div>Query</div>
              </Link>
              <Link to="/weightlifting-gym-near-me" className="block px-4 py-2 text-primary-950 hover:bg-gradient-to-r hover:from-primary-400 hover:to-primary-50 hover:text-white hover:border-transparent shadow-sm" onClick={handleMenuItemClick}>GymFinder</Link>
              {/* Add more submenu items here if needed */}
            </div>
          )}
        </div>
        <Link to="/about">
          <div>About</div>
        </Link>
        <a href="https://milwaukeebarbell.com/collections/lift-oracle" data-umami-event="merch" target="_blank" rel="noopener noreferrer">
          <div>Merch</div>
        </a>
      </div>

      {user ? (
        // Show account button when user is logged in
        <div className="flex gap-2">
          <Link to="/account">
            <div>Account</div>
          </Link>
          <div className="cursor-pointer" onClick={handleLogout}>Logout</div>
        </div>
      ) : (
        // Show login/register buttons when user is not logged in
        <div className="flex gap-2">
          <Link to="/login">
            <div>Login</div>
          </Link>
          <Link to="/register">
            <div>Register</div>
          </Link>
        </div>
      )}
    </>
  );
}

export default DesktopNav;
