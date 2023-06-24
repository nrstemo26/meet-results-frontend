import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Confirmation = () => {
  const { token } = useParams();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const confirmToken = async () => {
      try {
        const response = await fetch(`/user/confirm/${token}`, {
          method: 'PUT',
        });
        const data = await response.json();
        if (response.ok) {
          setIsConfirmed(true);
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        console.error('Confirmation error:', error);
        setErrorMessage('An error occurred during confirmation.');
      }
    };

    confirmToken();
  }, [token]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 p-8 bg-white rounded shadow">
        <h2 className="text-2xl text-primary-950 font-bold mb-4">Confirmation</h2>
        {isConfirmed ? (
          <p className="text-green-500">Your account has been successfully confirmed.</p>
        ) : (
          <p className="text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Confirmation;
