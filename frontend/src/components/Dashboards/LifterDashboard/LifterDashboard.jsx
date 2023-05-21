import Insights from '../MeetDashboard/Insights'
import LifterChart from "./LifterChart";
import BestLifts from "./BestLits";
import AllTotals from "./AllTotals";
import {useState, useEffect} from 'react'
import axios from 'axios'
const baseUrl = 'http://192.168.1.247:5000/api/v1/athlete/Nathan%20Stemo'


function LifterDashboard(){
  console.log('sending a request')
  const [athlete, setAthlete] = useState('')

  
  useEffect(()=>{
    const fetchData = async () => {
      try{
        const res = await axios.get(baseUrl)
        setAthlete(res.data)
        console.log(res)
        console.log('data returned')
        console.log(res.data)
      }catch(error){
        console.error(error)
      }
    }
    fetchData()

      
    },[])
    
    return (
      <>
          <div className='bg-secondary-500 p-5 rounded-xl'>
            {/* <h1 className="text-center text-2xl font-bold">{athlete.id? athlete.id : 'loading'} Loading Dashboard</h1> */}
            <h1 className="text-center text-2xl font-bold">John Bars Lifter Dashboard</h1>
            <LifterChart/>
          </div>

        
        <div className="my-2 flex flex-wrap gap-2 justify-evenly">
          <BestLifts />
          <AllTotals />
          <Insights />
        </div>
      </>
    )
  }
  
  export default LifterDashboard;
  
  
  
  // import {useSelector, useDispatch} from 'react-redux'
  // import {decrement, increment} from '../../../redux/counterSlice'
  
  // const count = useSelector((state) => state.counter.value)
  // const dispatch = useDispatch()

{/* <div>
<button
aria-label="Increment value"
onClick={() => dispatch(increment())}
    >
    Increment
    </button>
    <span>{count}</span>
    <button
      aria-label="Decrement value"
      onClick={() => dispatch(decrement())}
    >
      Decrement
    </button>
  </div> */}