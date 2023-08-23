import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {  MbSpinnerGradient as GradientSpinner } from './Spinners/MbSpinnerGradient';

const Cheers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate('/athletes'); 
    }, 1500); // Adjust the timeout as needed (in milliseconds)

    return () => clearTimeout(redirectTimeout); // Clean up timeout on component unmount
  }, [navigate]);

  return (
    <div className='mt-4 flex flex-col items-center text-primary-950'>
      <h1 className='m-2 text-lg font-bold'>Cheers! ☕️</h1>
      <GradientSpinner />
    </div>
  );
};

export default Cheers;
