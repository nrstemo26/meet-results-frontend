import Search from '../SearchBars/Search'
import SessionAthlete from './SessionAthlete';
import {useSelector} from 'react-redux'
import {selectSession} from '../../features/sessionSlice'

function Session(){
    const sessionAthletes = useSelector(selectSession);

    return(
        <div className='flex w-100'>
            <div className='w-2/4' >
                <Search isSession={true} ></Search>
            </div>

            <div className='w-2/4'>
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
