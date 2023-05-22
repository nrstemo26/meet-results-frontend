import './App.css'
import {useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './components/Dashboards/Dashboard'
import Search from './components/SearchBars/Search'
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
    <div className={`${isSidebarOpen ? 'overflow-hidden':""} font-serif h-full `}>
      {/* <Search></Search> */}
      <Navbar setIsSidebarOpen={setIsSidebarOpen} />
      
      <button className="btn" onClick={()=> toggleDashboard()}>switch dashboards</button>  
      <select value={selectedComponent} onChange={(e) => handleComponentChange(e.target.value)}>
        <option value="">Select a component</option>
        <option value="meet">Meet Dashboard</option>
        <option value="lifter">Lifter Dashboard</option>
        <option value="search">Search</option>
      </select>
      {/* <Dashboard showMeet={showMeet}/> */}
      
      {selectedComponent === 'meet' &&   <Dashboard showMeet={true}/>}
      {selectedComponent === 'lifter' && <Dashboard showMeet={false} />}
      {selectedComponent === 'search' && <Search />}
    </div>
  )
}

export default App
