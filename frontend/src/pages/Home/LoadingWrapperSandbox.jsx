import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { Spinner } from "../Spinners/Spinner"
import FeatureRequest from "../../components/Widgets/FeatureRequest"
import Trending from '../../components/SearchBars/Trending'

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
        <div className="sm:w-3/4">
            <h2 className="text-primary-950 font-bold text-5xl p-2 pt-16 ml-8">{data.title}</h2>
            <h2 className="text-primary-950 font-bold text-3xl p-2 mt-4 mx-8 leading-relaxed">{data.subtitle}</h2>
            <p className="m-8 p-2 text-primary-950 leading-loose font-semibold">{data.description}</p>
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
                    <Link to={`/api/v1/watchlist/`} className="hover:text-primary-400">
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
            <div className="m-8 p-2">
                <Link to={`/about`} className="text-primary-950 hover:text-primary-400 font-bold">Learn More</Link>
            </div>
            
        </div>
    )
}


const HomeComponent = ()=>{
    //in declaration youd sub in my component for your actual component
    const WrappedComponent = withLoading(MyComponent)
    
    const [isLoading, setIsLoading] = useState(true)
    const data = {
        title: 'Consult the Lift Oracle.',
        subtitle: 'Weightlifting statistics & intelligence.',
        description: "Powered by accomplished Olympic weightlifting coaches and massive data nerds, Lift Oracle is your new destination for historical competition results and statistics."
    }

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false);
        }, 2000)
    }, []);
    
  return(
    <div className="flex flex flex-col md:flex-row justify-left bg-gradient-to-r from-transparent via-cyan-50 to-transparent">
      {/* This div will wrap the WrappedComponent and Trending */}
      <div className="w-full md:w-3/4">
        <WrappedComponent isLoading={isLoading} data={data} />
      </div>
      {/* Trending component will be shown below the WrappedComponent on small screens */}
      <div className="w-full md:w-1/4 mt-8 md:ml-8">
        <Trending />
      </div>
      {/* FeatureRequest will be shown on the right side, below the Trending on small screens */}
      <div className="w-full md:w-1/4 mt-8 md:mt-0 md:ml-8">
        <FeatureRequest />
      </div>
    </div>
  )
}

export { 
    HomeComponent
}
