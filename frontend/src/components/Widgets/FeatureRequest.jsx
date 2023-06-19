import React, { useState } from 'react';

const FeatureRequest = () => {
  const [showModal, setShowModal] = useState(false);
  const [requestText, setRequestText] = useState('');

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
  };

  return (
    <div>
      <div className="fixed bottom-0 right-0 mb-8 mr-8">
        <button 
          className="m-1 border-2 rounded-sm p-2 border-primary-950  bg-white text-primary-600 hover:bg-primary-950 hover:text-white hover:border-primary-400" 
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
            <p className="mb-4 text-slate-500 font-medium">Yeah, bugs too.</p>
            <form onSubmit={handleSubmit}>
              <textarea
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
                placeholder="Beep boop."
                required
                className="w-full h-24 p-2 border border-primary-200 rounded mb-4"  
              ></textarea>
              <button className="m-1 border-2 rounded-sm p-2 border-primary-950  bg-white text-primary-600 hover:bg-primary-950 hover:text-white hover:border-primary-400" type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureRequest;
