import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import {getAthlete} from "../../features/lifterSlice"
import {FiArrowDown, FiArrowUp} from 'react-icons/fi'
import { organizeByDate, renderSessionResults } from '../../lib/date_utils';

function SessionAthlete({ name }){
    const [areMeetsVisible, setAreMeetsVisible] = useState(false)
    const [meetHistory, setMeetHistory] = useState(null)
    const [stats, setStats] = useState(null)
    const dispatch = useDispatch();
    
    useEffect(()=>{
      const getUserData = async()=>{
        const {meet_history, stats} = (await dispatch(getAthlete('/api/v1/athlete/'+name))).payload
        setMeetHistory(meet_history)
        setStats(stats)
      }
      getUserData()
    },[dispatch, name])

    
    const toggleMeetHistory = () => setAreMeetsVisible((curr)=>!curr)
    
    return(
        <div className='border-2 border-primary-800 m-2 p-2'>
            <h1>{name}</h1>
            {stats? <div>Comp Prs: {stats["Best Snatch"]}/{stats["Best C&J"]}/{stats["Best Total"]}</div>
            : 'loading stats'}

            <div className='flex justify-between' onClick={()=>toggleMeetHistory()}>
                {areMeetsVisible ? 
                (<><div>hide last 5 meets</div><FiArrowUp/></>) : (<><div>show last 5 meets</div><FiArrowDown/></>)}
            </div>
            {areMeetsVisible && meetHistory ? renderSessionResults(organizeByDate(meetHistory), meetHistory) :''}
        </div>
    )
}

export default SessionAthlete;