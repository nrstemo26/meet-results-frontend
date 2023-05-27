// import { useState } from 'react';
import { Link } from 'react-router-dom'


function DesktopNav() {
    return (
    <>
        {/* <div className="bg-orange-800 text-white flex justify-between p-4"> */}
            <div className="flex gap-2">
               <Link to="/">
                <div>Home</div>
                </Link> 
               <Link to="/api/v1/meets">
                <div>Meets</div>
                </Link> 
               <Link to="/api/v1/athletes">
                <div>Lifters</div>
                </Link> 
               <Link to="/api/v1/session">
                <div>Session Builder</div>
                </Link> 
               <Link to="/api/v1/insights">
                <div>Insights</div>
                </Link> 
            </div>
            
            <div>
                Site Name + img
            </div>

            <div>
                <Link to='/login'>
                    <div>Login/Register</div>
                </Link>
            </div>
        {/* </div> */}
    </>
    )
  }
  
export default DesktopNav;
  