import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MapComponent from './MapComponent';
import AddGym from './AddGym';
import CityLinksByState from './CityLinksByState';
import GoogleMapsLoader from './GoogleMapsLoader';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import Helmet from 'react-helmet';
import { updateMetaTags } from '../../lib/seo_utils';

// Set app element for accessibility
if (typeof window !== 'undefined') {
  Modal.setAppElement('#root');
}

const GymFinder = () => {
  const { cityName } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  // Switch to map view when city changes
  useEffect(() => {
    if (cityName) {
      setViewMode('map');
    }
  }, [cityName]);

  const pageTitle = cityName
    ? `Find Weightlifting Gyms in ${cityName} - Lift Oracle`
    : 'Find an Olympic Weightlifting Gym Near You - Lift Oracle';

  const pageDescription = cityName
    ? `Discover the best weightlifting gyms in ${cityName}. Find the perfect place to train with GymFinder by Lift Oracle.`
    : 'Looking for a weightlifting gym near you? Use GymFinder by Lift Oracle to find the best gyms in your area.';

  return (
    <GoogleMapsLoader>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {updateMetaTags(pageTitle, pageDescription)}
        
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-950 mb-4">
            {cityName ? `Find an Olympic Weightlifting Gym in ${cityName}` : 'Find an Olympic Weightlifting Gym Near You'}
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto mb-6">
            {cityName 
              ? `Going on vacation, traveling for work, or moving to ${cityName} and need a place to train? Find the perfect Olympic weightlifting gym with information on cost, coaching, equipment, and more.` 
              : 'Going on vacation, traveling for work, or moving and need a place to train? Find the perfect Olympic weightlifting gym with information on cost, coaching, equipment, and more.'}
          </p>
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
    </GoogleMapsLoader>
  );
};

export default GymFinder;
