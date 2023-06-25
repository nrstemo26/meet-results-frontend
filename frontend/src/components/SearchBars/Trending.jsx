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
            setAthletes(athletes)
        }
        fetchUsers()
    },[dispatch,pageSize])
    

    return(
        <div>
            <h1>trending page</h1>
            <UserList users={athletes} isSession={isSession}></UserList>
        </div>
    )
}

Trending.propTypes = {
  isSession: PropTypes.bool
};

export default Trending;