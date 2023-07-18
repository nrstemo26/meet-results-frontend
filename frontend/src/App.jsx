import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import Main from './components/Main'
import Navbar from './components/Navbar/Navbar'

//change to needed url
// const baseUrl = 'http://192.168.0.108:5000'
const baseUrl = 'http://192.168.86.27:5000'



function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {  
    localStorage.removeItem('token');
    setIsLoggedIn(prevIsLoggedIn => !prevIsLoggedIn);
    window.location.href = '/login';

  };



  return (
    <Router>
      <div className={`${isSidebarOpen ? 'overflow-hidden':""} font-serif h-full `}>
        {/* get rid of is logged in by having the user slice? */}
        <Navbar setIsSidebarOpen={setIsSidebarOpen}  isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        
        {/* this can get passed props if we need stuff to go from navbar---> main */}
        <Main isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
      
    </Router>
  )
}

export default App

        // <Routes>
        //   <Route path="*" element={<NotFound/>}/>
        //   {/* this route will need to change...needs an id? */}
        //   <Route path="/api/v1/session" element={<WatchList isLoggedIn={isLoggedIn}/>} />
        //   <Route path="/api/v1/watchlist" element={<AccountDashboard/>} />
        //   <Route path="/api/v1/athletes" element={<Search/>}/>
        //   <Route path="/api/v1/athlete/:id" element={<AthleteDashboard/>}/>
          
        //   <Route path="/api/v1/meets" element={<MeetDashboard/>}/>
        //   <Route path="/api/v1/meet/:id" element={<MeetDashboard/>}/>
          

        //   <Route path="/api/v1/insights"  element={<Insights/>}/>
        //   <Route path="/" element={<Home/>}/>
        //   <Route path="/about" element={<About/>}/>
        //   <Route path="/reset-request" element={<ResetRequest/>}/>
        //   <Route path="/reset-password" element={<PasswordReset/>}/>
        //   <Route path="/login" element={<Login updateLoggedInStatus={updateLoggedInStatus} />} /> {/* Pass updateLoggedInStatus prop to Login */}
        //   <Route path="/register" element={<Register updateLoggedInStatus={updateLoggedInStatus} />} /> {/* Pass updateLoggedInStatus prop to Register */}
        //   <Route path='/account' element={<Account isLoggedIn={isLoggedIn} />}/>
        //   <Route path="/confirmation" element={<Confirmation />} />
        // </Routes>