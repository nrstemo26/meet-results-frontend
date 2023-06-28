import {useState, useEffect} from 'react'
import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'
import PropTypes from 'prop-types'

const Navbar = ({setIsSidebarOpen, isLoggedIn, handleLogout}) =>{
  
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
        <div className='bg-gradient-to-r from-primary-950 to-cyan-700 text-white flex justify-around p-4 shadow-md'>
            {isMobile? <MobileNav setIsSidebarOpen={setIsSidebarOpen} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/> : <DesktopNav isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>}
        </div>
    )
}

Navbar.propTypes ={
  setIsSidebarOpen : PropTypes.func

}

export default Navbar;