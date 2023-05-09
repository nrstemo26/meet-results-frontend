import {useState, useEffect} from 'react'
import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'

const Navbar = () =>{
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
            {isMobile? <MobileNav/> : <DesktopNav/>}
        </div>
    )
}

export default Navbar;