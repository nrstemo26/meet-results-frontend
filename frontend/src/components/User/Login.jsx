import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login form submission
    console.log('Login form submitted');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
    </div>
  );
};

export default Login;
