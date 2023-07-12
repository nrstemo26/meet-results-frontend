import axios from 'axios';
import { useState } from 'react';
import { saveAs } from 'file-saver';
import Search from '../SearchBars/Search'
import WatchListAthlete from './WatchListAthlete';
import {useSelector} from 'react-redux'
import {selectSession} from '../../features/sessionSlice'
import { TiDownload, TiFolderAdd } from 'react-icons/ti'
import Toast from '../Widgets/Toast';
import { makeToast_ } from '../../lib/toast/toast_utils';

const baseUrl = 'http://192.168.86.27:5000';
// const baseUrl = 'http://98.144.49.136:5000';

function WatchList({isLoggedIn}){
    const WatchListAthletes = useSelector(selectSession);
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const makeToast = makeToast_(setShowToast,setToastType, setToastMessage)

    const handleExport = async () => {
  
      if (isLoggedIn) {
        const token = localStorage.getItem('token');
        const credentials = btoa(`${token}:unused`);

        try {
          const response = await axios.post(
            `${baseUrl}/api/v1/export/watchlist`,
            { athletes: WatchListAthletes },
            {
              headers: {
                Authorization: `Basic ${credentials}`,
                'Content-Type': 'application/json', // Set the Content-Type header
                responseType: 'blob'
              },
            }
          );

          const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, 'watchlist.xlsx');
          
        } catch (error) {
          console.error(error);
          // Handle the error
        }
      }
   
    };

    const handleSave = async () => {
      const now = new Date();
      const timeStamp = now.toISOString();
      const data = {
        athletes: WatchListAthletes,
        name: timeStamp
      };

      if (isLoggedIn) {
        const token = localStorage.getItem('token');
        const credentials = btoa(`${token}:unused`);

        try {
          const response = await axios.post(
            `${baseUrl}/api/v1/watchlist`,
            data,
            {
              headers: {
                Authorization: `Basic ${credentials}`,
                'Content-Type': 'application/json'
              }
            }
          )
          // console.log(response.data); // Handle the response as needed
          makeToast(response.data.message, response.data.status);

        } catch (error) {
          console.error(error);
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
            {WatchListAthletes.length > 0 && (
              <div className="">
                <button onClick={handleExport} className='text-primary-950 text-2xl hover:text-primary-400 m-1'>
                  <TiDownload />
                </button>
                <button onClick={handleSave} className='text-primary-950 text-2xl hover:text-primary-400 m-1'>
                  <TiFolderAdd />
                </button>
              </div>
            )}
            <ul>
              {WatchListAthletes.map((item)=>(
                <WatchListAthlete key={item} name={item} />
              )
              )}
            </ul>
          </div>
          {showToast && (
            <Toast message={toastMessage} onClose={() => setShowToast(false)} type={toastType} />
          )}
      </div>
    )
}

export default WatchList

