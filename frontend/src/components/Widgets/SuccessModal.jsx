import React from 'react';

/**
 * Success Modal for payment confirmation
 * Shows different content based on whether a new account was created or existing account was updated
 * @param {Object} props
 * @param {string} props.accountStatus - 'new' or 'existing'
 * @param {Object} props.credentials - contains email and password for new accounts
 * @param {Function} props.onClose - function to close the modal
 */
const SuccessModal = ({ accountStatus, credentials, onClose }) => {
  const handleCopyToClipboard = () => {
    if (!credentials) return;
    
    const text = `Email: ${credentials.email}\nPassword: ${credentials.password}`;
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Credentials copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy credentials:', err);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-primary-800">
          {accountStatus === 'new' ? 'Welcome to Lift Oracle Pro!' : 'Pro Subscription Added!'}
        </h2>
        
        {accountStatus === 'new' ? (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Your account credentials:</p>
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <p><span className="font-medium">Email:</span> {credentials?.email}</p>
              <p><span className="font-medium">Password:</span> {credentials?.password}</p>
            </div>
            <button
              onClick={handleCopyToClipboard}
              className="text-primary-600 hover:text-primary-700 mt-2 text-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Copy to Clipboard
            </button>
            <p className="mt-4 text-sm text-gray-700">
              A welcome email with your credentials has also been sent to your email address.
              Please save your password in a secure location.
            </p>
          </div>
        ) : (
          <p className="text-primary-700 mb-4">
            Your Pro subscription has been added to your existing account.
            You can now access all Pro features!
          </p>
        )}
        
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-md py-2 font-medium transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal; 