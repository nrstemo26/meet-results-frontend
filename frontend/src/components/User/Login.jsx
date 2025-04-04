import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../../features/authSlice';
import { updateMetaTags } from '../../lib/seo_utils';

import {toast} from 'react-toastify'


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const pageTitle = 'Login - Lift Oracle';
  const descriptionContent = 'Securely access your account access exclusive Lift Oracle features. View saved watchlists, your Oracle Rating, and more.';

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
          username,
          password,
          rememberMe
    }
    await dispatch(login(userData))
  };

  useEffect(()=>{
    if(isError){
      toast.error('wrong username or password')
    }

    if(isSuccess){
      toast.success('welcome bruv')
      navigate('/watchlist')
    }

    dispatch(reset())
  },[user, isError, isSuccess, message, navigate, dispatch])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {updateMetaTags(pageTitle, descriptionContent)}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary-950">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username or email
              </label>
              <div className="mt-1">
                <input
                  type="username"
                  id="username"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  id="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">Remember me</label>
              </div>
              <Link to="/reset-request" className="text-sm text-primary-500 hover:text-primary-600">
                Forgot password?
              </Link>
            </div>
            <div className="space-y-4">
              <button 
                type="submit" 
                className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Sign in
              </button>
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary-500 hover:text-primary-600">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
