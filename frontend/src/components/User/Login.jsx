import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../Widgets/Toast';
import { makeToast_ } from '../../lib/toast/toast_utils';

import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../../features/authSlice';



const Login = ({ updateLoggedInStatus }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  const makeToast = makeToast_(setShowToast,setToastType, setToastMessage)
  
  
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
      makeToast('Wrong username or password','error')
    }

    if(isSuccess){
      makeToast('Welcome bro','success')

      //updateLoggedInStatus might be not needed and we can just use the slice
      updateLoggedInStatus(true)
      navigate('/api/v1/session')
    }


    //allows for multiple attempts
    dispatch(reset())
  },[user, isError, isSuccess, message, navigate, dispatch])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full sm:w-auto p-8 bg-transparent rounded shadow">
        <h2 className="text-2xl text-primary-950 font-bold mb-4">Login</h2>
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
          <div className="flex justify-between mb-4">
            <div>
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <Link to="/reset-request" className="text-primary-950 hover:text-primary-500">
               Forgot your password?
              </Link>
          </div>
          <div className="flex justify-between">
            <button type="submit" className="btn-alt">
              Login
            </button>
            <p className="text-center text-gray-600 mt-4 p-2">
              Need an account?{' '}
              <Link to="/register" className="text-primary-950 hover:text-primary-500">
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
