import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'

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


//imports a wrapper for data loading needs work tho
import { HomeComponent as HomeComponent} from './LoadingWrapperSandbox'

const baseUrl = 'http://192.168.86.27:5000'
// const baseUrl = 'http://192.168.1.139:5000/api/v1/'
// const baseUrl = 'http://98.144.49.136:5000/api/v1/'

// dummy components until i get to making all of these pages
function Home(){
    return(
      <HomeComponent/>
    )
  }
  
  function About(){
    return(
      <h2>About</h2>
    )
  }
  function Insights(){
    return(
      <h2>Insights</h2>
    )
  }



function Main() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const updateLoggedInStatus = (status) => {
      setIsLoggedIn(status);
      console.log('Login status updated:', status);
      console.log(isLoggedIn);
    };
    const handleLogout = () => {
      
      localStorage.removeItem('token');
      setIsLoggedIn(prevIsLoggedIn => !prevIsLoggedIn);
      window.location.href = '/login';
  
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
    <div className='border-2 border-blue-900'>
      <h1>
         main  
      </h1> 
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
          <Route path="/about" element={<About/>}/>
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