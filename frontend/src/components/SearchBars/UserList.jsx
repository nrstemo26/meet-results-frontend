import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToWatchlist } from '../../features/watchlistSlice'
import PropTypes from 'prop-types';
import { FiTrendingUp, FiUser } from 'react-icons/fi';

const UserList = ({ users, isWatchlist }) => {
  const dispatch = useDispatch()

  const nameToQueryString = (str) => {
    let queryString = str.split(/\s+/).join('%20')
    return queryString
  }
  
  const handleClick = (e) => {
    dispatch(addToWatchlist(e.target.textContent))
  }

  const renderUsers = (amount) => {
    let lis = []
    for (let i = 0; i < amount; i++) {
      if (users[i]) {
        let user = users[i];
        const userItem = (
          <div 
            key={user}
            className="group flex items-center space-x-2 py-1.5 px-1.5 rounded-lg transition-all duration-200 hover:bg-primary-50"
          >
            <div className="flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                <FiUser className="w-3 h-3 text-primary-600" />
              </div>
            </div>
            <div className="flex-grow min-w-0">
              {isWatchlist ? (
                <div 
                  className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-primary-600 cursor-pointer truncate"
                  onClick={(e) => handleClick(e)}
                >
                  {user}
                </div>
              ) : (
                <Link 
                  to={`/athlete/${nameToQueryString(user)}`}
                  className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-primary-600 truncate block"
                >
                  {user}
                </Link>
              )}
            </div>
            <div className="flex-shrink-0">
              <FiTrendingUp className="w-3 h-3 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
        );
        lis.push(userItem);
      } else {
        break;
      }
    }
    return lis;
  }

  return (
    <div className="mt-2 space-y-0.5">
      {renderUsers(20)}
    </div>
  );
}

UserList.propTypes = {
  users: PropTypes.array,
  isWatchlist: PropTypes.bool
};

export default UserList;
