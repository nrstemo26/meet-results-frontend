import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../../features/authSlice';
import { toast } from 'react-toastify'
import { updateMetaTags } from '../../lib/seo_utils';

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const pageTitle = 'Register - Lift Oracle';
  const descriptionContent = 'Register to gain access to exclusive Lift Oracle features. Track athletes by saving watchlists, pump your Oracle Rating, and more.';
  
  const {user, isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth)

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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (userData.password !== userData.confirmPassword) {
      toast.error('Password and password confirmation do not match.')
    }else{
      let response = await dispatch(register(userData));
      console.log(response);
    }
  };
  
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    
    if(isSuccess){
      toast.success('Thank you for registering. Check your email to confirm your account.')
      navigate('/login')
    }

    dispatch(reset())
  },[user, isError, isSuccess, message, navigate, dispatch])
  
  return (
    <div className="flex justify-center items-center h-screen">
      {updateMetaTags(pageTitle, descriptionContent)}
      <div className="w-full sm:w-auto p-8 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl text-primary-950 font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
              value={userData.username}
              onChange={(e) => updateUser(e, 'username')}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
              value={userData.email}
              onChange={(e) => updateUser(e,'email')}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
              value={userData.password}
              onChange={(e) => updateUser(e, 'password')}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
              value={userData.confirmPassword}
              onChange={(e) => updateUser(e, 'confirmPassword')}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              id="role"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
              value={userData.role}
              onChange={(e) => updateUser(e, 'role')}
              required
            >
              <option value="">Select Role</option>
              <option value="Athlete">Athlete</option>
              <option value="Coach">Coach</option>
              <option value="Curious Individual">Curious Individual</option>
            </select>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="agreeTerms"
              className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
              checked={userData.agreeTerms}
              value={userData.agreeTerms}
              onChange={(e) => updateCheckbox(e)}
              required
            />
            <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-700">
              I agree to the terms and conditions
            </label>
          </div>
          <div className="space-y-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Register
            </button>
            <p className="text-center text-sm text-gray-600">
              Already registered?{' '}
              <Link to="/login" className="text-primary-500 hover:text-primary-600">
                Log in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

