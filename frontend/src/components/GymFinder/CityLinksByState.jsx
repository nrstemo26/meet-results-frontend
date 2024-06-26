import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../config';

const CityLinksByState = () => {
  const [citiesByState, setCitiesByState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedState, setExpandedState] = useState(null);

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

  if (loading) {
    return <p>Loading cities...</p>;
  }

  if (error) {
    return <p>Error loading cities: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-lg font-bold mb-6 text-primary-950">Find Weightlifting Gyms by State</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {Object.keys(citiesByState).map((state) => (
          <div
            key={state}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
            onClick={() => toggleState(state)}
            onMouseEnter={() => setExpandedState(state)}
            onMouseLeave={() => setExpandedState(null)}
          >
            <h2 className="text-md font-semibold mb-4 text-primary-950">{state}</h2>
            {expandedState === state && (
              <ul>
                {citiesByState[state].map((city) => (
                  <li key={city.city} className="mb-2 text-xs">
                    <Link
                      to={`/weightlifting-gym/${city.city}`}
                      className="text-blue-600 hover:underline"
                    >
                      {city.city}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityLinksByState;
