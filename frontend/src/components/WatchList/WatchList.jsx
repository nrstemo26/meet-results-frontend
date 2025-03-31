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
   
    const handleExport = async () => {
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
      
      try {
        const token = localStorage.getItem('token');
        const credentials = btoa(`${token}:unused`);
        
        const response = await axios({
          method: 'POST',
          url: `${baseUrl}/v1/export`,
          headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          data: { athletes: WatchListAthletes },
          responseType: 'blob'
        });
        
        // Get filename from content-disposition header
        const contentDisposition = response.headers['content-disposition'];
        const filename = getFilenameFromContentDisposition(contentDisposition) || 'watchlist.xlsx';
        
        // Create a blob and save the file
        const blob = new Blob([response.data], { 
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
        });
        
        // Detect if user is on mobile device
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
          // For mobile devices, try to handle download more explicitly
          try {
            // First attempt using saveAs from file-saver
            saveAs(blob, filename);
            
            // Fallback to creating a direct download link if needed
            setTimeout(() => {
              // Create an invisible download link as fallback
              const tempLink = document.createElement('a');
              const tempUrl = window.URL.createObjectURL(blob);
              
              tempLink.href = tempUrl;
              tempLink.download = filename;
              tempLink.style.display = 'none';
              document.body.appendChild(tempLink);
              tempLink.click();
              
              // Clean up
              setTimeout(() => {
                document.body.removeChild(tempLink);
                window.URL.revokeObjectURL(tempUrl);
              }, 100);
            }, 300); // Small delay to check if saveAs worked
          } catch (innerError) {
            console.error('Error in mobile download:', innerError);
            toast('Download started. Check your downloads folder if not prompted.', { type: 'info' });
          }
        } else {
          // For desktop, use standard saveAs
          saveAs(blob, filename);
        }
        
        toast('Watchlist exported successfully!', { type: 'success' });
      } catch (error) {
        console.error('Export failed:', error);
        let errorMessage = 'Failed to export watchlist.';
        
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
          
          errorMessage = `Export failed with status ${error.response.status}`;
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Request made but no response received:', error.request);
          errorMessage = 'No response received from server. Check your network connection.';
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up request:', error.message);
          errorMessage = error.message;
        }
        
        toast(errorMessage, { type: 'error' });
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

