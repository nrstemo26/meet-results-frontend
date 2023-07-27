import axios from 'axios';
import { useState } from 'react';
import { saveAs } from 'file-saver';
import Search from '../SearchBars/Search'
import WatchListAthlete from './WatchListAthlete';
import { useSelector } from 'react-redux'
import {selectWatchlist} from '../../features/watchlistSlice'
import { TiDownload, TiFolderAdd } from 'react-icons/ti'


import { toast } from 'react-toastify';

import { baseUrl } from '../../config';

function WatchList(){
  const user = useSelector((state) => state.auth.user)
  

  const WatchListAthletes = useSelector(selectWatchlist);
   
    const handleExport = () => {
      if (user) {
        const token = localStorage.getItem('token');
        // const token = localStorage.getItem('user');
        const credentials = btoa(`${token}:unused`);
  
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${baseUrl}/api/v1/export`);
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

      if (user) {
        const token = localStorage.getItem('token');
        
        //token could be defined like this too
        //const token = user.token;
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
          //what do i do with response.data.status
          //2nd argument is an options obj
          toast(response.message.data, {type: response.data.status})
        } catch (error) {
          console.error(error);
        }
      }

    };

    return(
      <div className='sm:flex w-100 p-4'>
          <div className='sm:w-2/4' >
              <Search isWatchlist={true} ></Search>
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
      </div>
    )
}

export default WatchList

