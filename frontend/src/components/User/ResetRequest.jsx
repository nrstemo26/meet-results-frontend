import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../config';
import {toast} from 'react-toastify'

const RequestReset = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(baseUrl + '/user/reset-request', { email: email });
      console.log(response.data); // Handle the response as needed
      toast.success(response.data.message);
    
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    
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
    </div>
  );
};

export default RequestReset;
