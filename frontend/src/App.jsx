import './App.css'
import {useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import { NotFound } from './pages/NotFound'
import WatchList from './components/WatchList/WatchList'
import Navbar from './components/Navbar/Navbar'

import Search from './components/SearchBars/Search'
import { Dashboard as AthleteDashboard } from './components/Dashboards/Athlete/Dashboard'
import MeetDashboard from './components/Dashboards/Meet/Dashboard'
import Login from './components/User/Login'
import Register from './components/User/Register'
import Account from './components/User/Account'
import Confirmation from './components/User/Confirm'

//imports a wrapper for data loading needs work tho
import { HomeComponent as HomeComponent} from './components/LoadingWrapperSandbox'


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


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateLoggedInStatus = (status) => {
    setIsLoggedIn(status);
    console.log(isLoggedIn);
  };
  const handleLogout = () => {
    // Perform logout logic and update isLoggedIn state accordingly
    setIsLoggedIn(false);
  };
  

  return (
    <Router>
      <div className={`${isSidebarOpen ? 'overflow-hidden':""} font-serif h-full `}>
      
        <Navbar setIsSidebarOpen={setIsSidebarOpen}  isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/api/v1/session" element={<WatchList/>} />
          
          <Route path="/api/v1/athletes" element={<Search/>}/>
          <Route path="/api/v1/athlete/:id" element={<AthleteDashboard/>}/>
          
          <Route path="/api/v1/meets" element={<MeetDashboard/>}/>
          <Route path="/api/v1/meet/:id" element={<MeetDashboard/>}/>
          

          <Route path="/api/v1/insights"  element={<Insights/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login updateLoggedInStatus={updateLoggedInStatus} />} /> {/* Pass updateLoggedInStatus prop to Login */}
          <Route path="/register" element={<Register updateLoggedInStatus={updateLoggedInStatus} />} /> {/* Pass updateLoggedInStatus prop to Register */}
          <Route path='/account' element={<Account/>}/>
          <Route path="/confirmation/:token" component={Confirmation} />
        </Routes>

      </div>
      
    </Router>
  )
}

export default App