// import { useState } from "react";
import LifterDashboard from "./LifterDashboard/LifterDashboard";
import MeetDashboard from "./MeetDashboard/MeetDashboard";
import PropTypes from 'prop-types'


const Dashboard = ({showMeet})=>{
    return(
        <div>
            {showMeet ? 
            <MeetDashboard /> :
            <LifterDashboard/> }
        </div>
    )


}


Dashboard.propTypes = {
    showMeet: PropTypes.bool
}

export default Dashboard;