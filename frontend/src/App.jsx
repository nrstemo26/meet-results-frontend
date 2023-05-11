import './App.css'
import {useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './components/Dashboards/Dashboard'

function App() {
  const [showMeet, setShowMeet] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)  
  
  const toggleDashboard = () =>{
    setShowMeet( curr => !curr)
  }

  return (
      <div className={`${isSidebarOpen ? 'overflow-hidden':""} font-serif h-full `}>
      <Navbar setIsSidebarOpen={setIsSidebarOpen} />
      <button className="btn" onClick={()=> toggleDashboard()}>switch dashboards</button>  
      
      <Dashboard showMeet={showMeet}/>
    </div>
  )
}

export default App
