import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../Widgets/Toast';

const baseUrl = 'http://192.168.86.27:5000'
// const baseUrl = 'http://98.144.49.136:5000/api/v1/'


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(baseUrl + '/user/login', {
        username,
        password,
      });

      // Assuming the response includes a 'token' property
      const { token } = response.data;

      // Store the token in local storage or session storage
      localStorage.setItem('token', token);
      navigate('/api/v1/session');
      
      // e.g., navigate to a dashboard page
    } catch (error) {
      // Handle login error, display error message, etc.
      console.error(error);
      setToastMessage(error.response.data.message);
      setToastType('error')
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setToastMessage('');
      }, 5000);
    }

  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full sm:w-auto p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium mb-1">
              Username
            </label>
            <input
              type="username"
              id="username"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="rememberMe"
              className="mr-2"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-primary-500 hover:bg-primary-950 text-white py-2 px-4 rounded">
              Login
            </button>
            <p className="text-center text-gray-600 mt-4">
              Need an account?{' '}
              <Link to="/register" className="text-primary-500">
                Register here.
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

export default Login;
