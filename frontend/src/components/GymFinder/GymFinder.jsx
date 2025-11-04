import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MapComponent from './MapComponent';
import AddGym from './AddGym';
import CityLinksByState from './CityLinksByState';
import CityGymStats from './CityGymStats';
import GoogleMapsLoader from './GoogleMapsLoader';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import Helmet from 'react-helmet';
import { updateMetaTags } from '../../lib/seo_utils';
import { toast } from 'react-toastify';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { toTitleCase } from '../../utils/stringUtils';
import { baseUrl, recaptchaSiteKey, siteUrl } from '../../config';

// Set app element for accessibility
if (typeof window !== 'undefined') {
  Modal.setAppElement('#root');
}

const GymFinder = () => {
  const { cityName } = useParams();
  const { stateName } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Get user state from Redux
  const { user } = useSelector((state) => state.auth);


  // Add diagnostic logging for render
  console.log(`[DIAGNOSTIC] GymFinder RENDER: cityName=${cityName}, viewMode=${viewMode}`);

  const openModal = () => {
    // Check if user is logged in
    if (user) {
      setIsModalOpen(true);
    } else {
      // Show login modal or redirect to login
      setIsLoginModalOpen(true);
    }
  };
  
  const closeModal = () => setIsModalOpen(false);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  
  // Switch to map view when city changes
  useEffect(() => {
    console.log(`[DIAGNOSTIC] GymFinder cityName changed to: ${cityName}`);
    if (cityName) {
      setViewMode('map');
    }
  }, [cityName]);

  // Then in your render function
  const formattedCityName = cityName ? toTitleCase(cityName) : '';
  const formattedStateName = stateName ? toTitleCase(stateName) : '';

  const pageTitle = formattedCityName
    ? `Find Weightlifting Gyms in ${formattedCityName}, ${formattedStateName} - Lift Oracle`
    : 'Find an Olympic Weightlifting Gym Near You - Lift Oracle';

  const pageDescription = formattedCityName
    ? `Discover the best weightlifting gyms in ${formattedCityName}, ${formattedStateName}. Find the perfect place to train with GymFinder by Lift Oracle.`
    : 'Looking for a weightlifting gym near you? Use GymFinder by Lift Oracle to find the best gyms in your area.';

  // Generate canonical URL
  const canonicalUrl = cityName && stateName
    ? `${siteUrl}/gyms/${encodeURIComponent(stateName)}/${encodeURIComponent(cityName)}`
    : `${siteUrl}/weightlifting-gym-near-me`;

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaSiteKey}
      scriptProps={{
        async: true, // Prefer async loading in production
        defer: true, // Use defer to improve page load speed
        appendTo: 'head',
        nonce: undefined, // Add nonce attribute if needed for CSP
      }}
      language="en"
      useEnterprise={false}
      onLoad={() => {
        console.log('reCAPTCHA loaded successfully with key:', 
          recaptchaSiteKey.substring(0, 6) + '...');
      }}
      onError={() => {
        console.error('reCAPTCHA failed to load');
        toast.error('Error loading security verification. Some features may not work properly.');
      }}
      // Add a longer timeout for slower connections
      timeoutMs={5000}
    >
      <GoogleMapsLoader>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {updateMetaTags(pageTitle, pageDescription, {
            canonical: canonicalUrl,
            ogType: 'website'
          })}
          
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-950 mb-4">
              {cityName ? `Find an Olympic Weightlifting Gym in ${formattedCityName}, ${formattedStateName}` : 'Find an Olympic Weightlifting Gym Near You'}
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto mb-6">
              {cityName 
                ? `Going on vacation, traveling for work, or moving to ${formattedCityName} and need a place to train? Find the perfect Olympic weightlifting gym with information on cost, coaching, equipment, and more.` 
                : 'Going on vacation, traveling for work, or moving and need a place to train? Find the perfect Olympic weightlifting gym with information on cost, coaching, equipment, and more.'}
            </p>

            {/* Add CityGymStats component when city is specified */}
            {cityName && <CityGymStats cityName={formattedCityName} stateName={formattedStateName} />}

            <button
              onClick={openModal}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-950 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Your Gym
            </button>
          </div>
          
          {/* Map Component */}
          <div className="mb-12">
            {console.log(`[DIAGNOSTIC] Rendering MapComponent with key: map-${cityName || 'default'}`)}
            <MapComponent 
              key={`map-${cityName || 'default'}`} 
              cityName={cityName}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          </div>
          
          {/* City Links Section */}
          <div className="bg-gray-50 py-8 px-4 rounded-lg shadow-inner">
            <CityLinksByState />
          </div>
        </div>
        
        {/* Add Gym Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Add Gym"
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-[9999]"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
          shouldCloseOnOverlayClick={true}
        >
          <div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative m-4">
            <button
              onClick={closeModal}
              className="absolute md:top-4 md:right-4 top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors p-2 bg-white rounded-full shadow-sm"
              aria-label="Close"
            >
              <FaTimes className="h-5 w-5" />
            </button>
            <AddGym closeModal={closeModal} />
          </div>
        </Modal>
        
        {/* Login Required Modal */}
        <Modal
          isOpen={isLoginModalOpen}
          onRequestClose={closeLoginModal}
          contentLabel="Login Required"
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-[9999]"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
          shouldCloseOnOverlayClick={true}
        >
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4 text-center">
            <h2 className="text-xl font-bold mb-4 text-primary-950">Login Required</h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to add or update gym information. This helps us maintain high-quality listings and prevent spam.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/login?redirect=gymfinder"
                className="px-6 py-2 bg-primary-950 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Log In
              </Link>
              <Link 
                to="/register?redirect=gymfinder"
                className="px-6 py-2 bg-white border border-primary-950 text-primary-950 rounded-md hover:bg-gray-50 transition-colors"
              >
                Register
              </Link>
              <button
                onClick={closeLoginModal}
                className="px-6 py-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </GoogleMapsLoader>
    </GoogleReCaptchaProvider>
  );
};

export default GymFinder;
