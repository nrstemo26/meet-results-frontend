import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios';

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
import About from '../pages/About'

//insert working url
// const baseUrl = 'http://192.168.0.108:5000'
const baseUrl = 'http://192.168.86.27:5000'


function Main({ isLoggedIn, setIsLoggedIn }) {

    const updateLoggedInStatus = (status) => {
      setIsLoggedIn(status);
      console.log('Login status updated:', status);
      // console.log(isLoggedIn);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          // Token exists in localStorage, authenticate with the backend
          axios
            .post(`${baseUrl}/user/verify-token`, { token }) // Replace with your backend endpoint for token verification
            .then(response => {
              const { valid } = response.data; // Assuming the backend returns a validity flag
      
              if (valid) {
                // Token is valid, consider the user as logged in
                setIsLoggedIn(true);
              } else {
                // Token is invalid, remove from localStorage and log the user out
                localStorage.removeItem('token');
                setIsLoggedIn(false);
              }
            })
            .catch(error => {
              console.log('Token verification failed:', error);
              setIsLoggedIn(false);
            });
        }
      }, []); // Run this effect only once on component mount
    
      useEffect(() => {
        console.log('isLoggedIn:', isLoggedIn);
      }, [isLoggedIn]);


return (
    <div >
      <Routes>
          <Route path="*" element={<NotFound/>}/>
          {/* this route will need to change...needs an id? */}
          <Route path="/api/v1/session" element={<WatchList isLoggedIn={isLoggedIn}/>} />
          <Route path="/api/v1/watchlist" element={<AccountDashboard/>} />
          <Route path="/api/v1/athletes" element={<Search/>}/>
          <Route path="/api/v1/athlete/:id" element={<AthleteDashboard/>}/>
          
          <Route path="/api/v1/meets" element={<MeetDashboard/>}/>
          <Route path="/api/v1/meet/:id" element={<MeetDashboard/>}/>
          

          <Route path="/api/v1/insights"  element={<Insights/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About isLoggedIn={isLoggedIn}/>}/>
          <Route path="/reset-request" element={<ResetRequest/>}/>
          <Route path="/reset-password" element={<PasswordReset/>}/>
          <Route path="/login" element={<Login updateLoggedInStatus={updateLoggedInStatus} />} /> {/* Pass updateLoggedInStatus prop to Login */}
          <Route path="/register" element={<Register updateLoggedInStatus={updateLoggedInStatus} />} /> {/* Pass updateLoggedInStatus prop to Register */}
          <Route path='/account' element={<Account isLoggedIn={isLoggedIn} />}/>
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>

    </div>
      
  )
}

export default Main