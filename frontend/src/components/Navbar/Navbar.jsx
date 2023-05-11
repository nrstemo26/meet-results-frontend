import {useState, useEffect} from 'react'
import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'
import PropTypes from 'prop-types'

//need to import set sidebar open prop from app
//then need to pass into the mobile nave so that when its
//clicked we can actually do some shib


const Navbar = ({setIsSidebarOpen}) =>{
  
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

    // create an event listener
    useEffect(() => {
      window.addEventListener("resize", handleResize)
    })


    return(
        <div className='bg-primary-500 text-white flex justify-around p-4 shadow-md'>
            {isMobile? <MobileNav setIsSidebarOpen={setIsSidebarOpen}/> : <DesktopNav/>}
        </div>
    )
}

Navbar.propTypes ={
  setIsSidebarOpen : PropTypes.func

}

export default Navbar;