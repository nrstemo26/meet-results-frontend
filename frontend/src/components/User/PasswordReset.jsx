import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Toast from '../Widgets/Toast';
import { makeToast_ } from '../../lib/toast/toast_utils';

const baseUrl = 'http://192.168.86.27:5000';
// const baseUrl = 'http://98.144.49.136:5000';

const ResetPassword = () => {
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const [userData, setUserData] = useState({
    password: '',
    confirmPassword: '',
  });

  const updateUser = (e, property) => {
    e.preventDefault();
    setUserData((userData) => ({
      ...userData,
      [property]: e.target.value,
    }));
  };

  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  // initialize makeToast to bind the toast state to the function
  const makeToast = makeToast_(setShowToast, setToastType, setToastMessage);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      makeToast('Password and password confirmation do not match.', false);
    } else {
      try {
        const response = await axios.put(baseUrl + `/user/reset-password/${token}`, userData);
        console.log(response.data); // Handle the response as needed
        makeToast('Password reset successful.', 'success');
        navigate('/login');
      } catch (error) {
        console.error(error);
        makeToast(error.response.data.message, false);
      }
    }

    console.log(userData);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full sm:w-auto p-8 bg-white rounded shadow">
        <h2 className="text-2xl text-primary-950 font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={userData.password}
              onChange={(e) => updateUser(e, 'password')}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={userData.confirmPassword}
              onChange={(e) => updateUser(e, 'confirmPassword')}
              required
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="btn-alt">
              Reset Password
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

export default ResetPassword;
