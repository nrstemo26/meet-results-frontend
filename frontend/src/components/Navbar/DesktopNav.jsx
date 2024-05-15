import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LiftOracleLogo from '../../assets/lift_oracle_lo_res.svg'


function DesktopNav( {handleLogout} ) {
  const user = useSelector((state)=> state.auth.user)
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);

  const toggleToolsMenu = () => {
    setIsToolsMenuOpen(!isToolsMenuOpen);
  };

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
        <Link to="/meets">
          <div>Meets</div>
        </Link>
        <Link to="/athletes">
          <div>Lifters</div>
        </Link>
        <Link to="/watchlist">
          <div>Watchlist</div>
        </Link>
        <Link to="/query">
          <div>Query</div>
        </Link>
        <Link to="/about">
          <div>About</div>
        </Link>
        <a href="https://www.milwaukeebarbell.com/gear?tag=oracle" data-umami-event="merch" target="_blank" rel="noopener noreferrer">
          <div>Merch</div>
        </a>
        <div className="relative">
          <div className="cursor-pointer" onClick={toggleToolsMenu}>Tools</div>
          {isToolsMenuOpen && (
            <div className="absolute z-10 mt-2 w-48 bg-white shadow-lg mt-2">
              <Link to="/weightlifting-gym-near-me" className="block px-4 py-2 text-gray-800 hover:bg-primary-200">GymFinder</Link>
              {/* Add more submenu items here if needed */}
            </div>
          )}
        </div>
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
