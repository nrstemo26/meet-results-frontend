import {useState, useEffect} from 'react'
import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";


const Navbar = ({setIsSidebarOpen}) =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {  
    dispatch(logout())
    navigate('/login')
    // localStorage.removeItem('token');
    // setIsLoggedIn(prevIsLoggedIn => !prevIsLoggedIn);
    // window.location.href = '/login';
  };



  const [isMobile, setIsMobile] = useState(()=>{
    if (window.innerWidth < 720) return true; 
    return false;
  })
    //choose the screen size 
  const handleResize = () => {
    if (window.innerWidth < 720) {
        setIsMobile(true) 
    }else{
        setIsMobile(false)
    }
  }

    useEffect(() => {
      window.addEventListener("resize", handleResize)
    })


    return(
        <div className='bg-gradient-to-r from-primary-950 to-primary-500 text-white flex justify-around p-4 shadow-md'>
            {isMobile? 
            (<MobileNav setIsSidebarOpen={setIsSidebarOpen} handleLogout={handleLogout}/>) 
            : 
            (<DesktopNav handleLogout={handleLogout}/>)
            }
        </div>
    )
}

Navbar.propTypes ={
  setIsSidebarOpen : PropTypes.func

}

export default Navbar;