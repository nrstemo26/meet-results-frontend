import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { getAllAthletes } from "../../features/athleteSlice";

import PropTypes from 'prop-types';

import SearchBar from "./SearchBar";
import UserList from "./UserList";
import Trending from './Trending'
import { useSelector } from "react-redux";

const Search = ({ isWatchlist }) => {
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('');
  
  //if this is a search bar for a meet this will be broken because we need to get meet info
  const searchAthletes = useSelector((state)=> state.athlete.searchAthletes )


  useEffect(() => {
    const fetchUsers = async () => {
      //page and pageSize could be added to components if wanted
      const data = {
        name: searchQuery,
        page: 1,
        pageSize: 20,
      }
      await dispatch(getAllAthletes(data))
    };

    fetchUsers();
    //dependency array needs to have page if pagination is needed
  }, [ searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  
  return (
        <div className="text-center">
            <SearchBar onSearch={handleSearch} />
            {searchQuery.length > 0 ? 
            <UserList users={searchAthletes} isWatchlist={isWatchlist}  />
            : <div className="m:fixed m:left-0 m:bottom-0 mb-8 m:ml-8 text-left"><Trending  isWatchlist={isWatchlist} /></div>}
        </div>
        //     <UserList users={users} isWatchlist={isWatchlist}  />
        //     : <div className="m:fixed m:left-0 m:bottom-0 mb-8 m:ml-8 text-left"><Trending  isWatchlist={isWatchlist} /></div>}
        // </div>
    )
  }
  
  Search.propTypes = {
    isWatchlist: PropTypes.bool
  };
  
  export default Search;
  