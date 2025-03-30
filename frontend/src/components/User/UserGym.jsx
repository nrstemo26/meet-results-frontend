import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../config';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const UserGym = () => {
  const [userGym, setUserGym] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);

  // Function to encode credentials for Basic Auth
  const getCredentials = () => {
    return btoa(`${token}:unused`);
  };

  useEffect(() => {
    const fetchUserGym = async () => {
      try {
        const response = await axios.get(`${baseUrl}/v1/user/gym`, {
          headers: { 
            Authorization: `Basic ${getCredentials()}`,
            "X-Requested-With": "XMLHttpRequest"
          }
        });
        setUserGym(response.data.data);
      } catch (error) {
        console.error('Error fetching user gym:', error);
        toast.error('Failed to load your gym. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserGym();
    }
  }, [token]);

  const handleRemoveGym = async () => {
    if (!userGym) return;
    
    try {
      await axios.delete(`${baseUrl}/v1/user/gym-association/${userGym.id}`, {
        headers: { 
          Authorization: `Basic ${getCredentials()}`,
          "X-Requested-With": "XMLHttpRequest"
        }
      });
      
      // Remove the gym from state
      setUserGym(null);
      toast.success('Gym association removed');
    } catch (error) {
      console.error('Error removing gym:', error);
      toast.error('Failed to remove gym. Please try again.');
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading your gym information...</div>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">My Home Gym</h2>
      
      {!userGym ? (
        <div>
          <p className="text-gray-500 italic mb-4">
            You haven't set your home gym yet. Find a gym in GymFinder and click "I train here!"
          </p>
          <Link 
            to="/weightlifting-gym-near-me" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-950 hover:bg-primary-700"
          >
            Find a Gym
          </Link>
        </div>
      ) : (
        <div className="border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{userGym.name}</h3>
              <p className="text-sm text-gray-600">{userGym.address}</p>
            </div>
            <button 
              onClick={handleRemoveGym}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove Gym
            </button>
          </div>
          
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Drop-in Fee:</span> ${userGym.drop_in_fee}
            </div>
            <div>
              <span className="text-gray-500">Monthly Rate:</span> ${userGym.monthly_rate}
            </div>
            {userGym.gym_type && (
              <div>
                <span className="text-gray-500">Type:</span> {userGym.gym_type}
              </div>
            )}
            {userGym.usaw_club && (
              <div>
                <span className="text-gray-500">USAW Club:</span> Yes
              </div>
            )}
          </div>
          
          {userGym.website && (
            <div className="mt-3">
              <a 
                href={userGym.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                Visit Website
              </a>
            </div>
          )}
          
          {userGym.athlete_count > 0 && (
            <div className="mt-3 text-sm text-gray-600">
              {userGym.athlete_count} {userGym.athlete_count === 1 ? 'user' : 'users'} trains here
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserGym;