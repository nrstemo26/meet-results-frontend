import React, { useState } from 'react';
import { FiX } from "react-icons/fi";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({toggleMenu,  handleLogout}) =>{
  const user = useSelector((state)=> state.auth.user);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);

  const toggleToolsMenu = () => {
    setIsToolsMenuOpen(!isToolsMenuOpen);
  };


  return(
    <div className="absolute z-40 top-0 left-0 h-[120vh] w-full m-0 flex flex-col gap-3 bg-white text-black shadow-lg overflow-hidden text-primary-950">
      <FiX className="cursor-pointer self-end mt-4 mr-4" size={30} color= "black" onClick={toggleMenu}/>
      <Link onClick={toggleMenu} to='/'><div className='sidebar-element'>Home</div></Link>
      <div className='sidebar-element cursor-pointer' onClick={toggleToolsMenu}>Start</div>
      {isToolsMenuOpen && (
        <div className="ml-4 flex flex-col">
          <Link onClick={toggleMenu} to='/meets'><div className='sidebar-element'>Meets</div></Link>
          <Link onClick={toggleMenu} to='/athletes'><div className='sidebar-element'>Lifters</div></Link>
          <Link onClick={toggleMenu} to='/watchlist'><div className='sidebar-element'>Watchlist</div></Link>
          <Link onClick={toggleMenu} to='/query'><div className='sidebar-element'>Query</div></Link>
          <Link onClick={toggleMenu} to='/weightlifting-gym-near-me'><div className='sidebar-element'>GymFinder</div></Link>
          {/* Add more submenu items here if needed */}
        </div>
      )}
      <Link onClick={toggleMenu} to='/about'><div className='sidebar-element'>About</div></Link>
      <a href="https://www.milwaukeebarbell.com/gear?tag=oracle" data-umami-event="merch" target="_blank" rel="noopener noreferrer">
        <div className='sidebar-element'>Merch</div>
      </a>
      {user ? (
        <>
          <Link onClick={toggleMenu} to="/account"><div className="sidebar-element">Account</div></Link>
          <button className="text-primary-950 hover:text-primary-400" onClick={handleLogout}>Logout</button>
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

