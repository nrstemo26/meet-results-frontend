import 'react-toastify/dist/ReactToastify.css';
import favicon from './assets/oracle_favicon.png';
import './App.css'
import { Helmet } from 'react-helmet';
import { baseUrl } from './config';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router} from 'react-router-dom';
import { ToastContainer} from 'react-toastify'
import { updateMetaTags } from './lib/seo_utils';
import Main from './components/Main';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Widgets/Footer';
import ProCard from './components/Widgets/ProCard'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  // const ogImageUrl = `${baseUrl}/static/images/oracle_sleeveless.png`;
  const pageTitle = 'Lift Oracle';
  const descriptionContent = 'Olympic weightlifting competition results and statistics. Snatch, clean and jerk, and total stats covering 54,000+ events and 5,000+ athletes.';

  return (
    <Router>
      {/* <Helmet>
        <meta property="og:image" content={ogImageUrl} />
      </Helmet> */}
      {updateMetaTags(pageTitle, descriptionContent)}
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
      <Footer/>
    </Router>
  )
}

export default App