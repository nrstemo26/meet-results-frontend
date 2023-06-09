import React, { useState } from 'react';
import axios from 'axios'
import Toast from './Toast';

const baseUrl = 'http://192.168.86.27:5000'
// const baseUrl = 'http://98.144.49.136:5000'

const FeatureRequest = () => {
  const [showModal, setShowModal] = useState(false);
  const [requestText, setRequestText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [accountData, setAccountData] = useState(null);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRequestText('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const credentials = btoa(`${token}:unused`);
    const feature_request = requestText

    try {
      const response = await axios.post(baseUrl + '/user/feature-request', 
        { feature_request },
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );
      console.log(response.data); // Handle the response as needed
      setToastMessage('TY. The Oracle appreciates your feedback.');
      setToastType('success')
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setToastMessage('');
      }, 5000);
  
      // Redirect or perform any other actions after successful registration
    } catch (error) {
      console.error(error);
      setToastMessage('Only registered users can submit a feature request.');
      setToastType('warning')
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setToastMessage('');
      }, 5000);
      // Handle the error
    }

    handleCloseModal();
  };

  return (
    <div>
      <div className="fixed bottom-0 right-0 mb-8 mr-8">
        <button 
          className="text-sm btn-alt" 
          onClick={handleOpenModal}>Request a feature.
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded p-8 shadow-lg relative">
            <span 
              className="absolute top-0 right-0 mt-4 mr-4 p-2 cursor-pointer" 
              style={{ transform: 'translate(50%, -50%)' }}
              onClick={handleCloseModal}>&times;
            </span>
            <p className="text-xl font-bold text-primary-950">Feature Request</p>
            <p className="mb-4 text-slate-500 font-medium">Sure yeah, submit bugs too.</p>
            <form onSubmit={handleSubmit}>
              <textarea
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
                placeholder="Beep boop."
                required
                className="w-full h-24 p-2 border border-primary-200 rounded mb-4"  
              ></textarea>
              <button className="text-sm btn-alt" type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} type={toastType} />
      )}
    </div>
  );
};

export default FeatureRequest;
