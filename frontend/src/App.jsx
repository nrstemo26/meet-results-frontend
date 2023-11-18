import 'react-toastify/dist/ReactToastify.css';
import favicon from './assets/oracle_favicon.png';
import './App.css'
import { Helmet } from 'react-helmet';
import { baseUrl } from './config';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import { ToastContainer} from 'react-toastify'

import Main from './components/Main'
import Navbar from './components/Navbar/Navbar'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const ogImageUrl = `${baseUrl}/static/images/oracle_sleeveless.png`;

  useEffect(() => {
    // Find the existing favicon element
    const link = document.querySelector("link[rel~='icon']");
    if (!link) {
      // Create a new link element if it does not exist
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = favicon;
      document.head.appendChild(newLink);
    } else {
      // Update the existing link element
      link.href = favicon;
    }
  }, []);

  return (
    <Router>
      <Helmet>
        <meta property="og:image" content={ogImageUrl} />
      </Helmet>
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