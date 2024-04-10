import { Spinner } from '../../../pages/Spinners/Spinner';
import { Error } from '../../../pages/Error';
import { updateMetaTags } from '../../../lib/seo_utils';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUpcomingMeet } from '../../../features/meetSlice'



const UpcomingMeetDashboard = () => {
  const [requestSent, setRequestSent] = useState(false)
  const dispatch = useDispatch();
  const {data, isLoading, isError, isSuccess, message} = useSelector( (state) => state.meet )

  const pageTitle = data ? `${data['metadata']['meet_name']} - Lift Oracle`: 'Lift Oracle';
  const descriptionContent = data ? `Startlist for Olympic weightlifting meet - ${data['metadata']['meet_name']}. Weight classes, entry totals, etc.`: 'Loading meet information';
  
  useEffect(()=>{
    if(isError){
      console.log('there is an error')
    }
    const getMeetData = async()=>{
      const urlArray = window.location.pathname.split('/')
      const meetName = urlArray[urlArray.length - 1]
      if(meetName != 'meets'){
        console.log('getting meet')
        dispatch(getUpcomingMeet(meetName))
      }

    }
    if(!requestSent){
      getMeetData()
      setRequestSent(true)

    }
  },[dispatch, isError, isSuccess, message, requestSent])
  
  if(isLoading){
    return <Spinner/>
  }
  if(isError){
    return <Error/>
  }

    return (
      
      <div className='dashboard-container'>
        {updateMetaTags(pageTitle, descriptionContent)}
          <div className='bg-secondary-500 p-5 rounded-xl'>
            <h1 className="text-center text-primary-950 text-2xl font-bold m-2">{data ? data['metadata']['meet_name'] : 'loading'}</h1>
            {/* {
              data?
              (<ChartWrapper/>):
              'nothing'
            } */}
          </div>

        
        <div className="my-2 flex flex-wrap gap-2 justify-evenly">
          { data ?
          (
            <>
              {/* <TopSinclairs />
              <Insights /> */}
            </>
          ):
          'no data'
          }
        </div>
      </div>
    )
  }
  
  export default UpcomingMeetDashboard;
  