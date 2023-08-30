import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {  MbSpinnerGradient as GradientSpinner } from './Spinners/MbSpinnerGradient';

const ProRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate('/login'); 
    }, 3000); // Adjust the timeout as needed (in milliseconds)

    return () => clearTimeout(redirectTimeout); // Clean up timeout on component unmount
  }, [navigate]);

  return (
    <div className='mt-4 flex flex-col items-center text-primary-950'>
      <h1 className='text-lg font-bold'>Welcome to Lift Oracle Pro!</h1>
      {/* <p>Welcome to Lift Oracle Pro.</p> */}
      <GradientSpinner />
      <div className="mt-4 bg-white shadow-md p-6 rounded-lg text-center">
        <p className="text-sm">If you do not already have a Lift Oracle account, no worries. We created one for you and emailed your temporary credentials to the address you subscribed with.</p>
      </div>
    </div>
  );
};

export default ProRedirect;
