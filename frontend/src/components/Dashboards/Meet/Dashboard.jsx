import Insights from './Insights'
import TopSinclairs from "./TopSinclairs";
// import AllTotals from "./AllTotals";
import { Spinner } from '../../../pages/Spinners/Spinner';
import { Error } from '../../../pages/Error';

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getMeet } from '../../../features/meetSlice'
import ChartWrapper from './ChartWrapper';



const MeetDashboard = () => {
  const [requestSent, setRequestSent] = useState(false)
  const dispatch = useDispatch();
  const {data, isLoading, isError, isSuccess, message} = useSelector( (state) => state.meet )
  
  useEffect(()=>{
    if(isError){
      console.log('there is an error')
    }
    const getMeetData = async()=>{
      const urlArray = window.location.pathname.split('/')
      const meetName = urlArray[urlArray.length - 1]
      if(meetName != 'meets'){
        console.log('getting meet')
        dispatch(getMeet(meetName))
      }

    }
    if(!requestSent){
      getMeetData()
      setRequestSent(true)

    }
  },[dispatch, isError, isSuccess, message, requestSent])
  
  if(isLoading){
    return <Spinner/>
  }
  if(isError){
    return <Error/>
  }

    return (
      
      <div className='dashboard-container'>
          <div className='bg-secondary-500 p-5 rounded-xl'>
            <h1 className="text-center text-primary-950 text-2xl font-bold m-2">{data ? data['headline']['_metadata']['Meet'] : 'loading'}</h1>
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
              <TopSinclairs />
              <Insights />
            </>
          ):
          'no data'
          }
        </div>
      </div>
    )
  }
  
  export default MeetDashboard;
  