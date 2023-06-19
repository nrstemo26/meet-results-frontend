import React from 'react';

const Account = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 p-8 bg-white rounded shadow">
        <div className="flex items-center mb-4">
          <img
            src="avatar.jpg"
            alt="Avatar"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-xl text-primary-950 font-bold">nickystamos</h2>
            <p className="text-gray-600">Athlete</p>
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-l text-primary-950 font-bold mr-2">Oracle Rating:</p>
          <p className="text-m ml-2">1250</p>
        </div>
        <div className="flex items-center">
          <p className="text-l text-primary-950 font-bold mr-2">Rank:</p>
          <span role="img" aria-label="Bearded Wizard" className="text-xl">
            🧙‍♂️
          </span>
          <p className="text-m ml-2">Oracle</p>
        </div>
      </div>
    </div>
  );
};

export default Account;
