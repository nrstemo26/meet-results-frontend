import { useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { getOracleRatings } from "../../features/athleteSlice";
import { rankToTitle } from '../../lib/account_utils';

function OracleRatings(){
    // const [pageSize, setPageSize] = useState(20)
    const dispatch = useDispatch();
    const [oracles, setOracles] = useState({})
    

    useEffect(()=>{
        const fetchUsers = async () =>{
            const response = await dispatch(getOracleRatings());
            setOracles(response.payload);
            // console.log(oracles)
        }
        fetchUsers()
    },[dispatch]);
    // console.log(oracles)
    const oraclesArray = Object.entries(oracles);
    const sortedOraclesArray = oraclesArray.sort((a, b) => b[1] - a[1]);
    
    return(
        <div className="shadow-lg m-2 p-4">
            <h1 className="text-lg text-primary-950 font-bold text-center">
                🧙‍♀️ Lift Oracle Leaderboard 🧙‍♂️
            </h1>
            <p className="text-sm text-center font-bold text-gray-700 border-b border-primary-100">
                All-Time
            </p>
            <table className="w-full mt-4 text-sm">
                <thead>
                <tr className="text-left">
                    <th className="px-4 py-1 text-sm text-primary-950">Username</th>
                    <th className="px-4 py-1 text-sm text-primary-950">Oracle Rating</th>
                    <th className="px-4 py-1 text-sm text-primary-950">Class</th>
                </tr>
                </thead>
                <tbody>
                {sortedOraclesArray.map(([username, rating]) => (
                    <tr key={username} className="text-gray-700">
                    <td className="px-4 py-1 hover:text-primary-400">{username}</td>
                    <td className="px-4 py-1 hover:text-primary-400">{rating}</td>
                    <td className="px-4 py-1 text-primary-950 text-xs font-bold rounded">{rankToTitle(rating)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default OracleRatings;