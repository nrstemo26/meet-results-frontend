import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { getAllMeets } from "../../../features/meetSlice";
import MeetList from "../../SearchBars/MeetList"
import MeetChart from "./MeetChart";
import TopSinclairs from "./TopSinclairs";
import Insights from './Insights'
import SearchBar from "../../SearchBars/SearchBar";


function MeetDashboard(){
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
      setMeets(meets);
    };

    fetchUsers();
    //dependency array needs to have page in there if pagination is needed
  }, [dispatch, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
      <div className="dashboard-container">
        <SearchBar onSearch={handleSearch} placeholderText={"Start typing an competition by year or name..."}/>
        {searchQuery.length > 0 ? 
        <MeetList meets={meets} />
        : <div className="m:fixed m:left-0 m:bottom-0 mb-8 m:ml-8 text-left"></div>}
        <div className="bg-secondary-500 p-5 rounded-xl">
          <h1 className="text-center text-orange-100 text-3xl font-medium">Dashboard: 2016 Dummy Meet Open</h1>
          <MeetChart ></MeetChart>
        </div>

      <div className="my-2 flex flex-row flex-wrap gap-2 ">
        <TopSinclairs></TopSinclairs>
        <Insights className='flex-auto'></Insights>
        <Insights className='flex-auto'></Insights>
      </div>
      </div>
  )
}

export default MeetDashboard;