// AddGym.jsx
import React, { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import { Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import { tagOptions } from '../../config/tagOptions';
import { baseUrl } from '../../config';
import { MbSpinnerGradient } from '../../pages/Spinners/MbSpinnerGradient';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#3b82f6' : '#e5e7eb',
    boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
    '&:hover': {
      borderColor: '#cbd5e1',
    }
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? '#1e293b' 
      : state.isFocused 
        ? '#f1f5f9' 
        : null,
    color: state.isSelected ? 'white' : '#334155',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#f1f5f9'
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#334155'
  })
};

const AddGym = ({ closeModal }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [placeDetails, setPlaceDetails] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [dropInFee, setDropInFee] = useState('');
  const [monthlyRate, setMonthlyRate] = useState('');
  const [website, setWebsite] = useState('https://');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [gymType, setGymType] = useState('');
  const [usawClub, setUsawClub] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isExistingGym, setIsExistingGym] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  
  const autocompleteRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      console.log('Google Maps Places API is available for Autocomplete');
    }
  }, []);

  const handlePlaceChanged = () => {
    if (!autocompleteRef.current) {
      console.error('Autocomplete not loaded yet');
      return;
    }
    
    const place = autocompleteRef.current.getPlace();
    if (place && place.place_id) {
      setPlaceDetails({
        name: place.name,
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        placeId: place.place_id,
      });
      setInputValue(place.formatted_address);

      // Fetch and populate existing gym details if available
      fetchGymDetails(place.place_id);
      
      // Clear any location error
      setErrors(prev => ({ ...prev, location: null }));
    }
  };
  
  const fetchGymDetails = async (placeId) => {
    try {
      const response = await axios.get(`${baseUrl}/v1/gymfinder/gym-details`, {
        params: { place_id: placeId }
      });
      const gymDetails = response.data;
      setDropInFee(gymDetails.dropInFee);
      setMonthlyRate(gymDetails.monthlyRate);
      setWebsite(gymDetails.website ? (gymDetails.website.startsWith('http') ? gymDetails.website : `https://${gymDetails.website}`) : 'https://');
      setEmail(gymDetails.email || '');
      setInstagram(gymDetails.instagram || '');
      setGymType(gymDetails.gymType || '');
      setUsawClub(gymDetails.usawClub || false);
      
      // Convert the tags array from strings to objects using tagOptions
      const formattedTags = Array.isArray(gymDetails.tags) ? 
        gymDetails.tags.map(tagValue => {
          // Find the matching tag option with the full label
          const match = tagOptions.find(option => option.value === tagValue);
          return match || { value: tagValue, label: tagValue };
        }) : [];
      
      console.log('Original tags:', gymDetails.tags);
      console.log('Formatted tags for select:', formattedTags);
      
      setSelectedTags(formattedTags);
      setIsExistingGym(true);
    } catch (error) {
      console.error('Error fetching gym details:', error);
      setIsExistingGym(false);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!placeDetails) {
        newErrors.location = 'Please select a valid gym location';
      }
    } else if (step === 2) {
      if (!gymType) {
        newErrors.gymType = 'Please select a gym type';
      }
      if (!dropInFee) {
        newErrors.dropInFee = 'Please enter a drop-in fee';
      }
      if (!monthlyRate) {
        newErrors.monthlyRate = 'Please enter a monthly rate';
      }
      if (!website || website === 'https://') {
        newErrors.website = 'Please enter a website';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Check if recaptcha is available
    if (!executeRecaptcha) {
      toast.error('reCAPTCHA not available. Please try again later.');
      console.error('executeRecaptcha is not available', executeRecaptcha);
      setIsSubmitting(false);
      return;
    }
    
    try {
      console.log('Executing reCAPTCHA verification...');
      
      // Execute recaptcha with a timeout to prevent hanging
      const recaptchaPromise = executeRecaptcha('gym_submission');
      
      // Add a timeout to handle potential issues
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('reCAPTCHA verification timed out')), 10000)
      );
      
      // Race the promises to handle timeouts
      const recaptchaToken = await Promise.race([recaptchaPromise, timeoutPromise]);
      
      if (!recaptchaToken) {
        console.error('Failed to get reCAPTCHA token - token is empty');
        toast.error('Failed to verify you are human. Please try again later.');
        setIsSubmitting(false);
        return;
      }
      
      console.log('reCAPTCHA token obtained successfully:', recaptchaToken.substring(0, 10) + '...');
      
      // Get authentication token
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please log in to add or update gym information');
        closeModal();
        // Redirect to login page
        window.location.href = '/login?redirect=gymfinder';
        return;
      }
      
      const gymDetails = {
        ...placeDetails,
        dropInFee,
        monthlyRate,
        website: website.startsWith('http') ? website : `https://${website}`,
        email,
        instagram: instagram.startsWith('@') ? instagram.substring(1) : instagram,
        gymType,
        usawClub,
        tags: selectedTags && selectedTags.length ? 
          selectedTags.map(tag => (typeof tag === 'string' ? tag : tag?.value)).filter(Boolean) : 
          [],
        recaptchaToken // Include the reCAPTCHA token
      };
      
      console.log('Submitting gym details with reCAPTCHA token', {
        ...gymDetails,
        recaptchaToken: gymDetails.recaptchaToken ? 'Token present' : 'Token missing'
      });
      
      // Create credentials for Basic Auth
      const credentials = btoa(`${token}:unused`);
      
      const response = await axios.post(`${baseUrl}/v1/gymfinder/gym-form-submit`, gymDetails, {
        headers: {
          Authorization: `Basic ${credentials}`,
        }
      });
      
      toast.success(response.data.message || 'Gym added successfully!');
      closeModal();
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error saving gym. Please try again.';
      console.error('Error details:', error.response?.data);
      
      // Handle different types of errors
      if (error.message === 'reCAPTCHA verification timed out') {
        toast.error('reCAPTCHA verification timed out. Please try again.');
      } else if (error.name === 'TypeError' && error.message.includes('executeRecaptcha')) {
        toast.error('reCAPTCHA service is not responding. Please refresh the page and try again.');
      } else if (errorMessage.includes('reCAPTCHA')) {
        toast.error(`reCAPTCHA verification failed. Please try again. (Details: ${errorMessage})`);
      } else {
        toast.error(errorMessage);
      }
      console.error('Error saving gym:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto relative">
      <div className="mb-6 md:mt-0 mt-6">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-primary-950 text-white' : 'bg-gray-200 text-gray-600'}`}>
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-primary-950' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-primary-950 text-white' : 'bg-gray-200 text-gray-600'}`}>
            2
          </div>
          <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? 'bg-primary-950' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-primary-950 text-white' : 'bg-gray-200 text-gray-600'}`}>
            3
          </div>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm">
        {/* Step 1: Location */}
        {currentStep === 1 && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-primary-950">
              {isExistingGym ? 'Update Your Gym' : 'Add Your Gym'}
            </h2>
            <p className="text-gray-600 mb-6">Start by entering your gym's location</p>
            
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Gym Location
              </label>
              {window.google && window.google.maps && window.google.maps.places ? (
                <Autocomplete
                  onLoad={(autocomplete) => {
                    autocompleteRef.current = autocomplete;
                    // Set some options for the autocomplete
                    if (autocomplete) {
                      autocomplete.setFields(['name', 'geometry', 'formatted_address', 'place_id']);
                      // Restrict to just gym-like places where possible
                      autocomplete.setTypes(['gym', 'establishment']);
                    }
                  }}
                  onPlaceChanged={handlePlaceChanged}
                  options={{
                    // Helps with performance and relevance
                    types: ['establishment'],
                    componentRestrictions: { country: ['us', 'ca'] } // Limit to US and Canada for now
                  }}
                >
                  <input
                    id="location"
                    type="text"
                    placeholder="Search for your gym..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className={`w-full px-4 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    autoComplete="new-gymfinder-location" // Prevents browser autocomplete from interfering
                  />
                </Autocomplete>
              ) : (
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    placeholder="Loading Google Maps..." 
                    disabled 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                  />
                  <div className="w-5 h-5 flex items-center justify-center">
                    <div className="w-5 h-5 text-primary-500 animate-spin">⟳</div>
                  </div>
                </div>
              )}
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
            </div>
            
            {placeDetails && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium text-gray-900">{placeDetails.name}</h3>
                <p className="text-gray-600 mt-1">{placeDetails.address}</p>
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={goToNextStep}
                disabled={!placeDetails}
                className={`px-4 py-2 ${!placeDetails ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary-950 hover:bg-primary-700'} text-white rounded-md transition-colors`}
              >
                Next
              </button>
            </div>
          </div>
        )}
        
        {/* Step 2: Basic Info */}
        {currentStep === 2 && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-primary-950">Gym Details</h2>
            <p className="text-gray-600 mb-6">Enter information about the gym</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="gym-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Gym Type*
                </label>
                <select
                  id="gym-type"
                  value={gymType}
                  onChange={(e) => setGymType(e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.gymType ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                >
                  <option value="" disabled>Select gym type</option>
                  <option value="Weightlifting-only">Weightlifting-only</option>
                  <option value="CrossFit">CrossFit</option>
                  <option value="Globo-gym/Other">Globo-gym/Other</option>
                </select>
                {errors.gymType && (
                  <p className="mt-1 text-sm text-red-600">{errors.gymType}</p>
                )}
              </div>
              
              <div className="mb-4 flex items-center">
                <input
                  id="usaw-club"
                  type="checkbox"
                  checked={usawClub}
                  onChange={(e) => setUsawClub(e.target.checked)}
                  className="h-4 w-4 text-primary-950 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="usaw-club" className="ml-2 block text-sm font-medium text-gray-700">
                  USAW Club
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="drop-in" className="block text-sm font-medium text-gray-700 mb-1">
                  Drop-in Fee*
                </label>
                <div className="relative rounded-md">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    id="drop-in"
                    type="number"
                    placeholder="20"
                    value={dropInFee}
                    onChange={(e) => setDropInFee(e.target.value)}
                    className={`block w-full py-2 pl-7 pr-4 border ${errors.dropInFee ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  />
                </div>
                {errors.dropInFee && (
                  <p className="mt-1 text-sm text-red-600">{errors.dropInFee}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="monthly" className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Rate*
                </label>
                <div className="relative rounded-md">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    id="monthly"
                    type="number"
                    placeholder="150"
                    value={monthlyRate}
                    onChange={(e) => setMonthlyRate(e.target.value)}
                    className={`block w-full py-2 pl-7 pr-4 border ${errors.monthlyRate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  />
                </div>
                {errors.monthlyRate && (
                  <p className="mt-1 text-sm text-red-600">{errors.monthlyRate}</p>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                Website*
              </label>
              <input
                id="url"
                type="url"
                placeholder="https://yourgym.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.website ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {errors.website && (
                <p className="mt-1 text-sm text-red-600">{errors.website}</p>
              )}
            </div>
            
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={goToPreviousStep}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goToNextStep}
                className="px-4 py-2 bg-primary-950 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: Additional Info */}
        {currentStep === 3 && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-primary-950">Additional Information</h2>
            <p className="text-gray-600 mb-6">Add more details about the gym (optional)</p>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email (optional)
              </label>
              <input
                id="email"
                type="email"
                placeholder="info@yourgym.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="ig" className="block text-sm font-medium text-gray-700 mb-1">
                Instagram (optional)
              </label>
              <div className="relative rounded-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">@</span>
                </div>
                <input
                  id="ig"
                  type="text"
                  placeholder="yourgymaccount"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="block w-full py-2 pl-7 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features & Amenities (optional)
              </label>
              <Select
                isMulti
                options={tagOptions}
                value={selectedTags}
                onChange={setSelectedTags}
                styles={customSelectStyles}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Select gym features..."
              />
              <p className="mt-1 text-xs text-gray-500">Select all features that apply to this gym</p>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={goToPreviousStep}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 ${isSubmitting ? 'bg-gray-400' : 'bg-primary-950 hover:bg-primary-700'} text-white rounded-md transition-colors flex items-center`}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 w-4 h-4 text-white animate-spin">⟳</div>
                    Submitting...
                  </>
                ) : (
                  isExistingGym ? 'Update Gym' : 'Add Gym'
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddGym;
