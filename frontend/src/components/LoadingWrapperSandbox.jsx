import { useState, useEffect } from "react"
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
        <div>
            <h1>HOME</h1>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
        </div>
    )
}




const HomeComponent = ()=>{
    //in declaration youd sub in my component for your actual component
    const WrappedComponent = withLoading(MyComponent)
    
    const [isLoading, setIsLoading] = useState(true)
    const data = {
        title: 'sample title',
        description: "sample description"
    }

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false);
        }, 2000)
    }, []);
    
  return(
    <div className='sm:flex w-100'>
        <WrappedComponent isLoading={isLoading} data={data}/>
        <div className="sm:fixed sm:right-0 sm:mr-8 sm:w-1/4">
            <Trending />
        </div>
        <FeatureRequest />
    </div>
  )
}

export { 
    HomeComponent
}
