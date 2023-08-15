import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../config';


const Confirmation = () => {
  // const { token } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  // console.log(token);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const confirmToken = async () => {
      try {
        const response = await axios.put(baseUrl + `/api/v1/user/confirm/${token}`);
        if (response.status === 201) {
          setIsConfirmed(true);
          navigate('/login');
        } else {
          setErrorMessage(response.data.message);
          navigate('/login');
        }
      } catch (error) {
        console.error('Confirmation error:', error);
        setErrorMessage('An error occurred during confirmation.');
        navigate('/');
      }
    };

    confirmToken();
  }, [token]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="sm:w-1/3 p-8 bg-white rounded shadow">
        <h2 className="text-2xl text-primary-950 font-bold mb-4">Confirmation</h2>
        {isConfirmed ? (
          <p className="text-green-800">Your account has been successfully confirmed.</p>
        ) : (
          <p className="text-primary-950">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Confirmation;
