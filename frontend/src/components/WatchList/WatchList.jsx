import Search from '../SearchBars/Search'
import WatchListAthlete from './WatchListAthlete';
import {useSelector} from 'react-redux'
import {selectSession} from '../../features/sessionSlice'

function WatchList(){
    const WatchListAthletes = useSelector(selectSession);

    return(
        <div className='flex w-100'>
            <div className='w-2/4' >
                <Search isSession={true} ></Search>
            </div>

            <div className='w-2/4'>
              <h1 className="font-bold text-xl text-primary-950 text-center">Athlete Watchlist</h1>
              <ul>
                {WatchListAthletes.map((item)=>(
                  <WatchListAthlete key={item} name={item} />
                )
                )}
              </ul>
            </div>
        </div>
    )
}

export default WatchList

