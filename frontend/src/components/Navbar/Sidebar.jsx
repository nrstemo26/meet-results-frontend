import { FiX } from "react-icons/fi";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({toggleMenu,  handleLogout}) =>{
  const user = useSelector((state)=> state.auth.user);


  return(
    <div className="absolute z-40 top-0 left-0 h-[120vh] w-full m-0 flex flex-col gap-3 bg-white text-black shadow-lg overflow-hidden text-primary-950">
      <FiX className="cursor-pointer self-end mt-4 mr-4" size={30} color= "black" onClick={toggleMenu}/>
      <Link onClick={toggleMenu} to='/'><div className='sidebar-element'>Home</div></Link>
      <Link onClick={toggleMenu} to='/api/v1/meets'><div className='sidebar-element'>Meets</div></Link>
      <Link onClick={toggleMenu} to='/api/v1/athletes'><div className='sidebar-element'>Lifters</div></Link>
      <Link onClick={toggleMenu} to='/api/v1/session'><div className='sidebar-element'>Session Builder</div></Link>
      <Link onClick={toggleMenu} to='/api/v1/insights'><div className='sidebar-element'>Insights</div></Link>
      <Link onClick={toggleMenu} to='/about'><div className='sidebar-element'>About Us</div></Link>
      {user ? (
        <>
          <Link onClick={toggleMenu} to="/account"><div className="sidebar-element">Account</div></Link>
          <button onClick={handleLogout}>Logout</button>
          {/* <button onClick={()=>dispatch(logout())}>Logout</button> */}
        </>
      ) : (
        <>
          <Link onClick={toggleMenu} to="/login"><div className="sidebar-element">Login</div></Link>
          <Link onClick={toggleMenu} to="/register"><div className="sidebar-element">Register</div></Link>
        </>
      )}
            
    </div>
  )
}

Sidebar.propTypes= {
  toggleMenu: PropTypes.func
}


export default Sidebar;

