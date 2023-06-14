import { useDispatch,useSelector} from 'react-redux'
import { useEffect, useState } from "react";
import { getTrendingAthletes } from "../../features/athleteSlice";
import UserList from '../SearchBars/UserList';
import PropTypes from 'prop-types';


function Trending({ isSession }){
    const dispatch = useDispatch();

    const fooathletes = useSelector((state)=>{
        return state.session.athletes
    })
    console.log(fooathletes)

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

Trending.propTypes = {
  isSession: PropTypes.bool
};

export default Trending;