import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle register form submission
    console.log('Register form submitted');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 p-8 bg-white rounded shadow">
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
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
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
    </div>
  );
};

export default Register;
