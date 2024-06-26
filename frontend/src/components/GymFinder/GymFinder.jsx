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

const GymFinder = () => {
  const { cityName } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const pageTitle = cityName
    ? `Find Weightlifting Gyms in ${cityName} - Lift Oracle`
    : 'Find an Olympic Weightlifting Gym Near You - Lift Oracle';

  const pageDescription = cityName
    ? `Discover the best weightlifting gyms in ${cityName}. Find the perfect place to train with GymFinder by Lift Oracle.`
    : 'Looking for a weightlifting gym near you? Use GymFinder by Lift Oracle to find the best gyms in your area.';

  return (
    <GoogleMapsLoader>
      <div className="flex flex-col items-center">
        {updateMetaTags(pageTitle, pageDescription)}
        <h1 className="text-2xl font-bold mt-8 m-2 mb-4 text-primary-950">
          {cityName ? `Find an Olympic Weightlifting Gym in ${cityName}` : 'Find an Olympic Weightlifting Gym Near You'}
        </h1>
        <p className="text-gray-700 m-4 text-sm">
          {cityName ? `Going on vacation, traveling for work, or moving to ${cityName} and need a place to train? Do your due dili on cost, coaching, vibes, and more.` : 'Going on vacation, traveling for work, or moving and need a place to train? Do your due dili on cost, coaching, vibes, and more.'}</p>
        <div className="col-span-1 flex flex-col items-center">
          <button
            onClick={openModal}
            className="bg-primary-950 text-white px-4 py-2 rounded-md hover:bg-primary-500"
          >
            Add Your Gym!
          </button>
        </div>
        <div className="p-4 w-full">
          <MapComponent cityName={cityName} />
        </div>
        <CityLinksByState />
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Add Gym"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-full overflow-y-auto relative">
          <button
            onClick={closeModal}
            className="absolute top-0 right-0 mt-4 mr-4 sm:mt-8 sm:mr-8 text-primary-950 sm:text-white hover:text-primary-500"
          >
            <FaTimes />
          </button>
          <AddGym closeModal={closeModal} />
        </div>
      </Modal>
    </GoogleMapsLoader>
  );
};

export default GymFinder;
