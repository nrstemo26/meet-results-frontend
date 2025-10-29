import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FiX } from "react-icons/fi";

import { baseUrl } from '../../config';

const FeatureRequest = () => {
  const user = useSelector((state) => state.auth.user);
  const [showModal, setShowModal] = useState(false);
  const [requestText, setRequestText] = useState('');

  const [accountData, setAccountData] = useState(null);

  const toggleModal = () => {
    setShowModal(state => !state);
    if (showModal === true) {
      setRequestText('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feature_request = requestText;

    // UPDATED: Use cookies instead of localStorage token
    if (user) {
      try {
        const response = await axios.post(
          baseUrl + '/v1/user/feature-request',
          { feature_request },
          {
            withCredentials: true,  // Send auth cookie
          }
        );
        console.log(response.data); // Handle the response as needed
        toast.info('TY. The Oracle appreciates your feedback.');

        // Redirect or perform any other actions after successful registration
      } catch (error) {
        console.error(error);
        toast.error('There was an error.');
      }

      toggleModal();
    } else {
      toast.error('Only registered users can submit a feature request. Please log in to submit a request.');
      toggleModal();
    }
  };

  return (
    <div>
      <div className="z-10">
        <div
          className="text-primary-950 hover:text-primary-500 font-bold cursor-pointer"
          onClick={toggleModal}
        >
          Request a feature (or report a bug).
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded p-6 shadow-lg relative max-w-md w-full mx-4">
            {/* Close button - fixed positioning and size */}
            <button 
              className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800 focus:outline-none z-10" 
              onClick={toggleModal}
              aria-label="Close"
            >
              <FiX size="24px" />
            </button>
            
            {/* Header with more space at top to avoid overlap with close button */}
            <div className="pt-2">
              <p className="text-lg font-bold text-primary-950 mt-2 mb-2">Feature Request / Bug Report</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <textarea
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
                placeholder="Describe your wildest dreams and deepest anxieties in excruciating detail... ty."
                required
                className="w-full h-24 p-2 border border-primary-200 rounded mb-4"
              ></textarea>
              <button className="block w-full px-4 py-2 text-center bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureRequest;