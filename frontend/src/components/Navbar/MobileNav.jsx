import { useState } from "react"
import Sidebar from "./Sidebar"
import { FiMenu } from 'react-icons/fi'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";


//we dont use isLogged in just pass it around
function MobileNav({setIsSidebarOpen, handleLogout}){
    const [isOpen, setIsOpen] = useState(false)
    
   

    const toggleMenu = () => {
        setIsOpen(!isOpen)
        setIsSidebarOpen(curr => !curr)
    }

    return(
    <>
        {isOpen? <Sidebar toggleMenu={toggleMenu} handleLogout={handleLogout}/> :''}
        <div className="burger-menu z-50" onClick={toggleMenu}>
            {isOpen ? '' : <FiMenu className="cursor-pointer" size={30}/>}
        </div>

        <Link to='/'><div className=''>LIFT ORACLE</div></Link>
    </>
    )
}

MobileNav.propTypes = {
    setIsSidebarOpen : PropTypes.func
  
  }

export default MobileNav