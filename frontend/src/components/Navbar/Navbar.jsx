import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { useViewport } from '../../hooks/useViewport'


const Navbar = ({setIsSidebarOpen}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width } = useViewport();
  

  const handleLogout = () => {  
    dispatch(logout())
    navigate('/login')
    // localStorage.removeItem('token');
    // setIsLoggedIn(prevIsLoggedIn => !prevIsLoggedIn);
    // window.location.href = '/login';
  };

    return(
        <div className='bg-gradient-to-r from-primary-950 to-primary-500 text-white flex justify-around p-4 shadow-md'>
            {width < 720 ?
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