import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { getAllMeets } from "../../features/meetSlice";
import { updateMetaTags } from "../../lib/seo_utils";
import MeetList from "./MeetList"
import SearchBar from "./SearchBar"
import MeetTable from "../../components/Widgets/MeetTable"


function MeetSearch(){
  const dispatch = useDispatch()
  const [meets, setMeets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const pageTitle = 'Meet Search - Lift Oracle';
  const descriptionContent = 'Search our database of over 54,000 Olympic weightlifting competitions.';

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
        {updateMetaTags(pageTitle, descriptionContent)}
        <SearchBar onSearch={handleSearch} placeholderText={"Start typing an competition by year or name..."}/>
        {searchQuery.length > 0 ? 
        <MeetList meets={meets} />
        : <div className="shadow-lg text-left"><MeetTable /></div>}
      </div>
  )
}

export default MeetSearch;