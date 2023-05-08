import './App.css'
import {useState } from 'react'
import MeetDashboard from './components/MeetDashboard/MeetDashboard'
import LifterDashboard from './components/LifterDashboard/LifterDashboard'
import Navbar from './components/Navbar/Navbar'

function App() {
  const [showMeet, setShowMeet] = useState(true)
  
  
  const handleClick = () =>{
    setShowMeet(curr=> !curr)
  }

  return (
      <div className='h-full'>
      <Navbar />
      <button className="m-2 border-4 rounded-lg p-3 border-primary-500" onClick={()=> handleClick()}>switch dashboards</button>
      {showMeet ?<MeetDashboard /> :
      <LifterDashboard/> }
    </div>
  )
}

export default App
