import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'

import { NotFound } from '../pages/NotFound'
import WatchList from './WatchList/WatchList'
import Search from './SearchBars/Search'
import { Dashboard as AthleteDashboard } from './Dashboards/Athlete/Dashboard'
import { Dashboard as AccountDashboard} from './Dashboards/Account/Dashboard'
import MeetDashboard from './Dashboards/Meet/Dashboard'
import Login from './User/Login'
import Register from './User/Register'
import ResetRequest from './User/ResetRequest'
import PasswordReset from './User/PasswordReset'
import Account from './User/Account'
import Confirmation from './User/Confirmation'

import { Home } from '../pages/Home/Home'
import { Insights } from '../pages/Insights'
import { About } from '../pages/About'

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
          <Route path="/api/v1/session" element={<WatchList />} />
          <Route path="/api/v1/watchlist" element={<AccountDashboard/>} />
          <Route path="/api/v1/athletes" element={<Search/>}/>
          <Route path="/api/v1/athlete/:id" element={<AthleteDashboard/>}/>
          
          <Route path="/api/v1/meets" element={<MeetDashboard/>}/>
          <Route path="/api/v1/meet/:id" element={<MeetDashboard/>}/>
          

          <Route path="/api/v1/insights"  element={<Insights/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/reset-request" element={<ResetRequest/>}/>
          <Route path="/reset-password" element={<PasswordReset/>}/>
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path='/account' element={<Account />}/>
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>

    </div>
      
  )
}

export default Main