import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { getAllAthletes } from "../../features/athleteSlice";
import { updateMetaTags } from "../../lib/seo_utils";
import PropTypes from 'prop-types';
import UpgradeProCard from "../Widgets/ProCard";
import SearchBar from "./SearchBar";
import UserList from "./UserList";
import Trending from './Trending'


const Search = ({ isWatchlist }) => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const pageTitle = 'Lifter Search - Lift Oracle';
  const descriptionContent = 'Search our database of over 6,000 Olympic weightlifting athletes.';

  useEffect(() => {
    const fetchUsers = async () => {
      //page and pageSize could be added to components if wanted
      const data = {
        name: searchQuery,
        page: 1,
        pageSize: 20,
      }

      const athletes = (await dispatch(getAllAthletes(data))).payload.data
      
      setUsers(athletes);
    };

    fetchUsers();
    //dependency array needs to have page in there if pagination is needed
  }, [dispatch, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  
  return (
        <div className="text-center mt-4">
          {updateMetaTags(pageTitle, descriptionContent)}
          <div className="sm:flex sm:flex-row">
            <div className="w-full md:w-2/4 mt-4">
              <SearchBar onSearch={handleSearch} placeholderText={"Start typing an athlete's name..."}/>
              {searchQuery.length > 0 ? 
              <UserList users={users} isWatchlist={isWatchlist}  />
              : <div className="m:fixed m:left-0 m:bottom-0 mb-8 m:ml-8 text-left"></div>}
            </div>
            <div className="mb-4 mt-4 w-full sm:w-1/3 mx-auto p-4">
              <div className="mb-8 text-left">
                <Trending  isWatchlist={isWatchlist} />
              </div>
              
              <div className="mb-4">
                <UpgradeProCard />
              </div>
            </div>
          </div>
            
            
        </div>
    )
  }
  
  Search.propTypes = {
    isWatchlist: PropTypes.bool
  };
  
  export default Search;
  