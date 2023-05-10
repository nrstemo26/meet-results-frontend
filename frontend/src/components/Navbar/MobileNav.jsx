import { useState } from "react"
import Sidebar from "./Sidebar"
import {FiMenu } from 'react-icons/fi'

function MobileNav(){
    const [isOpen, setIsOpen] = useState(false)
    
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return(
    <>
        {isOpen? <Sidebar toggleMenu={toggleMenu}/> :''}
        <div className="burger-menu z-50" onClick={toggleMenu}>
            {isOpen ? '' : <FiMenu className="cursor-pointer" size={30}/>}
        </div>

        <div>Site Name + img</div>   
    </>
    )
}

export default MobileNav