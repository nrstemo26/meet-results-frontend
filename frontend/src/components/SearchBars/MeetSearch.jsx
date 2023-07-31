import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { getAllMeets, getMeetTable } from "../../features/meetSlice";
import MeetList from "./MeetList"
import SearchBar from "./SearchBar"


function MeetSearch(){
  const dispatch = useDispatch()
  const [meets, setMeets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      //page and pageSize could be added to components if wanted
      const data = {
        name: searchQuery,
        page: 1,
        pageSize: 20,
      }
      // const athletes = (await dispatch(getAllAthletes(data))).payload
      const meets = (await dispatch(getAllMeets(data))).payload.data
      setMeets(meets); // amend this to include date?
    };

    fetchUsers();
    //dependency array needs to have page in there if pagination is needed
  }, [dispatch, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
      <div className="text-center">
        <SearchBar onSearch={handleSearch} placeholderText={"Start typing an competition by year or name..."}/>
        {searchQuery.length > 0 ? 
        <MeetList meets={meets} />
        : <div className="m:fixed m:left-0 m:bottom-0 mb-8 m:ml-8 text-left"></div>}
      </div>
  )
}

export default MeetSearch;