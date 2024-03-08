import 'react-toastify/dist/ReactToastify.css';
import favicon from './assets/oracle_favicon.png';
import './App.css'
import { Helmet } from 'react-helmet';
import { baseUrl } from './config';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, useLocation} from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import Footer from './components/Widgets/Footer'
import Main from './components/Main'
import Navbar from './components/Navbar/Navbar'


function RouteChangeListener() {
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    let pageTitle;

    // Predefined titles for specific paths
    const predefinedTitles = {
      login: 'Login - Lift Oracle',
      register: 'Register - Lift Oracle',
      about: 'About - Lift Oracle',
      account: 'Account - Lift Oracle',
      athletes: 'Lifters - Lift Oracle',
      meets: 'Meets - Lift Oracle',
      watchlist: 'Watchlist - Lift Oracle'
      // Add more predefined paths and titles as needed
    };

    if (pathSegments.length === 0) {
      pageTitle = 'Lift Oracle'; // Default title for the home page
    } else if (predefinedTitles[pathSegments[0]]) {
      // Use predefined title if path matches
      pageTitle = predefinedTitles[pathSegments[0]];
    } else if (pathSegments.length > 1) {
      // Handle dynamic paths like /athlete/Nathan%20Stemo or /meet/Brew%20City%20Open
      pageTitle = decodeURIComponent(pathSegments[1]).replace(/\+/g, ' ');
      pageTitle = `${pageTitle} - Lift Oracle`
    } else {
      // Capitalize the first letter of the path segment for other paths
      pageTitle = pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1);
    }

    document.title = pageTitle;
  }, [location]);

  return null; // This component doesn't render anything
}


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const ogImageUrl = `${baseUrl}/static/images/oracle_sleeveless.png`;

  return (
    <Router>
      <RouteChangeListener />
      <Helmet>
        <meta property="og:image" content={ogImageUrl} />
      </Helmet>
      <div className={`${isSidebarOpen ? 'overflow-hidden':""} font-serif h-full `}>
        {/* get rid of is logged in by having the user slice? */}
        <Navbar setIsSidebarOpen={setIsSidebarOpen}  />
        
        {/* this can get passed props if we need stuff to go from navbar---> main */}
        <Main />
        <Footer />
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