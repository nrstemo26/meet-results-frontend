import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TiDeleteOutline } from 'react-icons/ti'
import defaultAvatar from '../../assets/cyclist_4_color_transparent.png'
import {toast} from 'react-toastify'

import { baseUrl } from '../../config';
import { useSelector } from 'react-redux';
import { rankToTitle } from '../../lib/account_utils';
import OracleRatings from '../Widgets/OracleRatings';


const Account = () => {
  const user = useSelector((state)=> state.auth.user)

  const [accountData, setAccountData] = useState(null);
  const [watchlistData, setWatchlistData] = useState([]);
  const [showWatchlists, setShowWatchlists] = useState(false);
  const [selectedWatchlist, setSelectedWatchlist] = useState(null);
  const [billingPortalUrl, setBillingPortalUrl] = useState('');
  const [newUsername, setNewUsername] = useState('');

  
  const navigate = useNavigate();

  useEffect(() => {
    const getAccount = async () => {
      // console.log(isLoggedIn);
      if (!user) {
        navigate('/login'); // Redirect to login page if not logged in
        return;
      }

      const token = localStorage.getItem('token');
      const credentials = btoa(`${token}:unused`);

      try {
        const response = await axios.get(`${baseUrl}/v1/user/account`, {

          headers: {
            Authorization: `Basic ${credentials}`,
          },
        });

        setAccountData(response.data);

        if (response.data.pro) {
          try {
            const billingResponse = await axios.get(`${baseUrl}/v1/user/create-customer-portal-session`, {
              headers: {
                Authorization: `Basic ${credentials}`,
              },
            });
            
            setBillingPortalUrl(billingResponse.data.billing_portal_url);
          } catch (billingError) {
            console.error(billingError);
            // Handle the error
          }
        }

      } catch (error) {
        console.error(error);
        // Handle the error
      }

      try {
        const response = await axios.get(`${baseUrl}/v1/watchlists`, {
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
  }, [navigate]); // Empty dependency array to run the effect only once

  const handleUsernameChange = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const credentials = btoa(`${token}:unused`);
    
    try {
      const response = await axios.put(`${baseUrl}/v1/user/update-username/`, {
        username: newUsername,
      }, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      // Update local state if necessary
      setAccountData({...accountData, username: newUsername});
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || 'Failed to update username.');
    }
  };

  const handleShowWatchlists = () => {
    setShowWatchlists(!showWatchlists);
  };

  const handleDelete = (watchlistId) =>{
    const updatedWatchlistData = watchlistData.filter(
      (watchlist) => watchlist.watchlist_id !== watchlistId
    );
    setWatchlistData(updatedWatchlistData);

    const token = localStorage.getItem('token');
    const credentials = btoa(`${token}:unused`);

    axios.delete(`${baseUrl}/v1/watchlist/${watchlistId}`, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    })
      .then((response) => {
        // Handle the successful delete response
        toast(response.data.message)
      })
      .catch((error) => {
        console.error(error);
        // Handle the error
      });
    }

  const handleWatchlistClick = (watchlist) => {
    if (selectedWatchlist === watchlist) {
      setSelectedWatchlist(null);
    } else {
      setSelectedWatchlist(watchlist);
    }
  };

  return (
    <div className="flex m-4 justify-center items-top h-full">
      <div className="lg:w-1/3 p-8 bg-white rounded shadow">
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
              <p className="lg:text-xl text-primary-950 font-bold mr-2">🧙‍♂️ Oracle Rating:</p>
              <span role="img" aria-label="Bearded Wizard" className="text-l">
                {accountData.rank} 
              </span>
              <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-950 text-xs font-bold rounded">
                {rankToTitle(accountData.rank)}
              </span>
            </div>
            <div className="flex items-center">
              <p className="lg:text-xl text-primary-950 font-bold mr-2">
                Member Since:
              </p>
              <p className="text-sm lg:text-base ml-2">{accountData.member_since}</p>
            </div>
            <div className="flex items-center">
              <p className="lg:text-xl text-primary-950 font-bold mr-2">
                Tier: 
              </p>
              {accountData.pro ? (
                <>
                  <span className="text-primary-950 text-m mr-2">Pro</span>
                </>
              ) : (
                <>
                  <span className="text-primary-950 text-md">Free</span>
                </>
              )}
            </div>
            <div className="flex flex-col">
              {accountData.pro ? (
                <>
                  <a
                    href={billingPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 text-md hover:text-primary-950 mt-4"
                  >
                    Manage Subscription
                  </a>
                </>
              ) : (
                <>
                  <a
                    href={`https://buy.stripe.com/test_eVabIUde12AG0w06op?prefilled_email=${accountData.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 text-md hover:text-primary-950 mt-4"
                  >
                    Upgrade to Pro
                  </a>
                </>
              )}
              <Link
                to={{
                  pathname: '/reset-request',
                  search: `?email=${accountData.email}`,
                }}
                className="text-primary-400 hover:text-primary-950 mt-2"
              >
                Request Password Reset
              </Link>
              <Link
                to="#"
                onClick={handleShowWatchlists}
                className="text-primary-400 hover:text-primary-950 mt-2"
              >
                Saved Watchlists
              </Link>
              <form onSubmit={handleUsernameChange} className="mt-4">
                {/* <label htmlFor="newUsername" className="block text-xs font-medium text-gray-700">
                  Change Username
                </label> */}
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="newUsername"
                    id="newUsername"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="p-2 focus:ring-primary-950 focus:border-primary-950 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                    placeholder="Change your username"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-950 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-950"
                >
                  Update Username
                </button>
              </form>
            </div>
            {showWatchlists && watchlistData.length > 0 && (
              <div className="mt-4 p-2 shadow-lg">
                <h3 className="text-l font-bold text-primary-950">Watchlists:</h3>
                <ul>
                  {watchlistData.map((watchlist) => (
                    <div className="flex flex-col">
                      <div className="flex justify-between flex-row">
                        <li 
                          onClick={() => handleWatchlistClick(watchlist)}
                          className="hover:text-primary-400 cursor-pointer" 
                          key={watchlist.id}
                        >
                            {watchlist.watchlist_name}
                        </li>
                        <div className="text-primary-950 hover:text-primary-400 cursor-pointer">
                          <TiDeleteOutline onClick={() => handleDelete(watchlist.watchlist_id)}/>
                        </div>
                        
                      </div>
                      {selectedWatchlist === watchlist && (
                        <div className="m-2">
                          <ul className="mb-2">
                            {watchlist.athletes.map((name, index) => (
                              <li key={index}>{name}</li>
                            ))}
                          </ul>
                          <Link to="#" className='btn border p-1 text-xs text-primary-950 border-primary-950 hover:bg-gradient-to-r hover:from-primary-950 hover:to-primary-500 hover:text-white hover:border-transparent'>Load Watchlist</Link>
                        </div>
                      )}
                    </div>
                    
                  ))}
                </ul>
              </div>
            )}
            {showWatchlists && watchlistData.length === 0 && (
              <p className="text-gray-700">You have no saved watchlists.</p>
            )}
            <div className="mt-8">
              <OracleRatings />
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Account;
