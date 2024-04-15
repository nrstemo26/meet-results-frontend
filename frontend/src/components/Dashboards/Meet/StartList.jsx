import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
import { addToWatchlist, selectWatchlist } from '../../../features/watchlistSlice';
import { BsFillClipboardCheckFill } from 'react-icons/bs';
import {AiFillPlusCircle as AddCircle} from 'react-icons/ai';

const AthleteDashboard = ({ meetData }) => {
  const [gender, setGender] = useState('female');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const watchlist = useSelector(selectWatchlist);

  // Add athletes to watchlist
  const handleAddToWatchlist = (names, weightClass) => {
    const toastOptions = {
      autoClose:3000,
      onClick:() => {
        navigate('/watchlist')
      }
    }

    names.forEach(name => {
      dispatch(addToWatchlist(name));
    });

    toast(`${weightClass}kg weight class added to your watchlist.  Click here to see your watchlist`, toastOptions)
  };

  // Helper function to render athletes by weight class
  const renderAthletesByWeightClass = (athletes) => {
    return athletes.map((weightClassData, index) => {
      const weightClass = Object.keys(weightClassData)[0];
      const athletesData = weightClassData[weightClass];
      const athleteNames = athletesData.map(athlete => athlete.master_lifter_name);

      return (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{weightClass}kg</h3>
            <button
              className="py-1 px-3 bg-primary-950 text-white rounded hover:bg-primary-500 transition"
              onClick={() => handleAddToWatchlist(athleteNames, weightClass)}
            >
              Bulk Add to Watchlist
            </button>
          </div>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-4 gap-2">
            {athletesData.map((athlete, index) => (
              <div key={index} className="p-2 border hover:border-primary-950 shadow-md hover:shadow-sm rounded-lg mb-2 text-sm text-gray-700">
                <div className="flex justify-between">
                    <p className="text-primary-950 text-lg font-semibold">{athlete.master_lifter_name} </p>
                    <span className="font-mono text-xs align-middlefont-normal"> ({athlete.birth_year}) </span>
                    {/* <p> {athlete.division}</p> */}
                    
                </div>
                
                <p className="font-semibold">{athlete.club} ({athlete.state}) </p>
                <div className="grid grid-cols-2">
                    <p className="font-mono font-semibold"><strong className="font-sans font-bold">Entry Total:</strong> {athlete.entry_total}</p>
                    <p className="font-mono font-semibold"><strong className="font-sans font-bold">Max Total:</strong> {athlete.max_total}</p>
                </div>
                <p className="font-mono"><span className="font-sans">Entry/Max Total Ratio:</span> {athlete.entry_max_ratio}</p>
                <div className="grid grid-cols-2">
                    <p className="font-mono"><span className="font-sans">💣 Out Rate:</span> {athlete.bomb_out_rate}</p>
                    <p className="font-mono"><span className="font-sans">💯 Rate:</span> {athlete.perfect_meet_rate}</p>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Start List</h2>
      <button
        className={`mr-4 py-1.5 px-3 font-semibold rounded-lg cursor-pointer ${gender === 'female' ? 'bg-primary-950 text-white' : 'bg-gray-200 hover:bg-primary-300 cursor-pointer'}`}
        onClick={() => setGender('female')}
      >
        Female
      </button>
      <button
        className={`py-1.5 px-3 font-semibold rounded-lg cursor-pointer ${gender === 'male' ? 'bg-primary-950 text-white' : 'bg-gray-200 hover:bg-primary-300 cursor-pointer'}`}
        onClick={() => setGender('male')}
      >
        Male
      </button>
      <div className="mt-4">
        {renderAthletesByWeightClass(meetData[gender].athletes)}
      </div>
    </div>
  );
};

export default AthleteDashboard;
