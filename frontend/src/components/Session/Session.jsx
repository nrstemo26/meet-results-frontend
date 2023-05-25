import Search from '../SearchBars/Search'
import { useState } from 'react';

function Session(){
    const [sessionAthletes, setSessionAthletes] = useState([]);

    return(
        <div className='flex'>
            <div className='w-2/4' >
            <Search isSession={true} setSessionAthletes={setSessionAthletes}></Search>

            </div>
            <div>
                <h1>athletes watching</h1>
                <ul>
                    {sessionAthletes.map((item)=>(
                        <li key={item}>{item}</li>
                    )
                    )}
                </ul>
            </div>
           
        </div>
    )
}

export default Session
