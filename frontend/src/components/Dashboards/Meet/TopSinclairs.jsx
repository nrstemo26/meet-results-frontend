import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

function TopSinclairs(){
    const {data: stats } = useSelector((state)=>state.meet)
    console.log(stats.mens.sinclairs)

    return(
        <div className="sm:w-full flex flex-col">
            <div className="flex justify-center items-center m-2">
                <h1 className="text-center text-2xl text-primary-950 font-bold mb-4">Top 10 Sinclair Totals</h1>
            </div>
            <div className="sm:flex sm:justify-center sm:items-center">
                <div className="sm:w-full sm:w-1/2 m-4">
                    <h1 className="text-center text-xl text-primary-950 font-bold m-2 border-b border-primary-100">Men</h1>
                    <table className="min-w-full border border-gray-300 divide-y divide-gray-300">
                        <thead>
                        <tr className="bg-gray-100 text-primary-950">
                            <th className="px-4 py-2 text-left"></th>
                            <th className="px-4 py-2 text-left">Athlete</th>
                            <th className="px-4 py-2 text-left">Sinclair Total</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-700">
                        {stats.mens.sinclairs.map((data, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">
                                <Link to={`/athlete/${encodeURIComponent(data[0])}`} className="text-primary-950 hover:underline">
                                    {data[0]}
                                </Link>
                            </td>
                            <td className="px-4 py-2 font-mono">{data[1]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="sm:w-full sm:w-1/2 m-4">
                    <h1 className="text-center text-xl text-primary-950 font-bold m-2 border-b border-primary-100">Women</h1>
                    <table className="min-w-full border border-gray-300 divide-y divide-gray-300">
                        <thead>
                        <tr className="bg-gray-100 text-primary-950">
                            <th className="px-4 py-2 text-left"></th>
                            <th className="px-4 py-2 text-left">Athlete</th>
                            <th className="px-4 py-2 text-left">Sinclair Total</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-700">
                        {stats.womens.sinclairs.map((data, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">
                                <Link to={`/athlete/${encodeURIComponent(data[0])}`} className="text-primary-950 hover:underline">
                                    {data[0]}
                                </Link>
                            </td>
                            <td className="px-4 py-2 font-mono">{data[1]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    )
}

export default TopSinclairs