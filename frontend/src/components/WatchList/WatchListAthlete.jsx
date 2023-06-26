import { useState, useEffect } from 'react'
import { organizeByNewestDate, renderSessionResults } from '../../lib/date_utils';

import { useDispatch } from "react-redux";
import { removeFromSession } from '../../features/sessionSlice';
import { getAthlete } from "../../features/athleteSlice"

import {FiArrowDown, FiArrowUp} from 'react-icons/fi'
import {TiDeleteOutline} from 'react-icons/ti'

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
      dispatch(removeFromSession(e.target.parentNode.firstChild.textContent))
    }
    
    return(
      <div className='shadow-lg m-2 p-4'>
        <div className='flex justify-between'>
          <h1 className='text-xl font-bold text-primary-950'>{name}</h1>
          <TiDeleteOutline onClick={(e)=> handleDelete(e)}/>
        </div>

        {
        stats? 
        <div>Comp PRs (Snatch/C&J/Total): {stats["Best Snatch"]}/{stats["Best C&J"]}/{stats["Best Total"]}kg</div>
        : 
        'loading stats'
      }

        <div className='flex justify-between' onClick={()=>toggleMeetHistory()}>
            {
              areMeetsVisible ? 
               (<><div className='cursor-pointer text-sm pb-4 text-slate-500 hover:text-primary-500'>Hide last 5 meets</div><FiArrowUp/></>) 
              :
              (<><div className='cursor-pointer text-sm pb-4 text-slate-500 hover:text-primary-500'>Show last 5 meets</div><FiArrowDown/></>)
            }
        </div>
        
        {
          areMeetsVisible && meetHistory ? 
          renderSessionResults(organizeByNewestDate(meetHistory), meetHistory) 
          :
          ''
        }
        
        <Link to={`/api/v1/athlete/${name}`} className='btn border-2 p-1 m-2 border-primary-950 hover:text-white hover:border-transparent hover:bg-primary-950'>Athlete Page</Link>
      </div>
    )
  }
  
  WatchListAthlete.propTypes = {
    name: PropTypes.string
  };
  
  export default WatchListAthlete;