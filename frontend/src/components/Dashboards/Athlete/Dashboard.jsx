import Insights from './Insights'
import BestLifts from "./BestLits";
import AllTotals from "./AllTotals";
import { Spinner } from '../../../pages/Spinner';
import { Error } from '../../../pages/Error';

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAthlete } from '../../../features/athleteSlice'
import ChartWrapper from './ChartWrapper';



const Dashboard = () => {
  const [requestSent, setRequestSent] = useState(false)
  const dispatch = useDispatch();
  const {data, isLoading, isError, isSuccess, message} = useSelector( (state) => state.athlete  )

  
  useEffect(()=>{
    if(isError){
      console.log('there is an error')
    }
    const getUserData = async()=>{
      const urlArray = window.location.pathname.split('/')
      const athleteName = urlArray[urlArray.length - 1]
      if(athleteName != 'athletes'){
        dispatch(getAthlete(athleteName))
      }
      // const {_athlete_id, meet_history, stats} = (await dispatch(getAthlete(athleteName))).payload
      
      
      // setId(_athlete_id)
      // setMeetHistory(meet_history)
      // setStats(stats)
    }
    if(!requestSent){
      getUserData()
      setRequestSent(true)
    }
  },[dispatch, isError, isSuccess, message, requestSent])
  
  if(isLoading){
    return <Spinner/>
  }
  if(isError){
    return <Error/>
  }
    console.log(data);
    return (
      
      <div className='dashboard-container'>
          <div className='bg-secondary-500 p-5 rounded-xl'>
            <h1 className="text-center text-primary-950 text-4xl font-bold m-2">{data ? data['_athlete_id'] : 'loading'}</h1>
            {
              data?
              (<ChartWrapper/>):
              'nothing'
            }
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
  