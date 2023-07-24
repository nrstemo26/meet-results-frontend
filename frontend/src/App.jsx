import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import { ToastContainer} from 'react-toastify'

import Main from './components/Main'
import Navbar from './components/Navbar/Navbar'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <Router>
      <div className={`${isSidebarOpen ? 'overflow-hidden':""} font-serif h-full `}>
        {/* get rid of is logged in by having the user slice? */}
        <Navbar setIsSidebarOpen={setIsSidebarOpen}  />
        
        {/* this can get passed props if we need stuff to go from navbar---> main */}
        <Main />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
    </Router>
  )
}

export default App