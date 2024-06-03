import React, { useState } from 'react';
import MapComponent from './MapComponent';
import AddGym from './AddGym';
import GoogleMapsLoader from './GoogleMapsLoader';
import Modal from 'react-modal';

const GymFinder = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <GoogleMapsLoader>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mt-8 m-2 mb-4">Find an Olympic Weightlifting Gym Near You</h1>
        <p className="text-gray-700 m-4 text-sm">Going on vacation, traveling for work, or moving and need to find a place to train? Do your due dili on cost, coaching, vibes, and more.</p>
        <div className="col-span-1 flex flex-col items-center">
          <button
            onClick={openModal}
            className="bg-primary-950 text-white px-4 py-2 rounded-md hover:bg-primary-500"
          >
            Add Your Gym!
          </button>
        </div>
        <div className="flex justify-center w-full p-4">
          <div className="w-full sm:w-3/4">
            <MapComponent />
          </div>
        </div>
        <div className="col-span-1 flex flex-col items-center mt-4">
          <div
            onClick={openModal}
            className="text-primary-950 font-semibold hover:text-primary-500 cursor-pointer"
          >
            Missing/Incorrect data? Update Your Gym!
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Add Gym"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <button
            onClick={closeModal}
            className="absolute top-0 right-0 mt-4 mr-4 sm:mt-8 sm:mr-8 text-primary-950 sm:text-white hover:text-primary-500"
          >
            X
          </button>
          <AddGym closeModal={closeModal} />
        </div>
      </Modal>
    </GoogleMapsLoader>
    
  );
};

export default GymFinder;
