import { FiX } from "react-icons/fi";
import PropTypes from 'prop-types'


const Sidebar = ({toggleMenu}) =>{
    return(
        <div className="absolute z-40 top-0 left-0 h-[120vh] w-full m-0 flex flex-col gap-3 bg-white text-black shadow-lg overflow-hidden">
            <FiX className="cursor-pointer self-end mt-4 mr-4" size={30} color= "black" onClick={toggleMenu}/>
            <a href="#" className="sidebar-element">Home</a>
            <a href="#" className="sidebar-element ">Meets</a>
            <a href="#" className="sidebar-element ">Lifters</a>
            <a href="#" className="sidebar-element">Insights</a>
            <a href="#" className="sidebar-element">About Us</a>
            <a href="#" className="sidebar-element">Login/Sign Up</a>
        </div>
    )
}

Sidebar.propTypes= {
    toggleMenu: PropTypes.func
}


export default Sidebar;

