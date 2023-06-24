import Search from '../SearchBars/Search'
import SessionAthlete from './SessionAthlete';
import { useState } from 'react';

function Session(){
    const [sessionAthletes, setSessionAthletes] = useState([]);

    return(
        <div className='sm:flex w-100'>
            <div className='sm:w-2/4 border-2'>
                <Search isSession={true} setSessionAthletes={setSessionAthletes}></Search>
            </div>

            <div className='sm:w-2/4 border-2'>
              <h1>athletes watching</h1>
              <ul>
                {sessionAthletes.map((item)=>(
                  <SessionAthlete key={item} name={item} />
                )
                )}
              </ul>
            </div>
        </div>
    )
}

export default Session