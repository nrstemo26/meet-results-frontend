import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'

import { NotFound } from '../pages/NotFound'
import WatchList from './WatchList/WatchList'
import Search from './SearchBars/Search'
import MeetSearch from './SearchBars/MeetSearch'
import { Dashboard as AthleteDashboard } from './Dashboards/Athlete/Dashboard'
import MeetDashboard from './Dashboards/Meet/Dashboard'
import UpcomingMeetDashboard from './Dashboards/Meet/Upcoming'
import Login from './User/Login'
import Register from './User/Register'
import ResetRequest from './User/ResetRequest'
import PasswordReset from './User/PasswordReset'
import Account from './User/Account'
import Confirmation from './User/Confirmation'
import GymFinder from './GymFinder/GymFinder'

import { Home } from '../pages/Home/Home'
import { Insights } from '../pages/Insights'
import About from '../pages/About'
import ProRedirect from '../pages/ProRedirect'
import ResultsFilterForm from './Dashboards/Query/ProQuery'
import Cheers from '../pages/Cheers'

import { useDispatch } from 'react-redux';
import { verify, reset } from '../features/authSlice';

function Main() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    const verifyUser = async () => { 
    await dispatch(verify())    
  }
  verifyUser();
  
  //resets loading/ error/ etc states
  dispatch(reset())
  }, []); // Run this effect only once on component mount

return (
    <div >
      <Routes>
          <Route path="*" element={<NotFound/>}/>
          {/* this route will need to change...needs an id? */}
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/athletes" element={<Search/>}/>
          <Route path="/athlete/:id" element={<AthleteDashboard/>}/>
          
          <Route path="/meets" element={<MeetSearch/>}/>
          <Route path="/meet/:id" element={<MeetDashboard/>}/>
          <Route path="/upcoming/:id" element={<UpcomingMeetDashboard/>}/>
          
          <Route path="/gym-finder" element={<GymFinder/>}/>

          <Route path="/insights"  element={<Insights/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/reset-request" element={<ResetRequest/>}/>
          <Route path="/reset-password" element={<PasswordReset/>}/>
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path='/account' element={<Account />}/>
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path='/pro-redirect' element={<ProRedirect/>} />
          <Route path='/query' element={<ResultsFilterForm/>} />
          <Route path='/cheers' element={<Cheers/>} />
        </Routes>

    </div>
      
  )
}

export default Main