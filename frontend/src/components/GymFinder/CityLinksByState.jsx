import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../config';
import { MbSpinnerGradient } from '../../pages/Spinners/MbSpinnerGradient';

const CityLinksByState = () => {
  const [citiesByState, setCitiesByState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedState, setExpandedState] = useState(null);
  const [expandedStates, setExpandedStates] = useState(new Set());
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
    // If we're using multi-expansion mode (with search)
    if (searchTerm) {
      setExpandedStates(prev => {
        const newSet = new Set(prev);
        if (newSet.has(state)) {
          newSet.delete(state);
        } else {
          newSet.add(state);
        }
        return newSet;
      });
    } else {
      // Traditional single-state expansion when not searching
      setExpandedState(expandedState === state ? null : state);
      setExpandedStates(new Set()); // Clear multi-expansion set
    }
  };
  
  // Find states with matching cities for auto-expansion
  const findStatesWithMatchingCities = useCallback((term) => {
    if (!term) return new Set();
    
    const matchingStates = new Set();
    Object.keys(citiesByState).forEach(state => {
      // Check if any city in this state matches the search term
      const hasMatchingCity = citiesByState[state].some(city => 
        city.city.toLowerCase().includes(term.toLowerCase())
      );
      
      // Only add states that have matching cities but don't match the state name itself
      // This way, we only auto-expand when cities are matching but state names aren't
      if (hasMatchingCity && !state.toLowerCase().includes(term.toLowerCase())) {
        matchingStates.add(state);
      }
    });
    
    return matchingStates;
  }, [citiesByState]);
  
  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    
    // Auto-expand states with matching cities when searching
    if (newSearchTerm) {
      const statesToExpand = findStatesWithMatchingCities(newSearchTerm);
      setExpandedStates(statesToExpand);
    } else {
      // When search is cleared, revert to single state expansion mode
      setExpandedStates(new Set());
    }
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
      <div className="flex justify-center items-center p-8 flex-col">
        <h1 className="text-xl font-bold mb-4 text-primary-950">Consulting the Oracle...</h1>
        <MbSpinnerGradient />
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
              className={`bg-white shadow-md rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                (searchTerm && expandedStates.has(state)) || expandedState === state 
                  ? 'ring-2 ring-primary-950' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => toggleState(state)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold text-primary-950">{state}</h3>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${
                    (searchTerm && expandedStates.has(state)) || expandedState === state 
                      ? 'transform rotate-180' 
                      : ''
                  }`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              <div className={`mt-2 overflow-hidden transition-all duration-300 ${
                (searchTerm && expandedStates.has(state)) || expandedState === state 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}>
                <div className="pt-2 border-t border-gray-100">
                  <ul className="space-y-1">
                    {citiesByState[state]
                      .filter(city => !searchTerm || city.city.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((city) => (
                        <li key={city.city} className="text-sm">
                          <Link
                            to={`/gym/${state.toLowerCase()}/${city.city.toLowerCase()}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors block py-1"
                            onClick={(e) => {
                              console.log(`[DIAGNOSTIC] City link clicked: ${city.city}`);
                              e.stopPropagation();
                            }}
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
