import { FiX } from "react-icons/fi";
import PropTypes from 'prop-types'


const Sidebar = ({toggleMenu}) =>{
    return(
        <div className="absolute z-40 top-0 left-0 h-screen w-48 m-0 flex flex-col gap-3 bg-white text-black shadow-lg">
            <FiX className="pointer self-end mt-4 mr-4" size={30} color= "black" onClick={toggleMenu}/>
            <i className="mx-4  border-b-2 border-primary-300">Home</i>
            <i className="mx-4  border-b-2 border-primary-300 ">Meets</i>
            <i className="mx-4  border-b-2 border-primary-300 ">Lifters</i>
            <i className="mx-4 border-b-2 border-primary-300 ">Insights</i>
            <i className="mx-4 border-b-2 border-primary-300 ">About Us</i>
            <i className="mx-4 border-b-2 border-primary-300 ">Login/Sign Up</i>
        </div>
    )
}

Sidebar.propTypes= {
    toggleMenu: PropTypes.func
}


export default Sidebar;

