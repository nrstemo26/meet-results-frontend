import LifterDashboard from "./LifterDashboard/LifterDashboard";
import MeetDashboard from "./MeetDashboard/MeetDashboard";
import PropTypes from 'prop-types'


const Dashboard = ({showMeet})=>{

    return(
        <div className="p-2 m-2 overflow-hidden shadow-lg lg:w-[80%] lg:m-auto">
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