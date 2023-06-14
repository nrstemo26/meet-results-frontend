import {useDispatch} from 'react-redux'
import { useEffect, useState } from "react";
import { getTrendingAthletes } from "../../features/lifterSlice";
import UserList from '../SearchBars/UserList';


function Trending({isSession}){
    const dispatch = useDispatch();
    const [athletes, setAthletes] = useState([])


    useEffect(()=>{
        const fetchUsers = async()=>{
            let athletes = (await dispatch(getTrendingAthletes())).payload.data
            athletes = athletes.splice(0,20);
            setAthletes(athletes)
        }
        fetchUsers()
    },[dispatch])


    return(
        <div>
            <h1>trending page</h1>
            <UserList users={athletes} isSession={isSession}></UserList>
        </div>
    )
}

export default Trending;