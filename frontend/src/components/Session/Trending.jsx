import {useDispatch} from 'react-redux'
import { useEffect, useState } from "react";
import { getTrendingAthletes } from "../../redux/lifterSlice";
import UserList from '../SearchBars/UserList';

function Trending(){
    const dispatch = useDispatch();
    const [athletes, setAthletes] = useState([])


    useEffect(()=>{
        const fetchUsers = async()=>{
            let athletes = (await dispatch(getTrendingAthletes())).payload.data
            // if(athletes.length > 20){
                athletes = athletes.splice(0,20);
            // }
            setAthletes(athletes)
        }
        fetchUsers()
    },[dispatch])


    return(
        <div>
                <h1>trending page</h1>
                <UserList users={athletes}></UserList>
               {/* {athletes.map((el)=>{
                return(
                    <div key={el}>{el}</div>
                )
               })} */}
        </div>
    )
}

export default Trending;