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
// const baseUrl = 'http://192.168.1.139:5000/api/v1/'
// const baseUrl = 'http://98.144.49.136:5000';

function WatchList({isLoggedIn}){
    const WatchListAthletes = useSelector(selectSession);
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const makeToast = makeToast_(setShowToast,setToastType, setToastMessage)

    const handleExport = () => {
      if (isLoggedIn) {
        const token = localStorage.getItem('token');
        const credentials = btoa(`${token}:unused`);
    
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${baseUrl}/api/v1/export/watchlist`);
        xhr.setRequestHeader('Authorization', `Basic ${credentials}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'blob';
    
        xhr.onload = function () {
          if (xhr.status === 200) {
            const contentDisposition = xhr.getResponseHeader('Content-Disposition');
            const filename = getFilenameFromContentDisposition(contentDisposition);
            const blob = new Blob([xhr.response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, filename);
          } else {
            console.error(xhr.statusText);
            // Handle the error
          }
        };
    
        xhr.onerror = function () {
          console.error('Request failed');
          // Handle the error
        };
    
        xhr.send(JSON.stringify({ athletes: WatchListAthletes }));
      }
    };
    
    const getFilenameFromContentDisposition = (contentDisposition) => {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(contentDisposition);
      if (matches != null && matches[1]) {
        return matches[1].replace(/['"]/g, '');
      }
      return 'watchlist.xlsx'; // Default filename if unable to extract from header
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

