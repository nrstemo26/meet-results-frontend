import './App.css'
import {useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'



import Navbar from './components/Navbar/Navbar'
import Dashboard from './components/Dashboards/Dashboard'
import Search from './components/SearchBars/Search'
import LifterDashboard from './components/Dashboards/LifterDashboard/LifterDashboard'
import MeetDashboard from './components/Dashboards/MeetDashboard/MeetDashboard'


function Home(){
  return(
    <h2>Home</h2>
  )
}
function Contact(){
  return(
    <h2>Contact</h2>
  )
}


function App() {
  const [showMeet, setShowMeet] = useState(true)
  const [selectedComponent, setSelectedComponent] = useState('meet')
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
        <Route path="/api/v1/search" element={<Search/>}/>
        
        <Route path="/api/v1/lifter/:id" element={<Dashboard showMeet={false}/>}/>
        <Route path="/api/v1/meet" element={<Dashboard showMeet={true}/>}/>
        
        
        {/* 
        should probably look like this but my css is messed up
        <Route path="/api/v1/lifter" element={<LifterDashboard/>}/>
        <Route path="/api/v1/meet" element={<MeetDashboard/>}/>
         */}
        <Route path="/" element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
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