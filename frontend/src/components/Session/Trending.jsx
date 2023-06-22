import {useDispatch} from 'react-redux'
import { useEffect, useState } from "react";
import { getTrendingAthletes } from "../../features/lifterSlice";
import UserList from '../SearchBars/UserList';

function Trending(){
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
      <div className="shadow m-2 w-1/3 justify-center">
        <h1 className="text-l">
            Trending Athletes
            <span role="img" aria-label="Bearded Wizard" className="text-xl">📈</span>
        </h1>
        <UserList users={athletes}></UserList>
      </div>
    )
}

export default Trending;