import './App.css'
import Header from './components/Header'
import MeetDashboard from './components/MeetDashboard/MeetDashboard'
// import MobileNav from './components/MobileNav'

function App() {
  

  return (
  //   <div className='bg-slate-500 h-full  '>
    <div className='h-full'>
      <Header isMobile={true}/>
      <MeetDashboard></MeetDashboard>
      {/* <MobileNav/> */}


    </div>
  )
}

export default App
