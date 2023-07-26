import { BsFillClipboardCheckFill } from 'react-icons/bs'
import {AiFillPlusCircle as AddCircle} from 'react-icons/ai'
import { useViewport } from '../../../hooks/useViewport'



const WatchlistIcon = ({name, toggleWatchlist, inWatchlist}) =>{
    const { width } = useViewport();
    
    return (
    <div>
        <h1 className="text-center text-primary-950 text-4xl font-bold m-2">
        { name }
        
        {/* { (width > 540) ?
            '':
           inWatchlist? 
            <BsFillClipboardCheckFill className="fill-primary-400 inline cursor-pointer" title="click to remove from watchlist"onClick={toggleWatchlist} size='24px'/> 
            : 
            <AddCircle className='fill-primary-400 inline cursor-pointer' title="click to add to watchlist" onClick={toggleWatchlist} size='24px'/>
        }      */}
        </h1>
        {/* {inWatchlist? 'In watchlist' : 'not in watchlist'} */}
    </div>
    )
}

export default WatchlistIcon;