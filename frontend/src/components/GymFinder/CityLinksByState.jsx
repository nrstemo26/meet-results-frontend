import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../config';

const CityLinksByState = () => {
  const [citiesByState, setCitiesByState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedState, setExpandedState] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${baseUrl}/v1/gymfinder/cities`);
        setCitiesByState(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const toggleState = (state) => {
    setExpandedState(expandedState === state ? null : state);
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filterStates = () => {
    if (!searchTerm) return Object.keys(citiesByState);
    
    return Object.keys(citiesByState).filter(state => 
      state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      citiesByState[state].some(city => 
        city.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-950"></div>
        <span className="ml-2 text-gray-600">Loading cities...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-700">Error loading cities: {error}</p>
      </div>
    );
  }

  const filteredStates = filterStates();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-primary-950">Find Weightlifting Gyms by Location</h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search states or cities..." 
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 pl-10"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {filteredStates.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No states or cities found matching "{searchTerm}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredStates.map((state) => (
            <div
              key={state}
              className={`bg-white shadow-md rounded-lg p-4 cursor-pointer transition-all duration-200 ${expandedState === state ? 'ring-2 ring-primary-950' : 'hover:shadow-lg'}`}
              onClick={() => toggleState(state)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold text-primary-950">{state}</h3>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${expandedState === state ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              <div className={`mt-2 overflow-hidden transition-all duration-300 ${expandedState === state ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-2 border-t border-gray-100">
                  <ul className="space-y-1">
                    {citiesByState[state]
                      .filter(city => !searchTerm || city.city.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((city) => (
                        <li key={city.city} className="text-sm">
                          <Link
                            to={`/weightlifting-gym/${city.city}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors block py-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {city.city}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityLinksByState;
