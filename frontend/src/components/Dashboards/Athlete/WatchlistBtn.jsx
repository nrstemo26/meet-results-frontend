import { useState, useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromWatchlist,addToWatchlist } from '../../../features/watchlistSlice';
import { BsFillClipboardCheckFill } from 'react-icons/bs'
import {AiFillPlusCircle as AddCircle} from 'react-icons/ai'
import { TiDownload } from 'react-icons/ti'
import { useViewport } from "../../../hooks/useViewport";
import { baseUrl, proLink } from '../../../config';
import { account } from '../../../features/authSlice'
import axios from 'axios';
import { saveAs } from 'file-saver';


const WatchlistBtn = ({toggleWatchlist, inWatchlist, name}) =>{
    const dispatch = useDispatch();
    const { width } = useViewport();
    const user = useSelector((state) => state.auth.user)
    const isSubscribed = useSelector((state) => state.auth.isSubscribed)
    useEffect(() => {
      if (user) {
        dispatch(account()); // Dispatch the action to fetch account info
      }
    }, [user, dispatch]); // Run the effect when 'user' changes

    const getFilenameFromContentDisposition = (contentDisposition) => {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDisposition);
        if (matches != null && matches[1]) {
          return matches[1].replace(/['"]/g, '');
        }
        return `${name}_history.xlsx`; // Default filename if unable to extract from header
      };
      
    const handleExport = async () => {
      if (!isSubscribed) {
        toast(
          <>
            Athlete export is reserved for subscribers. {' '}
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
          data: { athlete: name },
          responseType: 'blob'
        });
        
        // Get filename from content-disposition header
        const contentDisposition = response.headers['content-disposition'];
        const filename = getFilenameFromContentDisposition(contentDisposition);
        
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
        
        toast('Athlete data exported successfully!', { type: 'success' });
      } catch (error) {
        console.error('Export failed:', error);
        let errorMessage = 'Failed to export athlete data.';
        
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          errorMessage = `Export failed with status ${error.response.status}`;
        } else if (error.request) {
          console.error('Request made but no response received:', error.request);
          errorMessage = 'No response received from server. Check your network connection.';
        } else {
          console.error('Error setting up request:', error.message);
          errorMessage = error.message;
        }
        
        toast(errorMessage, { type: 'error' });
      }
    };
    
    return (
    <>
        {/* {width > 540 ? */}
        <div>
        {inWatchlist?
            <BsFillClipboardCheckFill className="text-primary-950 text-2xl hover:text-primary-400 inline cursor-pointer m-1 mb-2" title="click to remove from watchlist"onClick={toggleWatchlist} /> 
            : 
            <AddCircle className='text-primary-950 text-2xl hover:text-primary-400 inline cursor-pointer m-1 pb-1 mb-2' title="click to add to watchlist" onClick={toggleWatchlist} />
        }   
        
            {/* <button onClick={toggleWatchlist} className={`btn ${inWatchlist? '':'btn-follow'} p-0 px-2 b-2`}>{inWatchlist? 'remove from watchlist': 'add to watchlist'}</button> */}
            <button className='text-primary-950 text-2xl hover:text-primary-400 m-1' title="export athlete history" onClick={handleExport}>
                  <TiDownload />
            </button>
        </div>
        {/* :''
        // this button is stickied to the lower right of the screen
        // <button onClick={toggleWatchlist} className={`btn ${inWatchlist? '':'btn-follow'} z-10 p-1 fixed bottom-0 right-0 mb-8 mr-8`}>{inWatchlist? 'remove from watchlist' : 'add to watch list'}</button>    
        } */}
    </>
    )
}

export default WatchlistBtn;