import Insights from '../MeetDashboard/Insights'
import LifterChart from "./LifterChart";
import BestLifts from "./BestLits";
import AllTotals from "./AllTotals";

import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {getAthlete} from '../../../redux/lifterSlice'

function LifterDashboard(){
  
  const [id, setId] = useState('');
  const [meetHistory, setMeetHistory] = useState(null)
  const [stats, setStats] = useState(null)
  const dispatch = useDispatch();

  useEffect(()=>{
    const getUserData = async()=>{
      const {_athlete_id, meet_history, stats} = (await dispatch(getAthlete(window.location.pathname))).payload
      const data = (await dispatch(getAthlete(window.location.pathname))).payload
      console.log(data)
      setId(_athlete_id)
      setMeetHistory(meet_history)
      setStats(stats)
      // console.log('stats',stats)
      // console.log('history',meet_history)
    }
    getUserData()
  },[dispatch])

    
    return (
      <>
          <div className='bg-secondary-500 p-5 rounded-xl'>
            <h1 className="text-center text-2xl font-bold">{id ? id : 'loading'} Dashboard</h1>
            {/* <h1 className="text-center text-2xl font-bold">John Bars Lifter Dashboard</h1> */}
            <LifterChart/>
          </div>

        
        <div className="my-2 flex flex-wrap gap-2 justify-evenly">
          <BestLifts stats={stats} />
          <AllTotals meetHistory={meetHistory}/>
          <Insights />
        </div>
      </>
    )
  }
  
  export default LifterDashboard;
  