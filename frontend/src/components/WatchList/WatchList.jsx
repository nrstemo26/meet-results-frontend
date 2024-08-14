import axios from 'axios';
import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import Search from '../SearchBars/Search'
import WatchListAthlete from './WatchListAthlete';
import { useSelector, useDispatch } from 'react-redux'
import {selectWatchlist} from '../../features/watchlistSlice'
import { TiDownload, TiFolderAdd } from 'react-icons/ti'
import { account } from '../../features/authSlice';
import { updateMetaTags } from '../../lib/seo_utils';
import { toast } from 'react-toastify';

import { baseUrl, proLink } from '../../config';

function WatchList(){
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user)
  const isSubscribed = useSelector((state) => state.auth.isSubscribed)
  const WatchListAthletes = useSelector(selectWatchlist);

  const pageTitle = 'Watchlist - Lift Oracle';
  const descriptionContent = 'Track your favorite olympic weightlifting athletes by creating a Lift Oracle watchlist.';

  useEffect(() => {
    if (user) {
      dispatch(account()); // Dispatch the action to fetch account info
    }
  }, [user, dispatch]); // Run the effect when 'user' changes
   
    const handleExport = () => {

      if (!isSubscribed) {
        toast(
          <>
            Watchlist export is reserved for subscribers. {' '}
            <a className="text-primary-400 hover:text-primary-950" href={proLink} target="_blank" rel="noopener noreferrer">
              Go Pro.
            </a>
          </>,
          { type: 'info' }
        );
        return; // User is not subscribed
      }

      
      const token = localStorage.getItem('token');
      // const token = localStorage.getItem('user');
      const credentials = btoa(`${token}:unused`);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${baseUrl}/v1/export`);
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

      if (!isSubscribed) {
        toast(
          <>
            Watchlist export is reserved for subscribers. {' '}
            <a className="text-primary-400 hover:text-primary-950" href={proLink} target="_blank" rel="noopener noreferrer">
              Go Pro.
            </a>
          </>,
          { type: 'info' }
        );
        return; // User is not subscribed
      }
      
      const token = localStorage.getItem('token');
      
      //token could be defined like this too
      //const token = user.token;
      const credentials = btoa(`${token}:unused`);

      try {
        const response = await axios.post(
          `${baseUrl}/v1/watchlist`,
          data,
          {
            headers: {
              Authorization: `Basic ${credentials}`,
              'Content-Type': 'application/json'
            }
          }
        )
        // console.log(response.data); // Handle the response as needed
        //what do i do with response.data.status
        //2nd argument is an options obj
        console.log(response)
        toast(response.data.message, {type: response.data.status})
      } catch (error) {
        console.error(error);
      }
      

    };

    return(
      <div className='sm:flex w-100 p-4'>
        {updateMetaTags(pageTitle, descriptionContent)}
          
          <div className='sm:w-1/3 mt-8'>
            <h1 className="font-bold text-xl text-primary-950 text-center">Athlete Watchlist</h1>
            {WatchListAthletes.length > 0 && (
              <div className="">
                <button title="export watchlist" onClick={handleExport} className='text-primary-950 text-2xl hover:text-primary-400 m-1'>
                  <TiDownload />
                </button>
                <button title="save watchlist" onClick={handleSave} className='text-primary-950 text-2xl hover:text-primary-400 m-1'>
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

          <div className='sm:w-2/3' >
              <Search isWatchlist={true} ></Search>
          </div>
      </div>
    )
}

export default WatchList

