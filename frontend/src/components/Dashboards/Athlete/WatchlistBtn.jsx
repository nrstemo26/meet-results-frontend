import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromWatchlist,addToWatchlist } from '../../../features/watchlistSlice';
import { BsFillClipboardCheckFill } from 'react-icons/bs'
import {AiFillPlusCircle as AddCircle} from 'react-icons/ai'
import { TiDownload } from 'react-icons/ti'
import { useViewport } from "../../../hooks/useViewport";
import { baseUrl } from '../../../config';


const WatchlistBtn = ({toggleWatchlist, inWatchlist, name}) =>{
    const { width } = useViewport();
    const user = useSelector((state) => state.auth.user)

    const getFilenameFromContentDisposition = (contentDisposition) => {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDisposition);
        if (matches != null && matches[1]) {
          return matches[1].replace(/['"]/g, '');
        }
        return 'watchlist.xlsx'; // Default filename if unable to extract from header
      };
      
    const handleExport = () => {
        
        if (user) {
          const token = localStorage.getItem('token');
        //   const token = localStorage.getItem('user');
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
      
          xhr.send(JSON.stringify({ athlete: name }));
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
            <button className='text-primary-950 text-2xl hover:text-primary-400 m-1' onClick={handleExport}>
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