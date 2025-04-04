import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../config';
import { FiBarChart2, FiDollarSign, FiAward } from 'react-icons/fi';

const CityGymStats = ({ cityName, stateName }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    const fetchCityGyms = async () => {
      if (!cityName) return;
      
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/v1/gymfinder/cities/${cityName}`);
        const gyms = response.data.gyms || [];
        
        if (gyms.length === 0) {
          setLoading(false);
          return;
        }
        
        // Calculate stats
        const gymCount = gyms.length;
        
        // Extract valid monthly rates and drop-in fees
        const monthlyRates = gyms
          .filter(gym => gym.monthly_rate && gym.monthly_rate > 0)
          .map(gym => gym.monthly_rate);
          
        const dropInFees = gyms
          .filter(gym => gym.drop_in_fee && gym.drop_in_fee > 0)
          .map(gym => gym.drop_in_fee);
        
        // Count USAW clubs
        const usawClubCount = gyms.filter(gym => gym.usaw_club).length;
        
        // Calculate stats object
        const calculatedStats = {
          gymCount,
          usawClubCount,
          usawClubPercentage: Math.round((usawClubCount / gymCount) * 100)
        };
        
        // Add pricing info if available
        if (monthlyRates.length > 0) {
          calculatedStats.minMonthlyRate = Math.min(...monthlyRates);
          calculatedStats.maxMonthlyRate = Math.max(...monthlyRates);
          calculatedStats.avgMonthlyRate = Math.round(
            monthlyRates.reduce((sum, rate) => sum + rate, 0) / monthlyRates.length
          );
        }
        
        if (dropInFees.length > 0) {
          calculatedStats.minDropInFee = Math.min(...dropInFees);
          calculatedStats.maxDropInFee = Math.max(...dropInFees);
        }
        
        setStats(calculatedStats);
      } catch (error) {
        console.error('Error fetching city gym data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCityGyms();
  }, [cityName]);
  
  if (loading) {
    return <div className="my-4 text-center py-2 text-gray-500 text-sm">Loading stats...</div>;
  }
  
  if (!stats) {
    return null;
  }
  
  return (
    <div className="my-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="p-4 flex flex-col items-center justify-center">
            <div className="p-2 bg-primary-50 rounded-full mb-2">
              <FiBarChart2 className="w-5 h-5 text-primary-600" />
            </div>
            <span className="block text-xl font-bold text-primary-950">{stats.gymCount}</span>
            <span className="text-gray-600 text-sm">Weightlifting-friendly Gyms</span>
          </div>
          
          {stats.usawClubCount > 0 && (
            <div className="p-4 flex flex-col items-center justify-center">
              <div className="p-2 bg-primary-50 rounded-full mb-2">
                <FiAward className="w-5 h-5 text-primary-600" />
              </div>
              <span className="block text-xl font-bold text-primary-950">{stats.usawClubPercentage}%</span>
              <span className="text-gray-600 text-sm">USAW Affiliated</span>
            </div>
          )}
          
          {stats.avgMonthlyRate && (
            <div className="p-4 flex flex-col items-center justify-center">
              <div className="p-2 bg-primary-50 rounded-full mb-2">
                <FiDollarSign className="w-5 h-5 text-primary-600" />
              </div>
              <span className="block text-xl font-bold text-primary-950">${stats.avgMonthlyRate}</span>
              <span className="text-gray-600 text-sm">Avg. Monthly Rate</span>
            </div>
          )}
        </div>
        
        {((stats.minMonthlyRate && stats.maxMonthlyRate) || stats.minDropInFee) && (
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-600 text-center">
            {stats.minMonthlyRate && stats.maxMonthlyRate && (
              <>
                Membership: ${stats.minMonthlyRate}-${stats.maxMonthlyRate}/mo
                {stats.minDropInFee && ` • Drop-in from $${stats.minDropInFee}`}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CityGymStats;