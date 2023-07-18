import { useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { getOracleRatings } from "../../features/athleteSlice";
import UserList from './UserList';
import PropTypes from 'prop-types';


function OracleRatings({ isSession }){
    const [pageSize, setPageSize] = useState(20)
    const dispatch = useDispatch();
    const [oracles, setOracles] = useState([])
    

    useEffect(()=>{
        const fetchUsers = async()=>{
            // const oracles = (await dispatch(getTrendingAthletes({pageSize}))).payload
            //could need the .data depending on backend version
            const oracles = (await dispatch(getOracleRatings({pageSize}))).payload.data
            setOracles(oracles)
        }
        fetchUsers()
    },[dispatch,pageSize])
    console.log(oracles);

    return(
        <div className="shadow-lg m-2 p-4">
            <h1 className="text-lg text-primary-950 font-bold text-center">🧙‍♀️ Lift Oracle Leaderboard 🧙‍♂️</h1>
            <p className="text-sm text-center font-bold text-gray-700 border-b border-primary-100">All-Time</p>
            {/* <UserList users={oracles} isSession={isSession}></UserList> */}
        </div>
    )
}

OracleRatings.propTypes = {
  isSession: PropTypes.bool
};

export default OracleRatings;