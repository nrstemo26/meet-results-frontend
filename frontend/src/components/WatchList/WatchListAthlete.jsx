import { useState, useEffect } from 'react'
import { organizeByNewestDate, renderWatchlistResults } from '../../lib/date_utils';

import { useDispatch } from "react-redux";
import { removeFromWatchlist } from '../../features/watchlistSlice';
import { getAthlete } from "../../features/athleteSlice"

import { FiArrowDown, FiArrowUp } from 'react-icons/fi'
import { TiDeleteOutline } from 'react-icons/ti'

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


function WatchListAthlete({ name }){
  const [areMeetsVisible, setAreMeetsVisible] = useState(false)
  const [meetHistory, setMeetHistory] = useState(null)
    const [stats, setStats] = useState(null)
    const dispatch = useDispatch();
    
    useEffect(()=>{
      const getUserData = async()=>{
        const {meet_history, stats} = (await dispatch(getAthlete(name))).payload
        setMeetHistory(meet_history)
        setStats(stats)
      }
      getUserData()
    },[dispatch, name])
    
    
    const toggleMeetHistory = () => setAreMeetsVisible((curr)=>!curr)
    
    const handleDelete = (e) =>{
      dispatch(removeFromWatchlist(e.target.parentNode.firstChild.textContent))
    }
    
    return(
      <div className='shadow-lg m-2 p-4'>
        <div className='flex justify-between'>
          <h1 className='text-xl font-bold text-primary-950'>{name}</h1>
          <TiDeleteOutline className='cursor-pointer'  size={'22px'} onClick={(e)=> handleDelete(e)}/>
        </div>

        {
        stats? 
        <div className="text-gray-400">Comp PRs (Snatch/C&J/Total): <div className="font-mono text-gray-700 text-xl p-1">{stats["Best Snatch"]}/{stats["Best C&J"]}/{stats["Best Total"]}kg</div></div>
        : 
        'loading stats'
      }

        <div onClick={()=>toggleMeetHistory()}>
            {
              areMeetsVisible ? 
               (<><div className='cursor-pointer text-sm pb-4 text-primary-400 hover:text-primary-950'>Hide last 5 meets</div><FiArrowUp/></>) 
              :
              (<><div className='cursor-pointer text-sm pb-4 text-primary-400 hover:text-primary-950'>Show last 5 meets</div><FiArrowDown/></>)
            }
        </div>
      
        {
          areMeetsVisible && meetHistory ? 
          renderWatchlistResults(organizeByNewestDate(meetHistory), meetHistory) 
          :
          ''
        }
        
        <Link to={`/athlete/${name}`} className='btn border-2 p-1 m-4 text-primary-950 border-primary-950 hover:bg-gradient-to-r hover:from-primary-950 hover:to-primary-400 hover:text-white hover:border-transparent'>Athlete Page</Link>
      </div>
    )
  }
  
  WatchListAthlete.propTypes = {
    name: PropTypes.string
  };
  
  export default WatchListAthlete;