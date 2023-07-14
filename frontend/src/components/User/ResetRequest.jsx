import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Toast from '../Widgets/Toast';
import { makeToast_ } from '../../lib/toast/toast_utils';

const baseUrl = 'http://192.168.86.27:5000';
// const baseUrl = 'http://192.168.1.139:5000'
// const baseUrl = 'http://98.144.49.136:5000';

const RequestReset = () => {
  const [email, setEmail] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // initialize makeToast to bind the toast state to the function
  const makeToast = makeToast_(setShowToast, setToastType, setToastMessage);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(baseUrl + '/user/reset-request', { email: email });
      console.log(response.data); // Handle the response as needed
      // console.log(email);
      makeToast(response.data.message, response.data.status);
    } catch (error) {
      console.error(error);
      makeToast(error.response.data.message, error.response.data.status);
    }

    setEmail('');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full sm:w-auto p-8 bg-white rounded shadow">
        <h2 className="text-2xl text-primary-950 font-bold mb-4">Request Password Reset</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="btn-alt">
              Request Reset
            </button>
            <p className="text-center text-gray-600 mt-4 p-2">
              Remember your password?{' '}
              <Link to="/login" className="text-primary-950 hover:text-primary-500">
                Log in here.
              </Link>
            </p>
          </div>
        </form>
      </div>
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} type={toastType} />
      )}
    </div>
  );
};

export default RequestReset;
