// AddGym.jsx
import React, { useState, useRef } from 'react';
import Select from 'react-select';
import { Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseUrl } from '../../config';

const predefinedTags = [
  { label: "Can't Drop Weights ❌", value: "cant_drop_weights" },
  { label: "Exquisite vibes 🤙🏼", value: "exquisite_vibes" },
  { label: "Nat'l Coach 🧠", value: "national_coach" },
  { label: "Kilo Plates 🧿", value: "kilo_plates" },
  { label: "Easy Parking 🅿️", value: "easy_parking" },
  { label: "Parking Nightmare 🤬", value: "nightmare_parking" },
  { label: "Showers 🚿", value: "showers" },
  { label: "n00b Friendly 👶🏼", value: "noob_friendly" },
  { label: "24/7 🌚🌞", value: "247_access" },
  { label: "Women's Bars 🏋️‍♀️", value: "womens_bars" },
  { label: "Pro-chalk ⬜", value: "pro_chalk" },
  { label: "Snacks 🍿", value: "snacks" },
  { label: "Jerk Blocks 🧱", value: "jerk_blocks" },
  { label: "Head Coach 🏅", value: "head_coach" },
];

const AddGym = ({ closeModal }) => {
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
  const autocompleteRef = useRef(null);

  const fetchGymDetails = async (placeId) => {
    try {
      const response = await axios.get(`${baseUrl}/v1/gymfinder/gym-details`, {
        params: { place_id: placeId }
      });
      const gymDetails = response.data;
      setDropInFee(gymDetails.dropInFee);
      setMonthlyRate(gymDetails.monthlyRate);
      setWebsite(`https://${gymDetails.website}`);
      setEmail(gymDetails.email);
      setInstagram(gymDetails.instagram);
      setGymType(gymDetails.gymType);
      setUsawClub(gymDetails.usawClub);
      setSelectedTags(gymDetails.tags);
    } catch (error) {
      console.error('Error fetching gym details:', error);
    }
  };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place) {
      const placeId = place.place_id;
      setPlaceDetails({
        name: place.name,
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        placeId: placeId,
      });
      setInputValue(place.formatted_address);

      // Fetch and populate existing gym details if available
      fetchGymDetails(placeId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (placeDetails && gymType && dropInFee && monthlyRate && website) {
      const gymDetails = {
        ...placeDetails,
        dropInFee,
        monthlyRate,
        website,
        email,
        instagram,
        gymType,
        usawClub,
        tags: selectedTags
      };
      try {
        const response = await axios.post(`${baseUrl}/v1/gymfinder/add-gym`, gymDetails);
        toast.success(response.data.message);
        closeModal();
        console.log('Gym saved:', response.data);
      } catch (error) {
        toast.error(error.response.data.error || 'Error saving gym');
        console.error('Error saving gym:', error);
      }
    } else {
      toast.error('Please fill in all required fields.');
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
      <div className="grid grid-cols-2 gap-2 justify-items-start">
        <div className="mb-4">
          <label htmlFor="gym-type" className="block text-sm font-medium text-gray-700 mb-2">Gym Type</label>
          <select
            id="gym-type"
            value={gymType}
            onChange={(e) => setGymType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700"
            required
          >
            <option value="" disabled>Select gym type</option>
            <option value="Weightlifting-only">Weightlifting-only</option>
            <option value="CrossFit">CrossFit</option>
            <option value="Globo-gym/Other">Globo-gym/Other</option>
          </select>
        </div>
        <div className="mb-4 flex items-center mt-8">
          <input
            id="usaw-club"
            type="checkbox"
            checked={usawClub}
            onChange={(e) => setUsawClub(e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="usaw-club" className="ml-2 block text-sm font-medium text-gray-700">USAW Club</label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 justify-items-start">
        <div className="mb-4">
          <label htmlFor="drop-in" className="block text-sm font-medium text-gray-700 mb-2">Drop-in Fee</label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              id="drop-in"
              type="number"
              placeholder="Drop-in Fee"
              value={dropInFee}
              onChange={(e) => setDropInFee(e.target.value)}
              className="block w-full py-1.5 pl-7 pr-4 border border-gray-300 rounded-md sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="monthly" className="block text-sm font-medium text-gray-700 mb-2">Monthly Rate</label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              id="monthly"
              type="number"
              placeholder="Monthly Rate"
              value={monthlyRate}
              onChange={(e) => setMonthlyRate(e.target.value)}
              className="block w-full py-1.5 pl-7 pr-4 border border-gray-300 rounded-md sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">Website</label>
        <input
          id="url"
          type="url"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md sm:text-sm sm:leading-6"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="ig" className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
        <div className="relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">@</span>
          </div>
          <input
            id="ig"
            type="text"
            placeholder="Instagram (optional)"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="block w-full py-1.5 pl-7 pr-4 border border-gray-300 rounded-md sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
        <Select
          isMulti
          options={predefinedTags}
          value={selectedTags}
          onChange={setSelectedTags}
          className="w-full"
        />
      </div>
      {placeDetails && (
        <div className="mt-4 text-sm text-gray-600">
          <p><strong></strong> {placeDetails.name}</p>
          <p><strong></strong> {placeDetails.address}</p>
        </div>
      )}
      <button type="submit" className="mt-4 px-4 py-2 bg-primary-950 hover:bg-primary-500 text-white rounded-md">Add Gym</button>
    </form>
  );
};

export default AddGym;
