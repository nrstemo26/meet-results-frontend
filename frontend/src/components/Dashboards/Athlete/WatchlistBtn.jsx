import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromWatchlist,addToWatchlist } from '../../../features/watchlistSlice';
import { BsFillClipboardCheckFill } from 'react-icons/bs'
import {AiFillPlusCircle as AddCircle} from 'react-icons/ai'

import { useViewport } from "../../../hooks/useViewport";


const WatchlistBtn = ({toggleWatchlist, inWatchlist}) =>{
    const { width } = useViewport();
    
    return (
    <>
        {/* {width > 540 ? */}
        <div>
        {inWatchlist?
            <BsFillClipboardCheckFill className="fill-primary-400 inline cursor-pointer" title="click to remove from watchlist"onClick={toggleWatchlist} size='24px'/> 
            : 
            <AddCircle className='fill-primary-400 inline cursor-pointer' title="click to add to watchlist" onClick={toggleWatchlist} size='24px'/>
        }   
        
            <button onClick={toggleWatchlist} className={`btn ${inWatchlist? '':'btn-follow'} p-0 px-2 b-2`}>{inWatchlist? 'remove from watchlist': 'add to watchlist'}</button>
        </div>
        {/* :''
        // this button is stickied to the lower right of the screen
        // <button onClick={toggleWatchlist} className={`btn ${inWatchlist? '':'btn-follow'} z-10 p-1 fixed bottom-0 right-0 mb-8 mr-8`}>{inWatchlist? 'remove from watchlist' : 'add to watch list'}</button>    
        } */}
    </>
    )
}

export default WatchlistBtn;