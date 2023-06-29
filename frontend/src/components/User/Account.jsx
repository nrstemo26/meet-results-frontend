import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import defaultAvatar from '../../assets/cyclist_4_color_transparent.png'

const baseUrl = 'http://192.168.86.27:5000'

const Account = ({isLoggedIn}) => {
  const [accountData, setAccountData] = useState(null);
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
    };

    getAccount();
  }, [isLoggedIn, navigate]); // Empty dependency array to run the effect only once

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
              <p className="text-xl text-primary-950 font-bold mr-2">
                Oracle Rating:
              </p>
              <p className="text-xl ml-2">{accountData.rating}</p>
            </div>
            <div className="flex items-center">
              <p className="text-xl text-primary-950 font-bold mr-2">Rank:</p>
              <span role="img" aria-label="Bearded Wizard" className="text-xl">
                {accountData.rank} 🧙‍♂️
              </span>
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
