import { useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { getTrendingAthletes } from "../../features/athleteSlice";
import UserList from './UserList';
import PropTypes from 'prop-types';


function Trending({ isSession }){
    const [pageSize, setPageSize] = useState(20)
    const dispatch = useDispatch();
    const [athletes, setAthletes] = useState([])
    

    useEffect(()=>{
        const fetchUsers = async()=>{
            const athletes = (await dispatch(getTrendingAthletes({pageSize}))).payload
            //could need the .data depending on backend version
            // const athletes = (await dispatch(getTrendingAthletes({pageSize}))).payload.data
            setAthletes(athletes)
        }
        fetchUsers()
    },[dispatch,pageSize])
    

    return(
        <div className="shadow-lg m-2 p-4">
            <h1 className="text-lg text-primary-950 font-bold">Trending Athletes 🔥📈</h1>
            <UserList users={athletes} isSession={isSession}></UserList>
        </div>
    )
}

Trending.propTypes = {
  isSession: PropTypes.bool
};

export default Trending;