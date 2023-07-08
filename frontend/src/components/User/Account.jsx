import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import defaultAvatar from '../../assets/cyclist_4_color_transparent.png'

const baseUrl = 'http://192.168.86.27:5000'

const Account = ({isLoggedIn}) => {
  const [accountData, setAccountData] = useState(null);
  const [watchlistData, setWatchlistData] = useState([]);
  const [showWatchlists, setShowWatchlists] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAccount = async () => {
      console.log(isLoggedIn);
      if (!isLoggedIn) {
        navigate('/login'); // Redirect to login page if not logged in
        return;
      }

      const token = localStorage.getItem('token');
      const credentials = btoa(`${token}:unused`);

      try {
        const response = await axios.get(baseUrl + '/user/account', {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        });

        setAccountData(response.data);
      } catch (error) {
        console.error(error);
        // Handle the error
      }

      try {
        const response = await axios.get(baseUrl + '/api/v1/watchlists', {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        });

        setWatchlistData(response.data.data);
        console.log(response.data);
        console.log(watchlistData);
      } catch (error) {
        console.error(error);
        // Handle the error
      }
    };

    getAccount();
  }, [isLoggedIn, navigate]); // Empty dependency array to run the effect only once

  const handleShowWatchlists = () => {
    setShowWatchlists(!showWatchlists);
  };

  return (
    <div className="flex m-4 justify-center items-top h-screen">
      <div className="sm:w-1/3 p-8 bg-white rounded shadow">
        {accountData ? (
          <>
            <div className="flex items-center mb-4">
              <img
                src={defaultAvatar}
                alt="Avatar"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-3xl text-primary-950 font-bold">
                  {accountData.username}
                </h2>
                <p className="text-gray-600 text-l">{accountData.role}</p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-xl text-primary-950 font-bold mr-2">🧙‍♂️ Oralce Rating:</p>
              <span role="img" aria-label="Bearded Wizard" className="text-xl">
                {accountData.rank} 
              </span>
            </div>
            <div className="flex items-center">
              <p className="text-xl text-primary-950 font-bold mr-2">
                Member Since:
              </p>
              <p className="text-m ml-2">{accountData.member_since}</p>
            </div>
            <Link
              to="#"
              onClick={handleShowWatchlists}
              className="text-primary-950 hover:text-primary-500 mt-4"
            >
              Saved Watchlists
            </Link>
            {showWatchlists && watchlistData.length > 0 && (
              <div className="mt-4 p-2 shadow-lg">
                <h3 className="text-l font-bold text-primary-950">Watchlists:</h3>
                <ul>
                  {watchlistData.map((watchlist) => (
                    <li key={watchlist.id}>{watchlist.watchlist_name}</li>
                  ))}
                </ul>
              </div>
            )}
            {showWatchlists && watchlistData.length === 0 && (
              <p>You have no saved watchlists.</p>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Account;
