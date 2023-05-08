import './App.css'
import {useState} from 'react'
import Header from './components/Header'
import MeetDashboard from './components/MeetDashboard/MeetDashboard'
import LifterDashboard from './components/LifterDashboard/LifterDashboard'
// import MobileNav from './components/MobileNav'


function App() {
  const [showMeet, setShowMeet] = useState(false)
  
  const handleClick = () =>{
    setShowMeet(curr=> !curr)
  }

  return (
  //   <div className='bg-slate-500 h-full  '>
    <div className='h-full'>
      <Header isMobile={true}/>
      <button className="border-4 border-orange-700" onClick={()=> handleClick()}>switch dashboards</button>
      {showMeet ?<MeetDashboard /> :
      <LifterDashboard/> }
      {/* <LifterDashboard></LifterDashboard> */}
      {/* <MeetDashboard></MeetDashboard> */}
      {/* <MobileNav/> */}


    </div>
  )
}

export default App
