import { useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { getTrendingAthletes } from "../../features/athleteSlice";
import UserList from './UserList';
import PropTypes from 'prop-types';
import { FiTrendingUp, FiClock } from 'react-icons/fi';

function Trending({ isWatchlist }) {
  const [pageSize, setPageSize] = useState(20)
  const dispatch = useDispatch();
  const [athletes, setAthletes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const athletes = (await dispatch(getTrendingAthletes({pageSize}))).payload.data;
        setAthletes(athletes);
      } catch (error) {
        console.error('Error fetching trending athletes:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, [dispatch, pageSize])

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1 bg-primary-100 rounded-lg">
              <FiTrendingUp className="w-4 h-4 text-primary-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-900">Trending Athletes</h2>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-gray-500">
            <FiClock className="w-3.5 h-3.5" />
            <span>24h</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : athletes.length > 0 ? (
          <UserList users={athletes} isWatchlist={isWatchlist} />
        ) : (
          <div className="text-center py-8 text-gray-500">
            No trending athletes at the moment
          </div>
        )}
      </div>
    </div>
  );
}

Trending.propTypes = {
  isWatchlist: PropTypes.bool
};

export default Trending;