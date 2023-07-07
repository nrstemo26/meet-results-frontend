import axios from 'axios';
import Search from '../SearchBars/Search'
import WatchListAthlete from './WatchListAthlete';
import {useSelector} from 'react-redux'
import {selectSession} from '../../features/sessionSlice'
import { TiDownload } from 'react-icons/ti'

const baseUrl = 'http://192.168.86.27:5000';
// const baseUrl = 'http://98.144.49.136:5000';

function WatchList({isLoggedIn}){
    const WatchListAthletes = useSelector(selectSession);
    const handleExport = async () => {
      // Create a JSON object with the watchlist data
      const data = {
        watchlist: WatchListAthletes
      };
  
      if (isLoggedIn) {
        const token = localStorage.getItem('token');
        const credentials = btoa(`${token}:unused`);

        try {
          const response = await axios.post(
            `${baseUrl}/api/v1/export/watchlist`,
            { watchlist: WatchListAthletes },
            {
              headers: {
                Authorization: `Basic ${credentials}`,
                'Content-Type': 'application/json', // Set the Content-Type header
              },
            }
          );

        } catch (error) {
          console.error(error);
          // Handle the error
        }
      }
   
    };

    return(
        <div className='sm:flex w-100 p-4'>
            <div className='sm:w-2/4' >
                <Search isSession={true} ></Search>
            </div>

            <div className='sm:w-2/4'>
              <h1 className="font-bold text-xl text-primary-950 text-center">Athlete Watchlist</h1>
              <button onClick={handleExport} className="text-primary-950 hover:text-primary-500">
                <TiDownload />
              </button>
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

