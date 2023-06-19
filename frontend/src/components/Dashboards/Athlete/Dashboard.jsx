import Insights from '../Meet/Insights'
import AthleteChart from "./AthleteChart";
import BestLifts from "./BestLits";
import AllTotals from "./AllTotals";
import { Spinner } from '../../../pages/Spinner';
import { Error } from '../../../pages/Error';

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAthlete } from '../../../features/athleteSlice'



let urlArray = window.location.pathname.split('/')
let athleteName = urlArray[urlArray.length - 1]


const Dashboard = ()=>{
  const dispatch = useDispatch();
  const {data, isLoading, isError, isSuccess, message} = useSelector( (state) => state.athlete  )
  
  
  useEffect(()=>{
    console.log('in use effect')
    if(isError){
      console.log('there is an error')
    }
    const getUserData = async()=>{
      dispatch(getAthlete(athleteName))
      // const {_athlete_id, meet_history, stats} = (await dispatch(getAthlete(athleteName))).payload
      
      
      // setId(_athlete_id)
      // setMeetHistory(meet_history)
      // setStats(stats)
    }
    getUserData()
  },[dispatch, isError, isSuccess, message ])
  
  if(isLoading){
    return <Spinner/>
  }
  if(isError){
    return <Error/>
  }
  
    return (
      <div className='dashboard-container'>
          <div className='bg-secondary-500 p-5 rounded-xl'>
            <h1 className="text-center text-2xl font-bold">{data ? data['_athlete_id'] : 'loading'} Dashboard</h1>
            {/* <h1 className="text-center text-2xl font-bold">{id ? id : 'loading'} Dashboard</h1> */}
            <AthleteChart/>
          </div>

        
        <div className="my-2 flex flex-wrap gap-2 justify-evenly">
          { data ?
          (
            <>
              <BestLifts />
              <AllTotals />
              <Insights />
            </>
          ):
          'no data'
          }
        </div>
      </div>
    )
  }
  
  export {Dashboard};
  