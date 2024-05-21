import Insights from './Insights'
import BestLifts from "./BestLits";
import AllTotals from "./AllTotals";
import { Spinner } from '../../../pages/Spinners/Spinner';
import { Error } from '../../../pages/Error';

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getAthlete } from '../../../features/athleteSlice'
import { removeFromWatchlist,addToWatchlist } from '../../../features/watchlistSlice';
import { useNavigate } from 'react-router-dom'
import { updateMetaTags } from '../../../lib/seo_utils';
import ChartWrapper from './ChartWrapper';

import MakeRateDonut from './charts/MakeRateDonut';

import { toast } from 'react-toastify'
import WatchlistBtn from './WatchlistBtn';
import WatchlistIcon from './WatchlistIcon';
import SnMakeRateDonut from './charts/MakeRateDonut';


const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [requestSent, setRequestSent] = useState(false)
  const watchlist = useSelector((state) => state.watchlist.athletes)
  const {data, isLoading, isError, isSuccess, message} = useSelector( (state) => state.athlete  )

  
  const pageTitle = data ? `${data['_athlete_id']} - Lift Oracle`: 'Lift Oracle';
  const descriptionContent = data ? `Olympic weightlifting competition history and statistics for ${data['_athlete_id']}. Snatch, clean and jerk, total, sinclair, completion percentages, and more.`: 'Loading athlete information';

  const [inWatchlist, setInWatchlist]= useState(()=>{
    const urlArray = window.location.pathname.split('/')
    const name = urlArray[urlArray.length - 1].split('%20').join(' ')
    return watchlist.includes(name)
  })

  const toggleWatchlist = async () =>{
    const name = data['_athlete_id']
      const toastOptions = {
        autoClose:3000,
        onClick:() => {
          navigate('/watchlist')
        }
      }
  
      if(inWatchlist){
        await dispatch(removeFromWatchlist(name))
        toast(`${name} was removed to your watchlist. Click here to see your watchlist`, toastOptions)
      }else{
        await dispatch(addToWatchlist(name))
        toast(`${name} was added to your watchlist.  Click here to see your watchlist`, toastOptions)
      }
      setInWatchlist(state=> !state)
  }
  
  
  useEffect(() => {
    if(isError){
      console.log('there is an error')
    }
    const getUserData = async()=>{
      const urlArray = window.location.pathname.split('/')
      const athleteName = urlArray[urlArray.length - 1]
      if(athleteName != 'athletes'){
        console.log('getting athlete')
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
  },[dispatch, isError, isSuccess, message, requestSent,])
  
  if(isLoading){
    return <Spinner/>
  }
  if(isError){
    return <Error/>
  }

    return (
      <div className='dashboard-container'>
        {updateMetaTags(pageTitle, descriptionContent)}
        <div className='bg-secondary-500 p-5 rounded-xl'>
            {data ? <WatchlistIcon name={data['_athlete_id']} toggleWatchlist={toggleWatchlist} inWatchlist={inWatchlist}/>: 'loading'}
            {/* <h1 className="text-center text-primary-950 text-4xl font-bold m-2">
              {data ? data['_athlete_id'] : 'loading'} 
            </h1> */}
            {
              data?
              (<ChartWrapper toggleWatchlist={toggleWatchlist} inWatchlist={inWatchlist} name={data['_athlete_id']}/>):
              <div>nothing</div>
            }

    
          </div>

        
        <div className="my-2 flex flex-wrap gap-2 justify-evenly">
          { data ?
          (
            <>
              <MakeRateDonut data={data.advanced_stats.Snatch} />
              <MakeRateDonut data={data.advanced_stats["C&J"]} exercise={'C&J'}/>
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
  