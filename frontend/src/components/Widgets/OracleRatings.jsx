import { useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { getOracleRatings } from "../../features/athleteSlice";
import { rankToTitle } from '../../lib/account_utils';

function OracleRatings(){
    const dispatch = useDispatch();
    const [oracles, setOracles] = useState({})

    useEffect(()=>{
        const fetchUsers = async () =>{
            const response = await dispatch(getOracleRatings());
            setOracles(response.payload);
        }
        fetchUsers()
    },[dispatch]);

    const oraclesArray = Object.entries(oracles);
    const sortedOraclesArray = oraclesArray.sort((a, b) => b[1] - a[1]);
    
    return(
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <span className="text-2xl">🧙‍♂️</span>
                <h2 className="text-xl font-semibold text-primary-950">Oracle Rating</h2>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rank
                                </th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Username
                                </th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rating
                                </th>
                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Class
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sortedOraclesArray.map(([username, rating], index) => (
                                <tr 
                                    key={username} 
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {index < 10 ? (
                                                <span className="text-xl">
                                                    {index === 0 ? '🥇' : 
                                                     index === 1 ? '🥈' : 
                                                     index === 2 ? '🥉' :
                                                     index === 3 ? '4️⃣' :
                                                     index === 4 ? '5️⃣' :
                                                     index === 5 ? '6️⃣' :
                                                     index === 6 ? '7️⃣' :
                                                     index === 7 ? '8️⃣' :
                                                     index === 8 ? '9️⃣' : '🔟'}
                                                </span>
                                            ) : (
                                                <span className="text-sm font-medium text-gray-500">
                                                    #{index + 1}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <div className="text-sm font-medium text-primary-950">
                                            {username}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {rating}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                                            {rankToTitle(rating)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OracleRatings;