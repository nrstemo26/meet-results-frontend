import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LiftOracleLogo from '../../assets/lift_oracle_lo_res.svg'


function DesktopNav( {handleLogout} ) {
  const user = useSelector((state)=> state.auth.user)

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
        {/* <Link to="/query">
          <div>Query</div>
        </Link> */}
        <Link to="/about">
          <div>About</div>
        </Link>
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
