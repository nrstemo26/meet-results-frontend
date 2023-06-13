import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import UserList from "./UserList";
import {useDispatch} from 'react-redux'
import { getAllAthletes } from "../../features/lifterSlice";
import Trending from '../Session/Trending'

const Search = ({isSession, setSessionAthletes}) => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const athletes = (await dispatch(getAllAthletes())).payload.athletes
      setUsers(athletes);
    };

    fetchUsers();
  }, [dispatch]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchQuery.toLowerCase())
  );

    return (
        <div className=" text-center">
            <SearchBar onSearch={handleSearch} />
            {searchQuery.length > 0 ? 
            <UserList users={filteredUsers} isSession={isSession} setSessionAthletes={setSessionAthletes} />
            : <Trending setSessionAthletes={setSessionAthletes} />}
            
        </div>
    )
}

export default Search;
