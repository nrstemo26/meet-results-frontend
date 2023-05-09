import './App.css'
import {useState } from 'react'
import MeetDashboard from './components/Dashboards/MeetDashboard/MeetDashboard'
import LifterDashboard from './components/Dashboards/LifterDashboard/LifterDashboard'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './components/Dashboards/Dashboard'

function App() {
  const [showMeet, setShowMeet] = useState(true)
  
  
  const toggleDashboard = () =>{
    setShowMeet(curr=> !curr)
  }

  return (
      <div className='h-full'>
      <Navbar />
      <button className="m-2 border-4 rounded-lg p-3 border-primary-500" onClick={()=> toggleDashboard()}>switch dashboards</button>
      
      <Dashboard showMeet={showMeet}/>
    </div>
  )
}

export default App
