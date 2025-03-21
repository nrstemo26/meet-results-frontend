import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TiDeleteOutline } from 'react-icons/ti'
import { FiUser } from 'react-icons/fi'
import {toast} from 'react-toastify'
import { updateMetaTags } from '../../lib/seo_utils';
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
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  const pageTitle = 'Account - Lift Oracle';
  const descriptionContent = 'Your Lift Oracle account. Manage subscription, load saved watchlists, track your Oracle Rating, and more.';
  
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
    <div className="min-h-screen bg-gray-50 py-8">
      {updateMetaTags(pageTitle, descriptionContent)}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 rounded-full border-4 border-primary-100 bg-primary-50 flex items-center justify-center">
                  <FiUser className="w-12 h-12 text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-primary-950">
                        {accountData?.username}
                      </h2>
                      <p className="text-gray-600 mt-1">{accountData?.role}</p>
                    </div>
                    <button
                      onClick={() => setIsEditingUsername(!isEditingUsername)}
                      className="text-primary-400 hover:text-primary-950 text-sm font-medium"
                    >
                      {isEditingUsername ? 'Cancel' : 'Edit Username'}
                    </button>
                  </div>
                  
                  {isEditingUsername && (
                    <form onSubmit={handleUsernameChange} className="mt-4">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          name="newUsername"
                          id="newUsername"
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                          placeholder="Enter new username"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🧙‍♂️</span>
                    <div>
                      <p className="text-sm text-gray-600">Oracle Rating</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-primary-950">
                          {accountData?.rank}
                        </span>
                        <span className="px-2 py-1 bg-primary-100 text-primary-950 text-xs font-bold rounded-full">
                          {rankToTitle(accountData?.rank)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="text-sm text-gray-600">Membership Tier</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-primary-950">
                          {accountData?.pro ? 'Pro' : 'Free'}
                        </span>
                        {!accountData?.pro && (
                          <a
                            href={`https://buy.stripe.com/test_eVabIUde12AG0w06op?prefilled_email=${accountData?.email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary-500 hover:text-primary-600"
                          >
                            Upgrade
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Watchlists Section */}
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-primary-950">Saved Watchlists</h3>
                <button
                  onClick={handleShowWatchlists}
                  className="text-primary-400 hover:text-primary-950 text-sm font-medium"
                >
                  {showWatchlists ? 'Hide Watchlists' : 'Show Watchlists'}
                </button>
              </div>
              
              {showWatchlists && (
                <div className="space-y-4">
                  {watchlistData.map((watchlist) => (
                    <div
                      key={watchlist.watchlist_id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => handleWatchlistClick(watchlist)}
                        >
                          <h4 className="font-medium text-primary-950">{watchlist.name}</h4>
                          <p className="text-sm text-gray-600">{watchlist.description}</p>
                        </div>
                        <button
                          onClick={() => handleDelete(watchlist.watchlist_id)}
                          className="text-red-400 hover:text-red-600"
                        >
                          <TiDeleteOutline className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Oracle Ratings Section */}
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-primary-950 mb-4">Leaderboard</h3>
              <OracleRatings />
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-primary-950 mb-2">Account Details</h3>
                <p className="text-sm text-gray-600">Member since {accountData?.member_since}</p>
                <p className="text-sm text-gray-600 mt-1">{accountData?.email}</p>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold text-primary-950 mb-2">Account Actions</h3>
                <div className="space-y-2">
                  {accountData?.pro && (
                    <a
                      href={billingPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-4 py-2 text-center bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                      Manage Subscription
                    </a>
                  )}
                  <Link
                    to={{
                      pathname: '/reset-request',
                      search: `?email=${accountData?.email}`,
                    }}
                    className="block w-full px-4 py-2 text-center text-primary-500 border border-primary-500 rounded-md hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Reset Password
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
