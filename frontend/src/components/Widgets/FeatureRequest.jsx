import { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux';
import { FiX } from "react-icons/fi";

import { baseUrl } from '../../config'


const FeatureRequest = () => {
  const user = useSelector((state)=> state.auth.user)
  const [showModal, setShowModal] = useState(false);
  const [requestText, setRequestText] = useState('');

  const [accountData, setAccountData] = useState(null);

  const toggleModal = () => {
    setShowModal(state => !state)
    if(showModal == true){
      setRequestText('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const credentials = btoa(`${token}:unused`);
    const feature_request = requestText

    if(user){
      try {
        const response = await axios.post(baseUrl + '/v1/user/feature-request', 
          { feature_request },
          {
            headers: {
              Authorization: `Basic ${credentials}`,
            },
          }
        );
        console.log(response.data); // Handle the response as needed
        toast.info('TY. The Oracle appreciates your feedback.')
    
        // Redirect or perform any other actions after successful registration
      } catch (error) {
        console.error(error);
        toast.error('There was an error.')
        
      }
      
      toggleModal()
    }else{
      toast.error('Only registered users can submit a feature request. Please log in to submit a request.')    
      toggleModal()
    }
  };

  return (
    <div>
      <div className="z-10">
        <div 
          className="text-primary-950 hover:text-primary-400 font-bold cursor-pointer" 
          onClick={toggleModal}>Request a feature.
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded p-8 shadow-lg relative">
            <FiX color='black' size='48px'
              className="absolute top-0 right-0 mt-4 mr-4 p-2 cursor-pointer" 
              onClick={toggleModal}
            />
            <p className="text-xl font-bold text-primary-950">Feature Request</p>
            <p className="mb-4 text-slate-500 font-medium">Sure yeah, submit bugs too.</p>
            <form onSubmit={handleSubmit}>
              <textarea
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
                placeholder="Beep boop."
                required
                className="w-full h-24 p-2 border border-primary-200 rounded mb-4"  
              ></textarea>
              <button className="text-sm btn-alt" type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureRequest;
