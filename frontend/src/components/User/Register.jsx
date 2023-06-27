import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'
import Toast from '../Widgets/Toast';
import { makeToast_ } from '../../lib/toast/toast_utils';

const baseUrl = 'http://192.168.86.27:5000'


const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    agreeTerms: false,
  })

  const updateCheckbox = (e)=>{
    setUserData((userData)=>({
      ...userData,
      agreeTerms: e.target.checked
    }))
    
    
  }
  
  const updateUser = (e, property)=>{
    e.preventDefault()
    setUserData((userData)=>({
      ...userData,
      [property]: e.target.value
    }))
    
  }

  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  //initialize make toast to bind the toast state to the function
  const makeToast = makeToast_(setShowToast,setToastType, setToastMessage)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      //we call makeToast with a msg and a type
      makeToast('Password and password confirmation do not match.', false)
    }else{
      try {
        const response = await axios.post(baseUrl + '/user/register', userData);
        console.log(response.data); // Handle the response as needed
        makeToast('Thank you for registering. Check your email to confirm your account.','success')
        // Redirect or perform any other actions after successful registration
      } catch (error) {
        console.error(error);
        // makeToast(error.response.data.message, false, setShowToast, setToastType, setToastMessage)
        makeToast(error.response.data.message, false)
      }
    }

    console.log(userData);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full sm:w-auto p-8 bg-white rounded shadow">
        <h2 className="text-2xl text-primary-950 font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-300 rounded px-3 py-2"
              // value={username}
              value={userData.username}
              // onChange={(e) => setUsername(e.target.value)}
              onChange={(e) => updateUser(e, 'username')}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={userData.email}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={(e) => updateUser(e,'email')}
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
          <div className="mb-4">
            <label htmlFor="role" className="block font-medium mb-1">
              Role
            </label>
            <select
              id="role"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={userData.role}
              onChange={(e) => updateUser(e, 'role')}
              required
            >
              <option value="">Select Role</option>
              <option value="athlete">Athlete</option>
              <option value="coach">Coach</option>
              <option value="curious">Curious Individual</option>
            </select>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="agreeTerms"
              className="mr-2"
              checked={userData.agreeTerms}
              value={userData.agreeTerms}
              onChange={(e) => updateCheckbox(e)}
              required
            />
            <label htmlFor="agreeTerms">
              I agree to the terms and conditions
            </label>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-primary-500 hover:bg-blue-950 text-white py-2 px-4 rounded"
            >
              Register
            </button>
            <p className="text-center text-gray-600 mt-4">
              Already registered?{' '}
              <Link to="/login" className="text-primary-500">
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

export default Register;
