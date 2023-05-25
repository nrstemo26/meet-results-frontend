import {useDispatch} from 'react-redux'
import { getAllAthletes } from "../../redux/lifterSlice";
import { useEffect, useState } from "react";

function Trending(){
    const dispatch = useDispatch();
    const [athletes, setAthletes] = useState([])


    useEffect(()=>{
        const fetchUsers = async()=>{
            let athletes = (await dispatch(getAllAthletes())).payload.athletes
            athletes = athletes.splice(0,20);
            setAthletes(athletes)
        }
        fetchUsers()
    },[dispatch])


    return(
        <div>
                <h1>trending page</h1>
               {athletes.map((el)=>{
                return(
                    <div key={el}>{el}</div>
                )
               })}
        </div>
    )
}

export default Trending;