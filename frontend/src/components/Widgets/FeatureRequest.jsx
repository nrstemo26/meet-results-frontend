import React, { useState } from 'react';
import Toast from './Toast';

const FeatureRequest = () => {
  const [showModal, setShowModal] = useState(false);
  const [requestText, setRequestText] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRequestText('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send feature request to '/feature-request' endpoint
    console.log('Submitting feature request:', requestText);
    handleCloseModal();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
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
        <Toast message="TY. The Oracle appreciates your feedback." onClose={() => setShowToast(false)} type="success" />
      )}
    </div>
  );
};

export default FeatureRequest;
