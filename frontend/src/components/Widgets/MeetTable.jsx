import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { getMeetTable } from "../../features/meetSlice";


function MeetTable(){
    const [pageSize, setPageSize] = useState(20)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const dispatch = useDispatch();
    const [meets, setMeets] = useState([])

    const nameToQueryString = (str) =>{
        let queryString = str.split(/\s+/).join('%20')
        return `${queryString}`
    }

    const fetchUsers = async (page) =>{
        const data = {
            page: page,
            pageSize: pageSize,
          }

        const response = await dispatch(getMeetTable(data));
        setMeets(response.payload.data);
        setCurrentPage(response.payload.current_page)
        setTotalPages(response.payload.total_pages)
    }

    useEffect(()=>{
        
        fetchUsers(currentPage)
    },[currentPage, dispatch]);

    
    return(
        <div className="shadow-lg m-2 p-4">
            <h1 className="text-lg text-primary-950 font-bold text-center">
                Recent Meets
            </h1>
            <table className="w-full mt-4 text-sm">
                <thead>
                    <tr className="text-left">
                        <th className="px-4 py-1 text-sm text-primary-950">Meet</th>
                        <th className="px-4 py-1 text-sm text-primary-950">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {meets.map(([meet, date]) => (
                        <tr key={meet} className="text-gray-700 hover:text-primary-400">
                            <Link to={`/api/v1/meet/${nameToQueryString(meet)}`} className="text-gray-700 hover:text-primary-400">
                                <td className="px-4 py-1">{meet}</td>
                                <td className="px-4 py-1">{date}</td>
                            </Link>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </button>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    )
}

export default MeetTable;