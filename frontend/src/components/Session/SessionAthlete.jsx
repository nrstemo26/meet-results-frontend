import { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import {getAthlete} from "../../redux/lifterSlice"
import BestLifts from '../Dashboards/LifterDashboard/BestLits';
import {FiArrowDown} from 'react-icons/fi'
import { organizeByDate, renderSessionResults } from '../../utilities/date_utils';

function SessionAthlete({name }){
    const [areMeetsVisible, setAreMeetsVisible] = useState(false)
    const [meetHistory, setMeetHistory] = useState(null)
    const [stats, setStats] = useState(null)
    const dispatch = useDispatch();
    
    useEffect(()=>{
      const getUserData = async()=>{
        const {meet_history, stats} = (await dispatch(getAthlete('/api/v1/athlete/'+name))).payload
        const data = (await dispatch(getAthlete('/api/v1/athlete/'+name))).payload
        console.log(data)
        setMeetHistory(meet_history)
        setStats(stats)
      // console.log('stats',stats)
      // console.log('history',meet_history)
      }
      getUserData()
    },[dispatch])

    const renderResults = (arr) => {
        return arr.map((meet,index)=>{
            if(index > 4){
                return 
            }else{
            let meetData = meetHistory[meet]
            let [day, month, year] = meetData["Date"].split(' ').slice(1,4)
            return (
            <div className="flex justify-evenly border-2 border-primary-400 p-4 my-2" key={meet}>    
                <div>
                    <div>{month}/{day}/{year}</div>
                    <div>Best Lifts:{meetData["Best Snatch"]}/{meetData["Best C&J"]}/{meetData["Total"]}</div>
                </div>
                <div>
                    <div>Sn: {meetData["Snatch Lift 1"]}/{meetData["Snatch Lift 2"]}/{meetData["Snatch Lift 3"]}</div>
                    <div>CJ: {meetData["C&J Lift 1"]}/{meetData["C&J Lift 2"]}/{meetData["C&J Lift 3"]}</div>
                </div>
            </div>
            )
            }
        })
    }
    const toggleMeetHistory = ()=>{
        setAreMeetsVisible((curr)=>!curr)
    }
    
    return(
        <div className='border-2 border-primary-800 m-2 p-2'>
            <h1>{name}</h1>
            {stats? <div>Comp Prs: {stats["Best Snatch"]}/{stats["Best C&J"]}/{stats["Best Total"]}</div>
            : 'loading stats'}

            <div className='flex justify-between' onClick={()=>toggleMeetHistory()}>
                <div>last 5 meets</div>
                <FiArrowDown/>
            </div>
            {areMeetsVisible && meetHistory ? renderSessionResults(organizeByDate(meetHistory), meetHistory) :''}
        </div>
    )
}

export default SessionAthlete;