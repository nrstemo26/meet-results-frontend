import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";

import { getTrendingAthletes } from "../../features/athleteSlice";
import UserList from './UserList';
import PropTypes from 'prop-types';


function Trending({ isWatchlist }){
    const dispatch = useDispatch();
    const [pageSize, setPageSize] = useState(20)
    const trendingAthletes = useSelector((state)=> state.athlete.trendingAthletes)
    

    useEffect(()=>{
        const fetchUsers = async () => {
            // const athletes = (await dispatch(getTrendingAthletes({pageSize}))).payload
            // could need the .data depending on backend version
            await dispatch(getTrendingAthletes({pageSize}))
            
        }
        fetchUsers()
    },[dispatch,pageSize])
    

    return(
        <div className="shadow-lg m-2 p-4">
            <h1 className="text-lg text-primary-950 font-bold text-center">Trending Athletes 🔥📈</h1>
            <p className="text-sm text-center font-bold text-gray-700 border-b border-primary-100">Last 24 Hours</p>
            <UserList users={trendingAthletes} isWatchlist={isWatchlist}></UserList>
        </div>
    )
}

Trending.propTypes = {
  isWatchlist: PropTypes.bool
};

export default Trending;