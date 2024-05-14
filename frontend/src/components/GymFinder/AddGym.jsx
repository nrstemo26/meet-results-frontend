// AddGym.jsx
import React, { useState, useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import { baseUrl } from '../../config';

const libraries = ['places'];

const AddGym = () => {
    const [placeDetails, setPlaceDetails] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [dropInFee, setDropInFee] = useState('');
    const [monthlyRate, setMonthlyRate] = useState('');
    const [website, setWebsite] = useState('');
    const [email, setEmail] = useState('');
    const [instagram, setInstagram] = useState('');
    const autocompleteRef = useRef(null);
  
    const handlePlaceChanged = () => {
      const place = autocompleteRef.current.getPlace();
      if (place) {
        setPlaceDetails({
          name: place.name,
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          placeId: place.place_id,
        });
        setInputValue(place.formatted_address);
      }
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (placeDetails && dropInFee && monthlyRate && website) {
          const gymDetails = {
            ...placeDetails,
            dropInFee,
            monthlyRate,
            website,
            email,
            instagram,
          };
          console.log(gymDetails);
          try {
            const response = await axios.post(`${baseUrl}/v1/gymfinder/markers`, gymDetails);
            console.log('Gym saved:', response.data);
          } catch (error) {
            console.error('Error saving gym:', error);
          }
        } else {
          alert('Please fill in all required fields.');
        }
      };
  
    return (
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-lg max-w-md text-sm mt-8">
        <h2 className="text-lg font-semibold mb-4 text text-primary-950">Add Your Gym</h2>
        <Autocomplete
          onLoad={(autocomplete) => {
            autocompleteRef.current = autocomplete;
          }}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Start typing your gym"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          />
        </Autocomplete>
        <input
            type="number"
            placeholder="Drop-in Fee"
            value={dropInFee}
            onChange={(e) => setDropInFee(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            required
        />
        <input
            type="number"
            placeholder="Monthly Rate"
            value={monthlyRate}
            onChange={(e) => setMonthlyRate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            required
        />
        <input
            type="url"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            required
        />
        <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
        <input
            type="text"
            placeholder="Instagram (optional)"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
        {placeDetails && (
          <div className="mt-4 text-sm text-gray-600">
            <p><strong></strong> {placeDetails.name}</p>
            <p><strong></strong> {placeDetails.address}</p>
            {/* <p><strong>Latitude:</strong> {placeDetails.lat}</p>
            <p><strong>Longitude:</strong> {placeDetails.lng}</p> */}
          </div>
        )}
        <button type="submit" className="mt-4 px-4 py-2 bg-primary-950 hover:bg-primary-500 text-white rounded-md">Add Gym</button>
      </form>
    );
  };
  
  export default AddGym;