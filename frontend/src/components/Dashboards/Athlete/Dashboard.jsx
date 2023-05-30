import Insights from '../Meet/Insights'
import AthleteChart from "./AthleteChart";
import BestLifts from "./BestLits";
import AllTotals from "./AllTotals";

import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {getAthlete} from '../../../features/lifterSlice'

const Dashboard = ()=>{
  
  const [id, setId] = useState('');
  const [meetHistory, setMeetHistory] = useState(null)
  const [stats, setStats] = useState(null)
  const dispatch = useDispatch();

  useEffect(()=>{
    const getUserData = async()=>{
      const {_athlete_id, meet_history, stats} = (await dispatch(getAthlete(window.location.pathname))).payload
      // const data = (await dispatch(getAthlete(window.location.pathname))).payload
      // console.log(data)

      setId(_athlete_id)
      setMeetHistory(meet_history)
      setStats(stats)
    }
    getUserData()
  },[dispatch])

    
    return (
      <div className='dashboard-container'>
      {/* // <div className='dashboard-container'> */}
          <div className='bg-secondary-500 p-5 rounded-xl'>
            <h1 className="text-center text-2xl font-bold">{id ? id : 'loading'} Dashboard</h1>
            <AthleteChart/>
          </div>

        
        <div className="my-2 flex flex-wrap gap-2 justify-evenly">
          <BestLifts stats={stats} />
          <AllTotals meetHistory={meetHistory}/>
          <Insights />
        </div>
      </div>
    )
  }
  
  export {Dashboard};
  