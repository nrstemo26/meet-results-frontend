import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { Spinner } from "../Spinners/Spinner"
import FeatureRequest from "../../components/Widgets/FeatureRequest"
import Trending from '../../components/SearchBars/Trending'
import UpgradeProCard from "../../components/Widgets/ProCard";
import OracleRatings from "../../components/Widgets/OracleRatings"
import OracleSleeveless from '../../assets/oracle_sleeveless.png';
import { FiSearch, FiTrendingUp, FiList, FiBarChart2 } from 'react-icons/fi';

function withLoading(Component){
    return function WithLoadingComponent({isLoading, ...props}){
        if(isLoading){
            return <Spinner/>
        }
        return <Component {...props} />
    }
}

const MyComponent = ({ data })=>{
    return (
        <div className="w-full sm:w-3/4 mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 p-4 pt-16">
                <div className="flex-1 text-center md:text-left max-w-2xl">
                    <h1 className="text-primary-950 font-bold text-3xl md:text-4xl lg:text-4xl mb-3 leading-tight">{data.title}</h1>
                    <h2 className="text-primary-950 font-semibold text-lg md:text-xl mb-6 leading-relaxed text-primary-800">{data.subtitle}</h2>
                    <p className="text-primary-950 leading-relaxed font-medium text-lg mb-8">{data.description}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link 
                            to="/athletes" 
                            className="inline-flex items-center justify-center px-6 py-2.5 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors w-full sm:w-48"
                        >
                            <FiSearch className="w-5 h-5 mr-2" />
                            Search Athletes
                        </Link>
                        <Link 
                            to="/meets" 
                            className="inline-flex items-center justify-center px-6 py-2.5 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors w-full sm:w-48"
                        >
                            <FiTrendingUp className="w-5 h-5 mr-2" />
                            Search Meets
                        </Link>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <img src={OracleSleeveless} alt="Oracle Sleeveless" className="w-56 md:w-72 h-auto" />
                </div>
            </div>

            <div className="mt-12 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-primary-100 rounded-lg">
                                <FiSearch className="w-6 h-6 text-primary-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-primary-950">Visualize</h3>
                        </div>
                        <p className="text-gray-600">
                            Competition results database covering 51,000+ athletes & 4,500+ local and national events. Track performance trends across meets and seasons.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-primary-100 rounded-lg">
                                <FiBarChart2 className="w-6 h-6 text-primary-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-primary-950">Analyze</h3>
                        </div>
                        <p className="text-gray-600">
                            Tap into historical trends and advanced stats across 10+ years of American weightlifting. Identify patterns and predict future performance.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-primary-100 rounded-lg">
                                <FiList className="w-6 h-6 text-primary-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-primary-950">Build</h3>
                        </div>
                        <p className="text-gray-600">
                            Create a watchlist to track your favorite weightlifters (or competition). Get notified of new results and personal bests.
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-primary-100 rounded-lg">
                                <FiTrendingUp className="w-6 h-6 text-primary-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-primary-950">Elevate</h3>
                        </div>
                        <p className="text-gray-600">
                            Dial in your competition coaching with unique and on-demand insights. Make data-driven decisions with confidence.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 p-4">
                <FeatureRequest />
            </div>
        </div>
    )
}

const HomeComponent = ()=>{
    const WrappedComponent = withLoading(MyComponent)
    
    const [isLoading, setIsLoading] = useState(true)
    const data = {
        title: 'Unlock the Secrets of American Weightlifting',
        subtitle: 'Competition Results, Performance Insights & Strategic Intelligence',
        description: "Your complete competition database, enhanced with advanced analytics. Whether you're a coach, athlete, or fan, Lift Oracle helps you understand performance patterns and make data-driven decisions. Where your coach's coach does their due dili."
    }

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false);
        }, 2000)
    }, []);
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 py-8">
                    <div className="flex-1">
                        <WrappedComponent isLoading={isLoading} data={data} />
                    </div>
                    <div className="lg:w-80 space-y-6">
                        <div className="sticky top-8">
                            <Trending />
                            <div className="mt-6">
                                <UpgradeProCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { 
    HomeComponent
}
