import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { Spinner } from "../pages/Spinner"
import FeatureRequest from "./Widgets/FeatureRequest"
import Trending from './SearchBars/Trending'

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
        <div className="sm:w-2/3 bg-gradient-to-r from-transparent via-cyan-50 to-transparent h-screen">
            <h2 className="text-primary-950 font-bold text-5xl sm:w-1/2 p-2 pt-16 ml-8">{data.title}</h2>
            <h2 className="text-primary-950 font-bold text-3xl sm:w-1/2 p-2 mt-4 mx-8 leading-relaxed">{data.subtitle}</h2>
            <p className="mt-8 ml-8 sm:w-1/3 p-2 text-primary-950 leading-loose font-semibold">{data.description}</p>
            <ul className="list-none m-8 p-2 text-gray-700 text-sm md:text-m space-y-2">
                <li>
                    <span className="text-xl">🏋️‍♂️ </span>
                    <span className="font-semibold">Visualize. </span>
                    <Link to={`/api/v1/meets/`} className="hover:text-primary-400">
                        Competition results database covering x,000+ athletes & 4,000+ local and national events.
                    </Link>
                </li>
                <li>
                    <span className="text-xl">🧐 </span>
                    <span className="font-semibold">Analyze. </span>
                    <Link to={`/api/v1/athletes/`} className="hover:text-primary-400">
                        Tap into historical trends and advanced stats across 10+ years of American weightlifting.
                    </Link>
                </li>
                <li>
                    <span className="text-xl">🏗️ </span>
                    <span className="font-semibold">Build. </span>
                    <Link to={`/api/v1/session/`} className="hover:text-primary-400">
                        Create a watchlist to track your favorite weightlifters (or competition).
                    </Link>
                </li>
                <li>
                    <span className="text-xl">🥇 </span>
                    <span className="font-semibold">Elevate. </span>
                    <Link to={`/api/v1/insights/`} className="hover:text-primary-400">
                        Dial in your competition coaching with unique and on-demand insights.
                    </Link>
                </li>
            </ul>
        </div>
    )
}




const HomeComponent = ()=>{
    //in declaration youd sub in my component for your actual component
    const WrappedComponent = withLoading(MyComponent)
    
    const [isLoading, setIsLoading] = useState(true)
    const data = {
        title: 'Lift Oracle.',
        subtitle: 'Weightlifting statistics & intelligence.',
        description: "Powered by accomplished olympic weightlifting coaches and massive data nerds, Lift Oracle is your new destination for historical competition results and statistics."
    }

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false);
        }, 2000)
    }, []);
    
  return(
    <div className='sm:flex w-100'>
        <WrappedComponent isLoading={isLoading} data={data}/>
        <div className="md:fixed md:right-0 mt-8 md:m-8 md:w-1/4">
            <Trending />
        </div>
        <FeatureRequest />
    </div>
  )
}

export { 
    HomeComponent
}
