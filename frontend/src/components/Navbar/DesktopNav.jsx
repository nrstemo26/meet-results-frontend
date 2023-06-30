import { useState } from 'react';
import { Link } from 'react-router-dom';

function DesktopNav( {isLoggedIn, handleLogout} ) {

  return (
    <>
      <Link to='/'><div className=''>LIFT ORACLE</div></Link>

      <div className="flex gap-2">
        <Link to="/">
          <div>Home</div>
        </Link>
        <Link to="/api/v1/meets">
          <div>Meets</div>
        </Link>
        <Link to="/api/v1/athletes">
          <div>Lifters</div>
        </Link>
        <Link to="/api/v1/session">
          <div>Session Builder</div>
        </Link>
        <Link to="/api/v1/insights">
          <div>Insights</div>
        </Link>
      </div>

      {isLoggedIn ? (
        // Show account button when user is logged in
        <div className="flex gap-2">
          <Link to="/account">
            <div>Account</div>
          </Link>
          <button onClick={handleLogout}>Logout</button>
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
