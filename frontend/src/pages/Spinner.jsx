import { MbSpinnerGradient as GradientSpinner} from './MbSpinnerGradient'

const Spinner = () =>{
    return(
        <div className='flex flex-col items-center '>
            <h1 className=''>Getting your data...</h1>
            <GradientSpinner />
        </div>
    )
}

export { Spinner } ;