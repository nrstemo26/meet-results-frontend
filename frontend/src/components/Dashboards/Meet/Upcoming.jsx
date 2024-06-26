import { Spinner } from '../../../pages/Spinners/Spinner';
import { Error } from '../../../pages/Error';
import { updateMetaTags } from '../../../lib/seo_utils';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUpcomingMeet } from '../../../features/upcomingSlice'
import PaywallOverlay from '../../Widgets/PaywallOverlay'
import AthleteDashboard from './StartList'



const UpcomingMeetDashboard = () => {
  const [requestSent, setRequestSent] = useState(false);
  const [paywallActive, setPaywallActive] = useState(false);
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector((state) => state.upcoming);

  useEffect(() => {
    if (!requestSent) {
      const urlArray = window.location.pathname.split('/');
      const meetName = urlArray[urlArray.length - 1];
      if (meetName !== 'meets') {
        dispatch(getUpcomingMeet(meetName));
        setRequestSent(true);
      }
    }

    // Paywall timer
    const timer = setTimeout(() => {
      setPaywallActive(true);
    }, 10000); // Activate paywall after 10 seconds

    return () => clearTimeout(timer);
  }, [dispatch, requestSent]);

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  const meetContent = (
    <div className="my-2 flex flex-wrap gap-2 justify-evenly">
      {data ? <AthleteDashboard meetData={data} /> : 'No data available'}
    </div>
  );

  const title = data?.metadata?.meet_name ? `${data.metadata.meet_name} - Lift Oracle` : 'Lift Oracle';
  const meetTitle = data?.metadata?.meet_name ? `${data.metadata.meet_name}` : 'Lift Oracle';
  const description = data?.metadata?.meet_name ? `Olympic weightlifting meet startlist - ${data.metadata.meet_name}. Preview weight classes, entry totals, etc.` : 'Loading meet information';

  updateMetaTags(title, description);

  return (
    <div className='dashboard-container'>
      <div className='bg-secondary-500 p-5 rounded-xl'>
        <h1 className="text-center text-primary-950 text-2xl font-bold m-2">{title}</h1>
      </div>
      
      {paywallActive ? (
        <PaywallOverlay buttonText="Unlock Full Access with Lift Oracle Pro">
          {meetContent}
        </PaywallOverlay>
      ) : (
        meetContent
      )}
    </div>
  );
};

export default UpcomingMeetDashboard;
  