import { MbSpinnerGradient as GradientSpinner} from './MbSpinnerGradient'

const Spinner = () =>{
    return(
        <div className='mt-4 flex flex-col items-center '>
            <h1 className='text-primary-950'>Consulting the Oracle...</h1>
            <GradientSpinner />
        </div>
    )
}

export { Spinner } ;