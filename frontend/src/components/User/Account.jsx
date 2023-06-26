import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://192.168.86.27:5000'

const Account = () => {
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    const getAccount = async () => {
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
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="flex m-4 justify-center items-top h-screen">
      <div className="w-1/3 p-8 bg-white rounded shadow">
        {accountData ? (
          <>
            <div className="flex items-center mb-4">
              <img
                src="avatar.jpg"
                alt="Avatar"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl text-primary-950 font-bold">
                  {accountData.username}
                </h2>
                <p className="text-gray-600">{accountData.role}</p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-l text-primary-950 font-bold mr-2">
                Oracle Rating:
              </p>
              <p className="text-m ml-2">{accountData.rating}</p>
            </div>
            <div className="flex items-center">
              <p className="text-l text-primary-950 font-bold mr-2">Rank:</p>
              <span role="img" aria-label="Bearded Wizard" className="text-xl">
                🧙‍♂️
              </span>
              <p className="text-m ml-2">{accountData.rank}</p>
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
