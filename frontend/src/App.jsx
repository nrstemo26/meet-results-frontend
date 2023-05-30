import './App.css'
import {useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import { NotFound } from './pages/NotFound'
import Session from './components/Session/Session'
import Navbar from './components/Navbar/Navbar'

import Search from './components/SearchBars/Search'
import {Dashboard as AthleteDashboard} from './components/Dashboards/Athlete/Dashboard'
import MeetDashboard from './components/Dashboards/Meet/Dashboard'

//imports a wrapper for data loading needs work tho
import { HomeComponent as HomeComponent} from './components/LoadingWrapperSandbox'



function Home(){
  return(
    <HomeComponent/>
  )
}
function Login(){
  return(
    <h2>Login</h2>
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
  
  const toggleDashboard = () =>{
    setShowMeet( curr => !curr)
  }
  const handleComponentChange = (value) => {
    setSelectedComponent(value);
  };

  return (
    <Router>
    <div className={`${isSidebarOpen ? 'overflow-hidden':""} font-serif h-full `}>
    
      <Navbar setIsSidebarOpen={setIsSidebarOpen} />
      <Routes>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/api/v1/session" element={<Session/>} />
        
        <Route path="/api/v1/athletes" element={<Search/>}/>
        <Route path="/api/v1/athlete/:id" element={<AthleteDashboard/>}/>
        
        <Route path="/api/v1/meets" element={<MeetDashboard/>}/>
        <Route path="/api/v1/meet/:id" element={<MeetDashboard/>}/>
        

        <Route path="/api/v1/insights"  element={<Insights/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>

    </div>
    </Router>
  )
}

export default App

// return (
//   <div className={`${isSidebarOpen ? 'overflow-hidden':""} font-serif h-full `}>
//     <Navbar setIsSidebarOpen={setIsSidebarOpen} />
    
//     <button className="btn" onClick={()=> toggleDashboard()}>switch dashboards</button>  
//     <select value={selectedComponent} onChange={(e) => handleComponentChange(e.target.value)}>
//       <option value="">Select a component</option>
//       <option value="meet">Meet Dashboard</option>
//       <option value="lifter">Lifter Dashboard</option>
//       <option value="search">Search</option>
//     </select>
//     {/* <Dashboard showMeet={showMeet}/> */}
    
//     {/* <Router>
//       <Switch>
//       <Route exact path="/" component={LifterDashboard} />
//       <Route path="/search" component={Search} />
//       </Switch>
//     </Router> */}


//     {/* {selectedComponent === 'meet' &&   <Dashboard showMeet={true}/>}
//     {selectedComponent === 'lifter' && <Dashboard showMeet={false} />}
//     {selectedComponent === 'search' && <Search />} */}
//   </div>
// )
// }