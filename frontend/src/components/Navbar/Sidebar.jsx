import { FiX } from "react-icons/fi";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";


const Sidebar = ({toggleMenu}) =>{
    return(
        <div className="absolute z-40 top-0 left-0 h-[120vh] w-full m-0 flex flex-col gap-3 bg-white text-black shadow-lg overflow-hidden">
            <FiX className="cursor-pointer self-end mt-4 mr-4" size={30} color= "black" onClick={toggleMenu}/>
            <Link onClick={toggleMenu} to='/'><div className='sidebar-element'>Home</div></Link>
            <Link onClick={toggleMenu} to='/api/v1/meets'><div className='sidebar-element'>Meets</div></Link>
            <Link onClick={toggleMenu} to='/api/v1/athletes'><div className='sidebar-element'>Lifters</div></Link>
            <Link onClick={toggleMenu} to='/api/v1/insights'><div className='sidebar-element'>Insights</div></Link>
            <Link onClick={toggleMenu} to='/about'><div className='sidebar-element'>About Us</div></Link>
            <Link onClick={toggleMenu} to='/login'><div className='sidebar-element'>Login/Sign Up</div></Link>
            
        </div>
    )
}

Sidebar.propTypes= {
    toggleMenu: PropTypes.func
}


export default Sidebar;

